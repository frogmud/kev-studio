import type { Project } from '../types';
import { CDN } from './constants';

export const lifepointHealth: Project = {
  slug: 'lifepoint-health',
  name: 'Lifepoint Health',
  category: 'project',
  client: 'Lifepoint Health',
  agency: 'Thackway McCord',
  role: 'Direction, Branding, Print, Motion, Strategy',
  summary: 'Branding a national healthcare network',
  description:
    'Lifepoint Health operates hospitals and healthcare facilities across rural America. Their brand needed to communicate both national scale and local care.',
  disciplines: ['Direction', 'Branding', 'Print', 'Motion', 'Strategy'],
  categories: ['direction'],
  year: 2022,
  featured: true,
  thumbnail: `${CDN}/lifepoint/10_Lifepoint_HQSign_YG21_Grzejka-copy.png`,
  heroImage: `${CDN}/lifepoint/Hospital_BigSign-2023.jpg`,
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Healthcare branding walks a fine line between clinical credibility and human warmth. Lifepoint needed to feel like a trusted neighbor, not a faceless corporation.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'We developed a brand platform centered on the idea of "making communities healthier." The visual system uses photography and illustration to put real people and places at the center of every communication.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'The refreshed brand rolled out across Lifepoint\'s network of facilities, unifying dozens of local hospital brands under a cohesive national identity.',
    },
  ],
  images: [
    { src: `${CDN}/lifepoint/Leaflet.png`, caption: 'Brand platform leaflet' },
    { src: `${CDN}/lifepoint/Lifepoint_HospitalWall.jpg`, caption: 'Hospital wall signage' },
    { src: `${CDN}/lifepoint/Icons.png`, caption: 'Custom icon system' },
    { src: `${CDN}/lifepoint/05_Lifepoint_Leaflets_YG21_Grzejka.png`, caption: 'Marketing leaflets' },
    { src: `${CDN}/lifepoint/10_Lifepoint_HQSign_YG21_Grzejka-copy.png`, caption: 'Headquarters signage' },
    { src: `${CDN}/lifepoint/Billboard_Cycle.gif`, caption: 'Billboard campaign rotation' },
    { src: `${CDN}/lifepoint/LifepointIphoneMockup.gif`, caption: 'Mobile app interface' },
    { src: `${CDN}/lifepoint/LP_Guides_Animated_110422.gif`, caption: 'Brand guidelines animation' },
    { src: `${CDN}/lifepoint/Shuttle_BG.png`, caption: 'Shuttle bus wrap' },
    { src: `${CDN}/lifepoint/Wall_Elevator.png`, caption: 'Elevator environmental graphics' },
    { src: `${CDN}/lifepoint/Web_Scroll_Laptop_16x9.gif`, caption: 'Website scroll animation' },
    { src: `${CDN}/lifepoint/z03_Lifepoint_Watch_YG21_Grzejka.gif`, caption: 'Smartwatch app design' },
    { src: `${CDN}/lifepoint/z07_DigitalPoster-copy-2.gif`, caption: 'Digital poster display' },
    { src: `${CDN}/lifepoint/z07_DigitalSign-copy-2.gif`, caption: 'Digital signage network' },
  ],
  lastUpdated: '2026-02-07',
};
