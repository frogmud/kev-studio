// Portfolio entity types - adapted from NDG wiki patterns

export type Discipline =
  | 'Design'
  | 'Direction'
  | 'Branding'
  | 'Web Design'
  | 'Motion'
  | 'Storyboarding'
  | 'Strategy'
  | 'Print';

export interface PortfolioEntity {
  slug: string;
  name: string;
  category: 'project' | 'about';
  image?: string;
  description?: string;
  seeAlso?: string[]; // Related entity slugs for cross-linking
}

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
}

export interface ProjectImage {
  src: string;
  alt?: string;
  caption?: string;
}

export interface ProjectVideo {
  src: string; // YouTube/Vimeo embed URL or direct video URL
  title?: string;
  caption?: string;
}

export type Category = 'design' | 'direction';

export interface ProjectQuote {
  text: string;
  attribution?: string;
}

export interface Project extends PortfolioEntity {
  category: 'project';
  client?: string;
  agency?: string;
  role?: string;
  year: number;
  disciplines: Discipline[];
  categories: Category[];
  thumbnail?: string;
  heroImage?: string;
  summary: string;
  sections?: ProjectSection[];
  images?: ProjectImage[];
  videos?: ProjectVideo[];
  quotes?: ProjectQuote[];
  featured?: boolean;
  lastUpdated?: string;
}

export interface SocialLink {
  label: string;
  url: string;
  icon?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description?: string;
}

export interface AboutProfile extends PortfolioEntity {
  category: 'about';
  title: string;
  location: string;
  links: SocialLink[];
  skills: string[];
  experience: ExperienceItem[];
}

export type AnyEntity = Project | AboutProfile;
