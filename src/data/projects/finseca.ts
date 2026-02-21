import type { Project } from '../types';
import { CDN } from './constants';

export const finseca: Project = {
  slug: 'finseca',
  name: 'Finseca',
  category: 'project',
  client: 'Finseca',
  agency: 'Thackway McCord',
  role: 'Design Lead, Motion, UI/UX',
  summary: 'Rebranding and digital experience for a financial security association',
  description:
    'Finseca was established in 2020 through the merger of AALU and GAMA International. Created a cohesive brand identity with a shield icon symbolizing protection and a double-F mark representing the merger.',
  disciplines: ['Direction', 'Branding', 'Websites', 'Strategy'],
  categories: ['direction'],
  year: 2020,
  featured: false,
  thumbnail: `${CDN}/finseca/Finseca_3dShield.png`,
  heroImage: `${CDN}/finseca/Finseca_3dShield.png`,
  quotes: [
    { text: 'Won Silver at the 2020 Wolda Awards for brand identity.' },
  ],
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Unite two legacy organizations (AALU and GAMA International) under one new brand that signals transformation while maintaining the trust built over decades in financial advocacy.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'Developed the distinctive "Finseca" name, a shield logo with double-F symbolism, and a politically neutral purple palette appropriate for a Washington DC advocacy organization. Extended into 3D shield animations and a comprehensive digital experience.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'Launched with announcement videos, digital marketing, and member communications. The brand won Silver at the 2020 Wolda Awards.',
    },
  ],
  images: [
    { src: `${CDN}/finseca/Finseca_LogoDevelopment.png`, caption: 'Logo development process' },
    { src: `${CDN}/finseca/Finseca_Guidelines.png`, caption: 'Brand guidelines' },
    { src: `${CDN}/finseca/Finseca_RenderBoomerang.gif`, caption: '3D shield animation' },
    { src: `${CDN}/finseca/Finseca_Website.png`, caption: 'Website design' },
    { src: `${CDN}/finseca/Finseca_Banners.png`, caption: 'Digital banner ads' },
    { src: `${CDN}/finseca/Finseca_Convention.png`, caption: 'Convention booth design' },
    { src: `${CDN}/finseca/Finseca_Insta.png`, caption: 'Instagram content' },
    { src: `${CDN}/finseca/Finseca_LinkedIn.png`, caption: 'LinkedIn profile assets' },
    { src: `${CDN}/finseca/Finseca_Magazine.png`, caption: 'Magazine advertisement' },
    { src: `${CDN}/finseca/Finseca_Signage.png`, caption: 'Environmental signage' },
  ],
  lastUpdated: '2026-02-07',
};
