export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const url = req.url || '';

  // Google OAuth Config
  if (url.includes('/api/user/auth/google/config')) {
    const clientId = process.env.GOOGLE_CLIENT_ID || '';
    const isConfigured = Boolean(
      clientId && 
      clientId.trim() && 
      !clientId.includes('your_google_client_id') && 
      clientId !== 'placeholder'
    );
    return res.status(200).json({
      success: true,
      configured: isConfigured,
      clientId: isConfigured ? clientId.trim() : ''
    });
  }

  // Google ID Token Verification
  if (url.includes('/api/user/auth/google/verify')) {
    try {
      const { credential, isDemo } = req.body || {};

      if (!credential && !isDemo) {
        return res.status(400).json({ success: false, error: 'Google credential token is required.' });
      }

      let sub, email, name, picture;

      if (isDemo || credential === 'demo-google-token') {
        sub = '109876543210987654321';
        email = 'google.user@zynqosocial.app';
        name = 'Google User';
        picture = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
      } else {
        const googleVerifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`);
        if (!googleVerifyRes.ok) {
          const errText = await googleVerifyRes.text();
          console.error('[Google OAuth] Verification failed:', errText);
          return res.status(401).json({ success: false, error: 'Invalid Google authentication token.' });
        }

        const tokenPayload = await googleVerifyRes.json();
        if (!tokenPayload.email_verified || tokenPayload.email_verified === 'false') {
          return res.status(401).json({ success: false, error: 'Google email address is not verified.' });
        }

        const configuredClientId = process.env.GOOGLE_CLIENT_ID;
        if (configuredClientId && tokenPayload.aud !== configuredClientId) {
          console.error('[Google OAuth] Audience mismatch:', tokenPayload.aud, 'expected:', configuredClientId);
          return res.status(401).json({ success: false, error: 'Google token was not issued for this application.' });
        }

        sub = tokenPayload.sub;
        email = tokenPayload.email;
        name = tokenPayload.name || tokenPayload.given_name || 'Google User';
        picture = tokenPayload.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150';
      }

      const cleanEmail = (email || 'google.user@zynqosocial.app').trim().toLowerCase();
      const userName = name || cleanEmail.split('@')[0] || 'Google User';

      return res.status(200).json({
        success: true,
        message: 'Google Sign-In successful.',
        user: {
          id: `user-g-${(sub || 'default').slice(-8)}`,
          name: userName,
          email: cleanEmail,
          avatar: picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
          date_of_birth: '1998-01-01',
          category: 'Student',
          current_mood: 'Happy',
          profile_visibility: 'public',
          room_privacy: 'public',
          language: 'en'
        }
      });
    } catch (err) {
      console.error('[Google OAuth] Serverless verify error:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  // Google OAuth Redirect
  if (url.startsWith('/api/user/auth/google') && !url.includes('config') && !url.includes('verify') && !url.includes('callback')) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('your_google_client_id')) {
      res.setHeader('Content-Type', 'text/html');
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Google OAuth Not Configured</title></head>
          <body style="font-family:sans-serif;padding:3rem;text-align:center;background:#0f172a;color:#f8fafc;">
            <h2>Google OAuth Not Configured</h2>
            <p style="color:#94a3b8;">Please set <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> in your Vercel Environment Variables.</p>
            <button onclick="window.close()" style="margin-top:1rem;padding:0.6rem 1.2rem;border-radius:0.5rem;background:#38bdf8;color:#0f172a;border:none;font-weight:bold;cursor:pointer;">Close Window</button>
          </body>
        </html>
      `);
    }

    const proto = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${proto}://${host}/api/user/auth/google/callback`;
    const state = Math.random().toString(36).substring(7);
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${encodeURIComponent(clientId)}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&state=${state}&prompt=select_account`;
    res.writeHead(302, { Location: authUrl });
    return res.end();
  }

  // Google OAuth Callback
  if (url.includes('/api/user/auth/google/callback')) {
    const query = new URL(url, `https://${req.headers.host || 'localhost'}`).searchParams;
    const code = query.get('code');
    const error = query.get('error');

    res.setHeader('Content-Type', 'text/html');
    if (error || !code) {
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', error: '${error || 'Authentication was cancelled.'}' }, '*');
                window.close();
              } else {
                window.location.href = '/?error=google_cancelled';
              }
            </script>
          </body>
        </html>
      `);
    }

    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const proto = req.headers['x-forwarded-proto'] || 'https';
      const host = req.headers['x-forwarded-host'] || req.headers.host;
      const redirectUri = process.env.GOOGLE_REDIRECT_URI || `${proto}://${host}/api/user/auth/google/callback`;

      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code: String(code),
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code'
        })
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.access_token) {
        throw new Error(tokenData.error_description || tokenData.error || 'Failed to exchange authorization code.');
      }

      const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` }
      });
      const userInfo = await userInfoRes.json();
      const { sub, email, name, picture } = userInfo;

      const userPayload = JSON.stringify({
        id: `user-g-${(sub || 'default').slice(-8)}`,
        name: name || 'Google User',
        email: (email || '').trim().toLowerCase(),
        avatar: picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        date_of_birth: '1998-01-01',
        category: 'Student',
        current_mood: 'Happy',
        profile_visibility: 'public',
        room_privacy: 'public'
      });

      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>Google Authentication Success</title></head>
          <body style="font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;background:#0f172a;color:#fff;">
            <div style="text-align:center;">
              <h3>Authentication Successful</h3>
              <p>Signing in to Zynqo Social...</p>
            </div>
            <script>
              const user = ${userPayload};
              if (window.opener) {
                window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS', user }, '*');
                window.close();
              } else {
                localStorage.setItem('pulseai_logged_in', 'true');
                localStorage.setItem('pulseai_user_name', user.name);
                localStorage.setItem('pulseai_user_email', user.email);
                if (user.avatar) localStorage.setItem('pulseai_user_avatar', user.avatar);
                window.location.href = '/?auth=google_success';
              }
            </script>
          </body>
        </html>
      `);
    } catch (err) {
      console.error('[Google OAuth] Vercel callback error:', err);
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <body>
            <script>
              if (window.opener) {
                window.opener.postMessage({ type: 'GOOGLE_AUTH_ERROR', error: '${err.message}' }, '*');
                window.close();
              } else {
                window.location.href = '/?error=' + encodeURIComponent('${err.message}');
              }
            </script>
          </body>
        </html>
      `);
    }
  }

  if (url.includes('/api/user/signup')) {
    const { name, email, date_of_birth, category, language = 'en', current_mood = 'Happy' } = req.body || {};
    return res.status(200).json({
      success: true,
      message: 'User registered successfully.',
      user: {
        id: `user-${Date.now()}`,
        name: name || 'User',
        email: email || 'user@zynqosocial.app',
        date_of_birth: date_of_birth || '2000-01-01',
        category: category || 'Student',
        current_mood,
        language
      }
    });
  }

  if (url.includes('/api/user/login')) {
    const { email } = req.body || {};
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully.',
      user: {
        id: `user-${Date.now()}`,
        name: email ? email.split('@')[0] : 'User',
        email: email || 'user@zynqosocial.app',
        category: 'Student',
        current_mood: 'Happy'
      }
    });
  }

  if (url.includes('/api/user/profile')) {
    return res.status(200).json({
      success: true,
      profile: {
        id: 'user-profile-default',
        name: 'Nishi Thakkar',
        handle: '@nishi_thakkar',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        bio: 'Exploring AI Reels on Zynqo ✨',
        category: 'Student',
        current_mood: 'Happy',
        attentionBudgetMinutes: 30,
        minutesUsedToday: 0,
        xp: 150,
        level: 2,
        streakDays: 3,
        badges: [],
        privacySettings: {
          useWatchHistory: true,
          useMoodSignals: true,
          allowCollaborativeFiltering: true,
          privateMode: false
        },
        memoryVault: []
      }
    });
  }

  if (url.includes('/api/health')) {
    return res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  }

  return res.status(200).json({ success: true });
}
