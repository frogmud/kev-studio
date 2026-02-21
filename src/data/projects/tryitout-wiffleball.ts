import type { Project } from '../types';
import { CDN } from './constants';

export const tryitoutWiffleball: Project = {
  slug: 'tryitout-wiffleball',
  name: 'Try It Out with MLW',
  category: 'project',
  client: 'Major League Wiffleball',
  role: 'Art Direction, Brand Design, Print, Motion',
  summary: 'Brand identity for a recreational sports tournament',
  description:
    'A semi-professional wiffleball league by NJ friends, transformed from casual activity into a competitive venture. Balanced the playful, grassroots nature with a professional-looking identity system that embraces DIY spirit.',
  disciplines: ['Direction', 'Branding', 'Websites', 'Print', 'Motion', 'Strategy'],
  categories: ['direction'],
  year: 2019,
  featured: false,
  thumbnail: `${CDN}/tryitout/Tryitout_2_Shirt.jpg`,
  heroImage: `${CDN}/tryitout/Tryitout_0_aniweb_4x3_v3.gif`,
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Create a brand identity for a wiffleball league that feels both fun and legitimate, embracing the grassroots spirit while establishing a professional visual presence.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'Developed bold, condensed lettering with a distinctive angle. Created a trading card system with personalized player cards, portrait photography, and stats. Designed jerseys, t-shirts, and game-day materials.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'The brand transformed casual gatherings into an organized community with branded scorecards, signage, social media presence, and a nostalgic connection to classic sports card collecting.',
    },
  ],
  images: [
    { src: `${CDN}/tryitout/tryitout_05_logoevol-03.gif`, caption: 'Logo evolution animation' },
    { src: `${CDN}/tryitout/tryitout-10-cards-600x.jpg`, caption: 'Trading card collection' },
    { src: `${CDN}/tryitout/card_animation_1_kevin.gif`, caption: 'Player card: Kevin' },
    { src: `${CDN}/tryitout/card_animation_2_dennis.gif`, caption: 'Player card: Dennis' },
    { src: `${CDN}/tryitout/card_animation_3_lats.gif`, caption: 'Player card: Lats' },
    { src: `${CDN}/tryitout/card_animation_4_leela.gif`, caption: 'Player card: Leela' },
    { src: `${CDN}/tryitout/Tryitout_10_Groupshot2.jpg`, caption: 'Team group shot' },
    { src: `${CDN}/tryitout/Tryitout_11_Game1.jpg`, caption: 'Game day action' },
    { src: `${CDN}/tryitout/youtube_screens1.jpg`, caption: 'YouTube channel design' },
    { src: `${CDN}/tryitout/youtube_screens2.jpg`, caption: 'YouTube video thumbnails' },
    { src: `${CDN}/tryitout/youtube_screens3.jpg`, caption: 'YouTube brand presence' },
  ],
  lastUpdated: '2026-02-07',
};
