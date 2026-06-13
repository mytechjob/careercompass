'use client';

import { useState } from 'react';
import { youtubeThumb, youtubeEmbed } from '@/lib/youtube';

export default function InterviewCard({ title, videoId }: { title: string; videoId: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="interview-card">
      <div className="iv-frame">
        {playing ? (
          <iframe
            src={youtubeEmbed(videoId)}
            title={title}
            allow="accelerated-sensors; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button className="iv-thumb" onClick={() => setPlaying(true)} aria-label={`Play interview: ${title}`}>
            <img src={youtubeThumb(videoId)} alt={title} loading="lazy" />
            <span className="iv-play" aria-hidden>▶</span>
          </button>
        )}
      </div>
      <div className="iv-title">{title}</div>
    </div>
  );
}
