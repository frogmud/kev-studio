import type { Discipline } from './types';

// Convert slug to display name
export function slugToName(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Convert name to slug
export function nameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Format year range
export function formatYearRange(startYear: number, endYear?: number): string {
  if (!endYear || startYear === endYear) return String(startYear);
  return `${startYear} - ${endYear}`;
}

// Get discipline icon name (MUI icon)
export function getDisciplineIcon(discipline: Discipline): string {
  const icons: Record<Discipline, string> = {
    Design: 'DesignServices',
    Direction: 'Movie',
    Branding: 'Fingerprint',
    'Web Design': 'Language',
    Motion: 'Animation',
    Storyboarding: 'GridOn',
    Strategy: 'Lightbulb',
    Print: 'MenuBook',
  };
  return icons[discipline] || 'WorkOutline';
}

// Sort options for projects
export type SortOption = 'year-desc' | 'year-asc' | 'name-asc' | 'name-desc';

export function sortProjects<T extends { name: string; year: number }>(
  projects: T[],
  sort: SortOption
): T[] {
  const sorted = [...projects];
  switch (sort) {
    case 'year-desc':
      return sorted.sort((a, b) => b.year - a.year);
    case 'year-asc':
      return sorted.sort((a, b) => a.year - b.year);
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
}

// Truncate text
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}
