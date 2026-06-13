// Pull the 11-character video ID out of any common YouTube URL (or a raw ID).
export function youtubeId(input: string): string | null {
  if (!input) return null;
  const s = input.trim();

  // Already just an ID
  if (/^[A-Za-z0-9_-]{11}$/.test(s)) return s;

  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,          // watch?v=ID
    /youtu\.be\/([A-Za-z0-9_-]{11})/,     // youtu.be/ID
    /\/embed\/([A-Za-z0-9_-]{11})/,       // /embed/ID
    /\/shorts\/([A-Za-z0-9_-]{11})/,      // /shorts/ID
    /\/live\/([A-Za-z0-9_-]{11})/,        // /live/ID
  ];
  for (const re of patterns) {
    const m = s.match(re);
    if (m) return m[1];
  }
  return null;
}

export function youtubeThumb(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeEmbed(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
}

export function youtubeWatch(id: string): string {
  return `https://www.youtube.com/watch?v=${id}`;
}
