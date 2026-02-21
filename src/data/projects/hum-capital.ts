import type { Project } from '../types';
import { CDN } from './constants';

export const humCapital: Project = {
  slug: 'hum-capital',
  name: 'Hum Capital',
  category: 'project',
  client: 'Hum Capital',
  agency: 'Thackway McCord',
  role: 'Logo, Design, UI/UX',
  summary: 'Brand identity for AI-driven capital fundraising platform',
  description:
    'Fintech company connecting growth-stage businesses with capital through an AI-driven Intelligent Capital Market (ICM) platform. Collaborated on brand identity and digital experience reflecting an innovative approach to capital fundraising.',
  disciplines: ['Design', 'Branding', 'Websites', 'Product'],
  categories: ['design'],
  year: 2021,
  featured: false,
  thumbnail: `${CDN}/hum/Hum_01.png`,
  heroImage: `${CDN}/hum/Hum_motion1.gif`,
  quotes: [
    { text: 'Transform North America 2021 (Gold), Indigo Awards 2021 (Silver), Wolda 2021 (Gold).' },
  ],
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Develop a brand identity and digital experience for a fintech startup transitioning from "Capital" to "Hum" - a name that needed to feel both innovative and trustworthy in the financial sector.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'Created a distinctive wordmark with custom letterforms, a vibrant color palette, and motion design principles. Extended to app icon, mobile interface, interactive presentations, brand guidelines, and digital advertising.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'The brand won Transform North America 2021 (Gold), Indigo Awards 2021 (Silver), and Wolda 2021 (Gold). The complete design system supported Hum\'s market launch and fundraising efforts.',
    },
  ],
  images: [
    { src: `${CDN}/hum/Hum_02.png`, caption: 'Brand color palette' },
    { src: `${CDN}/hum/Hum_03.png`, caption: 'Wordmark design' },
    { src: `${CDN}/hum/Hum_04.png`, caption: 'App icon design' },
    { src: `${CDN}/hum/Hum_05.png`, caption: 'Mobile interface' },
    { src: `${CDN}/hum/Hum_06.png`, caption: 'Interactive presentation' },
    { src: `${CDN}/hum/Hum_07.png`, caption: 'Brand guidelines' },
    { src: `${CDN}/hum/Hum_08.png`, caption: 'Digital advertising' },
    { src: `${CDN}/hum/Hum_09.png`, caption: 'Social media assets' },
    { src: `${CDN}/hum/Hum_10.png`, caption: 'Marketing collateral' },
    { src: `${CDN}/hum/Hum_11.png`, caption: 'Brand extensions' },
    { src: `${CDN}/hum/Hum_motion4.gif`, caption: 'Motion design reel' },
  ],
  lastUpdated: '2026-02-07',
};
