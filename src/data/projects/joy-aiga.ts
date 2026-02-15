import type { Project } from '../types';
import { CDN } from './constants';

export const joyAiga: Project = {
  slug: 'joy-aiga',
  name: 'Joy with the AIGA',
  category: 'project',
  client: 'AIGA New York',
  role: 'Design, Programming, Motion, Print',
  summary: 'Interactive holiday wrapping paper blending print and digital',
  description:
    'A 2021 holiday wrapping paper design centered on "joy," integrating functional QR codes customized into festive motifs while maintaining scannability. Created custom domain joyjoyjoyjoyjoy.com with Lottie animations.',
  disciplines: ['Direction', 'Branding', 'Web Design', 'Strategy'],
  categories: ['direction'],
  year: 2021,
  featured: false,
  thumbnail: `${CDN}/aiga/aiga_window-2.gif`,
  heroImage: `${CDN}/aiga/big_wrapping_paper.png`,
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Design holiday wrapping paper for AIGA New York that goes beyond a static pattern, creating an interactive experience bridging physical and digital.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'Modified QR codes into festive visual motifs that remained scannable, linking to Lottie animations on a custom domain. The pattern design used QR codes as the primary repeating element.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'Produced high-quality wrapping paper with a responsive landing page. The QR codes autoplay animations after scanning, creating a layered gift experience.',
    },
  ],
  images: [
    { src: `${CDN}/aiga/background_alpha.png`, caption: 'Wrapping paper pattern with transparency' },
    { src: `${CDN}/aiga/background.png`, caption: 'Base pattern design' },
    { src: `${CDN}/aiga/background_cool.png`, caption: 'Pattern color variation' },
    { src: `${CDN}/aiga/Frame_madness1.jpg`, caption: 'QR code motif explorations' },
    { src: `${CDN}/aiga/Frame_madness2.jpg`, caption: 'Digital animation frames' },
  ],
  lastUpdated: '2026-02-07',
};
