import React, { useEffect, useRef } from 'react';

interface ReelVisualizerProps {
  theme: 'neural_network' | 'zen_flow' | 'fitness_pulse' | 'quantum_grid' | 'finance_growth' | 'cooking_flame';
  isPlaying: boolean;
}

export const ReelVisualizer: React.FC<ReelVisualizerProps> = ({ theme, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 700);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    // Theme: Neural Network particles
    const nodes = Array.from({ length: 28 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.9,
      vy: (Math.random() - 0.5) * 0.9,
      radius: Math.random() * 2.5 + 1.5,
      pulse: Math.random() * Math.PI
    }));

    // Theme: Rising embers
    const embers = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: height + Math.random() * 50,
      vy: Math.random() * 1.5 + 0.8,
      vx: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 3 + 1,
      alpha: Math.random() * 0.8 + 0.2
    }));

    let tick = 0;

    const render = () => {
      if (isPlaying) tick += 0.02;

      ctx.clearRect(0, 0, width, height);

      // Deep dark cyber background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#0a0e17');
      bgGrad.addColorStop(0.5, '#05070c');
      bgGrad.addColorStop(1, '#070b12');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      if (theme === 'neural_network') {
        // Draw synapsing lines
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.strokeStyle = `rgba(6, 182, 212, ${0.35 * (1 - dist / 110)})`;
              ctx.stroke();
            }
          }
        }

        // Draw nodes
        nodes.forEach(node => {
          if (isPlaying) {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
            node.pulse += 0.05;
          }

          const glow = Math.sin(node.pulse) * 0.4 + 0.6;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * glow, 0, Math.PI * 2);
          ctx.fillStyle = '#06b6d4';
          ctx.shadowBlur = 12;
          ctx.shadowColor = '#06b6d4';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      } else if (theme === 'zen_flow') {
        // Breathing ring animation
        const cx = width / 2;
        const cy = height / 2;
        const breath = (Math.sin(tick * 0.8) + 1) / 2; // 0 to 1
        const radius = 60 + breath * 70;

        for (let r = 3; r >= 1; r--) {
          ctx.beginPath();
          ctx.arc(cx, cy, radius * (r * 0.45), 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(139, 92, 246, ${0.25 / r})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, radius * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(139, 92, 246, 0.2)';
        ctx.shadowBlur = 24;
        ctx.shadowColor = '#8b5cf6';
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (theme === 'fitness_pulse') {
        // Frequency bars + heartbeat pulse
        const cx = width / 2;
        const cy = height / 2;
        const barCount = 32;
        const barWidth = 4;
        const spacing = (width - 40) / barCount;

        for (let i = 0; i < barCount; i++) {
          const barHeight = Math.abs(Math.sin(tick * 2 + i * 0.3)) * 80 + 10;
          const x = 20 + i * spacing;
          const y = cy - barHeight / 2;

          const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
          grad.addColorStop(0, '#10b981');
          grad.addColorStop(1, '#06b6d4');

          ctx.fillStyle = grad;
          ctx.fillRect(x, y, barWidth, barHeight);
        }
      } else if (theme === 'quantum_grid') {
        // 3D grid with floating qubits
        const horizon = height * 0.55;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.25)';
        ctx.lineWidth = 1;

        // Vanishing lines
        for (let x = -width; x <= width * 2; x += 40) {
          ctx.beginPath();
          ctx.moveTo(width / 2, horizon);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        // Horizontal depth lines
        for (let i = 1; i <= 10; i++) {
          const y = horizon + Math.pow(i / 10, 2) * (height - horizon);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      } else if (theme === 'finance_growth') {
        // Green candlesticks & trajectory curve
        const steps = 8;
        const stepWidth = (width - 60) / steps;
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 3;
        ctx.beginPath();

        for (let i = 0; i < steps; i++) {
          const x = 30 + i * stepWidth;
          const y = height * 0.65 - Math.sin(tick + i * 0.5) * 30 - i * 14;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);

          // Candlestick body
          ctx.fillStyle = i % 2 === 0 ? '#10b981' : '#059669';
          ctx.fillRect(x - 6, y - 10, 12, 20);
        }
        ctx.stroke();
      } else if (theme === 'cooking_flame') {
        // Rising glowing embers
        embers.forEach(ember => {
          if (isPlaying) {
            ember.y -= ember.vy;
            ember.x += ember.vx;
            if (ember.y < 0) {
              ember.y = height + 10;
              ember.x = Math.random() * width;
            }
          }

          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${ember.alpha})`;
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#f59e0b';
          ctx.fill();
          ctx.shadowBlur = 0;
        });
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme, isPlaying]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};
