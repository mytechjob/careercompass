export function outlookLabel(o: string): string {
  return ({ high: 'In high demand', medium: 'Steady demand', low: 'Limited demand' } as Record<string, string>)[o]
    || 'Steady demand';
}

export function outlookClass(o: string): string {
  return ({ high: 'outlook-high', medium: 'outlook-med', low: 'outlook-low' } as Record<string, string>)[o]
    || 'outlook-med';
}
