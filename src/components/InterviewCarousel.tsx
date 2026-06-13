'use client';

import { useEffect, useRef, useState } from 'react';
import InterviewCard from './InterviewCard';

type Item = { id: number; title: string; videoId: string };

export default function InterviewCarousel({ items }: { items: Item[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  // 3 or fewer fit comfortably, so only the larger lists become a scroller.
  const scrollable = items.length > 3;

  useEffect(() => {
    if (!scrollable) return;
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanLeft(el.scrollLeft > 4);
      setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
    };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [scrollable, items.length]);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.querySelector<HTMLElement>('.iv-slide');
    const amount = slide ? slide.offsetWidth + 22 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  }

  if (!scrollable) {
    return (
      <div className="card-grid">
        {items.map((iv) => <InterviewCard key={iv.id} title={iv.title} videoId={iv.videoId} />)}
      </div>
    );
  }

  return (
    <div className="iv-carousel">
      <button className="iv-arrow left" onClick={() => scroll(-1)} disabled={!canLeft} aria-label="Scroll left">‹</button>
      <div className="iv-track" ref={trackRef}>
        {items.map((iv) => (
          <div className="iv-slide" key={iv.id}>
            <InterviewCard title={iv.title} videoId={iv.videoId} />
          </div>
        ))}
      </div>
      <button className="iv-arrow right" onClick={() => scroll(1)} disabled={!canRight} aria-label="Scroll right">›</button>
    </div>
  );
}
