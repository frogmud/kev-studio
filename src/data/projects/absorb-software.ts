import type { Project } from '../types';
import { CDN } from './constants';

export const absorbSoftware: Project = {
  slug: 'absorb-software',
  name: 'Absorb Software',
  category: 'project',
  client: 'Absorb Software (in-house)',
  role: 'Direction, Branding, Web, Storyboarding, Motion, Strategy',
  summary: 'Website & rebrand for learning tech company',
  description:
    'Absorb Software needed a complete brand refresh to match their evolution from scrappy startup to enterprise learning management leader. The rebrand touched everything from visual identity to digital presence.',
  disciplines: ['Direction', 'Branding', 'Web Design', 'Storyboarding', 'Motion', 'Strategy'],
  categories: ['direction'],
  year: 2024,
  featured: true,
  thumbnail: `${CDN}/absorb/00-absorb-3d-prism-wide.png`,
  heroImage: `${CDN}/absorb/02-absorb-guidelines-wide-blue.png`,
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'The existing brand felt dated against competitors and failed to communicate the sophistication of their AI-powered learning platform. Enterprise buyers needed to see a partner, not a vendor.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'We developed a visual system that balanced approachability with enterprise credibility. The website architecture was restructured around buyer journeys, with motion design adding polish to key interaction moments.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'The new brand launched across all touchpoints including website, sales collateral, and product UI. Site engagement increased significantly, with demo requests up in the first quarter post-launch.',
    },
  ],
  images: [
    { src: `${CDN}/absorb/03a-absorb-accepted-wide-v3.gif`, caption: 'Brand launch animation' },
    { src: `${CDN}/absorb/04-absorb-sticker-laptop-wide.png`, caption: 'Brand system overview' },
    { src: `${CDN}/absorb/05-absorb-team-wide.png`, caption: 'Team page design' },
    { src: `${CDN}/absorb/06-absorb-productshots-wide-v2.gif`, caption: 'Product interface showcase' },
    { src: `${CDN}/absorb/07-absorb-icons.png`, caption: 'Custom icon system' },
    { src: `${CDN}/absorb/09-absorb-laptop-cycle.gif`, caption: 'Website walkthrough animation' },
    { src: `${CDN}/absorb/10-absorb-mobile-wide-blue.png`, caption: 'Mobile responsive design' },
    { src: `${CDN}/absorb/11-absorb-laptop-wide-gray.png`, caption: 'Platform interface design' },
    { src: `${CDN}/absorb/12a-absorb-ebooks-wide-purp.png`, caption: 'Ebook template design' },
    { src: `${CDN}/absorb/absorb-tradeshow-front-merge-wide-2.png`, caption: 'Tradeshow booth design' },
  ],
  lastUpdated: '2026-02-07',
};
