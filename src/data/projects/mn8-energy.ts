import type { Project } from '../types';
import { CDN } from './constants';

export const mn8Energy: Project = {
  slug: 'mn8-energy',
  name: 'MN8 Energy',
  category: 'project',
  client: 'MN8 Energy (Goldman Sachs)',
  agency: 'Thackway McCord',
  role: 'Design, Branding, Web, Storyboarding, Print, Motion, Strategy',
  summary: 'Website & guidelines for GS spin-off',
  description:
    'When Goldman Sachs spun off their renewable energy portfolio into MN8 Energy, they needed a brand that could stand on its own while maintaining institutional credibility.',
  disciplines: ['Design', 'Branding', 'Websites', 'Storyboarding', 'Print', 'Motion', 'Strategy'],
  categories: ['design'],
  year: 2023,
  featured: true,
  thumbnail: `${CDN}/mn8/06a-mn8-logo-4x3.png`,
  heroImage: `${CDN}/mn8/00-mn8-solar-field-wide.jpg`,
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Create a distinct identity for one of the largest solar and storage operators in the US, separating from Goldman Sachs while leveraging the credibility of that heritage.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'The brand system centers on energy in motion - literal and metaphorical. We created comprehensive guidelines covering everything from typography to photography direction, ensuring consistency across a rapidly scaling organization.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'MN8 launched with a cohesive brand presence across digital and print, supporting their position as a major player in the clean energy transition.',
    },
  ],
  images: [
    { src: `${CDN}/mn8/01-mn8-sketches.gif`, caption: 'Early concept sketches' },
    { src: `${CDN}/mn8/02-mn8-naming-gif-good.gif`, caption: 'Naming exploration process' },
    { src: `${CDN}/mn8/03-mn8-figma-file-show-good.png`, caption: 'Design system in Figma' },
    { src: `${CDN}/mn8/04-mn8-ipad-web.gif`, caption: 'Responsive web on tablet' },
    { src: `${CDN}/mn8/04-mn8-solar-farm.gif`, caption: 'Solar farm photography' },
    { src: `${CDN}/mn8/05-mn8-ppt.gif`, caption: 'Investor presentation deck' },
    { src: `${CDN}/mn8/06b-mn8-logo-wide.png`, caption: 'Logo design landscape format' },
    { src: `${CDN}/mn8/07-mn8-ev-pump.jpg`, caption: 'EV charging station branding' },
    { src: `${CDN}/mn8/08-mn8-brand-book.jpg`, caption: 'Brand book' },
    { src: `${CDN}/mn8/09a-mn8-guidelines-wide-orange.png`, caption: 'Brand guidelines system' },
    { src: `${CDN}/mn8/10a-mn8-laptop-4x3-white.png`, caption: 'Website design' },
    { src: `${CDN}/mn8/10b-mn8-laptop-wide-orange.png`, caption: 'Website on laptop' },
    { src: `${CDN}/mn8/11b-mn8-mobile-4x3-white.png`, caption: 'Mobile responsive design' },
    { src: `${CDN}/mn8/mn8-mobile-trio-4x3.png`, caption: 'Mobile layouts overview' },
  ],
  lastUpdated: '2026-02-07',
};
