import { projects } from './projects';
import { about } from './about';
import type { Project, Discipline, Category, AnyEntity } from './types';

// Get all projects
export function getAllProjects(): Project[] {
  return projects;
}

// Get project by slug
export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

// Get projects by discipline
export function getProjectsByDiscipline(discipline: Discipline): Project[] {
  return projects.filter((p) => p.disciplines.includes(discipline));
}

// Get featured projects
export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

// Search projects
export function searchProjects(query: string): Project[] {
  const q = query.toLowerCase();
  return projects.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.client?.toLowerCase().includes(q) ||
      p.disciplines.some((d) => d.toLowerCase().includes(q))
  );
}

// Get related projects (by shared disciplines)
export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const project = getProject(slug);
  if (!project) return [];

  // First check seeAlso
  const seeAlsoProjects = (project.seeAlso || [])
    .map((s) => getProject(s))
    .filter((p): p is Project => p !== undefined);

  if (seeAlsoProjects.length >= limit) {
    return seeAlsoProjects.slice(0, limit);
  }

  // Then find by shared disciplines
  const others = projects
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      project: p,
      shared: p.disciplines.filter((d) => project.disciplines.includes(d)).length,
    }))
    .filter((p) => p.shared > 0)
    .sort((a, b) => b.shared - a.shared)
    .map((p) => p.project);

  const combined = [...seeAlsoProjects, ...others.filter((p) => !seeAlsoProjects.includes(p))];
  return combined.slice(0, limit);
}

// Get all unique disciplines with counts
export function getDisciplineCounts(): Record<Discipline, number> {
  const counts: Partial<Record<Discipline, number>> = {};
  projects.forEach((p) => {
    p.disciplines.forEach((d) => {
      counts[d] = (counts[d] || 0) + 1;
    });
  });
  return counts as Record<Discipline, number>;
}

// Get about profile
export function getAbout() {
  return about;
}

// Get any entity by slug
export function getEntity(slug: string): AnyEntity | undefined {
  if (slug === about.slug) return about;
  return getProject(slug);
}

// Get projects by category
export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.categories.includes(category));
}

// Re-export types
export type { Project, Discipline, Category, AboutProfile, AnyEntity } from './types';
