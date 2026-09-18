import subprocess
import os
import sys
import imageio_ffmpeg

sys.stdout.reconfigure(encoding='utf-8')

ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
print(f"🎬 Using FFmpeg: {ffmpeg_exe}")

VIDEOS_DIR = os.path.join(os.getcwd(), 'public', 'videos')

items = [
    {
        "url": "https://www.youtube.com/watch?v=ixtQphXi3is",
        "title": "United Way Vadodara Massive Garba Night",
        "output": "ig_navratri_united_way.mp4"
    },
    {
        "url": "https://www.youtube.com/watch?v=rlAXGFSTzlE",
        "title": "Traditional 14-Step Dodhiya Garba Tutorial",
        "output": "ig_navratri_dodhiya_steps.mp4"
    },
    {
        "url": "https://www.youtube.com/watch?v=63jTQqjnFhw",
        "title": "Energetic Titodo & Sanedo Fusion Beats",
        "output": "ig_navratri_titodo_sanedo.mp4"
    },
    {
        "url": "https://www.youtube.com/watch?v=Z141xYCnOks",
        "title": "Royal Kutch Mirror-Work Chaniya Choli & Dandiya Styling",
        "output": "ig_navratri_chaniya_choli.mp4"
    },
    {
        "url": "https://www.youtube.com/watch?v=UhTcBzBFcb8",
        "title": "Dholida High-Energy Dhol Beats & Raas Garba Performance",
        "output": "ig_navratri_dholida_performance.mp4"
    }
]

for item in items:
    out_path = os.path.join(VIDEOS_DIR, item['output'])
    print(f"\n⬇️ Downloading & Merging with Audio: {item['title']} -> {item['output']}...")
    
    cmd = [
        "python", "-m", "yt_dlp",
        "--ffmpeg-location", ffmpeg_exe,
        "-f", "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/bestvideo[height<=1080]+bestaudio/best[height<=1080]/best",
        "--merge-output-format", "mp4",
        "--recode-video", "mp4",
        "-o", out_path,
        "--force-overwrites",
        "--no-warnings",
        item['url']
    ]
    
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8')
    
    # Verify streams with ffmpeg
    probe = subprocess.run([ffmpeg_exe, "-i", out_path], capture_output=True, text=True)
    has_audio = "Audio:" in probe.stderr
    has_video = "Video:" in probe.stderr
    file_size = os.path.getsize(out_path) if os.path.exists(out_path) else 0
    
    print(f"File: {item['output']} | Size: {file_size} bytes | Video: {has_video} | Audio: {has_audio}")
    if not (has_audio and has_video):
        print(f"⚠️ Warning: Check streams for {item['output']}")
        print(probe.stderr[-500:])
