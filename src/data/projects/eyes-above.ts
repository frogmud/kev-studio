import type { Project } from '../types';
import { CDN } from './constants';

export const eyesAbove: Project = {
  slug: 'eyes-above',
  name: 'Eyes Above',
  category: 'project',
  role: 'Direction, Branding, Web, Storyboarding, Print, Motion, Strategy',
  summary: 'Werewolves & wraiths oh my',
  description:
    'A personal worldbuilding project exploring gothic horror through illustration, writing, and interactive media. Equal parts sketchbook and story bible.',
  disciplines: ['Direction', 'Branding', 'Web Design', 'Storyboarding', 'Print', 'Motion', 'Strategy'],
  categories: ['direction'],
  year: 2023,
  featured: true,
  thumbnail: `${CDN}/eyesabove/01_EyesAbove_GameCase_YG21_Grzejka.gif`,
  heroImage: `${CDN}/eyesabove/09_EyesAbove_TimesSqAd_YG21_Grzejka.jpg`,
  sections: [
    {
      id: 'concept',
      title: 'Concept',
      content:
        'Eyes Above is a universe where the monsters won. Werewolves run the economy, wraiths handle diplomacy, and humans are just another species trying to get by. The project explores what society looks like when the horror becomes mundane.',
    },
    {
      id: 'execution',
      title: 'Execution',
      content:
        'The project spans illustration, short fiction, and interactive experiments. Each piece adds to a growing lore document that tracks the history, factions, and key figures of this world.',
    },
    {
      id: 'status',
      title: 'Status',
      content:
        'Ongoing. New pieces added as inspiration strikes. Currently exploring the economics of a werewolf-run logistics company.',
    },
  ],
  images: [
    { src: `${CDN}/eyesabove/02_eyes_above_subway_posters_4x3.gif`, caption: 'Subway poster campaign' },
    { src: `${CDN}/eyesabove/02_eyes_above_tvs_4k.gif`, caption: 'Television broadcast graphics' },
    { src: `${CDN}/eyesabove/03_EyesAbove_Handheld_YG21_Grzejka.png`, caption: 'Handheld game mockup' },
    { src: `${CDN}/eyesabove/05_EyesAbove_Sketchbook_YG21_Grzejka.gif`, caption: 'Sketchbook process' },
    { src: `${CDN}/eyesabove/06_EyesAbove_Book_YG21_Grzejka.png`, caption: 'World lore book' },
    { src: `${CDN}/eyesabove/08_EyesAbove_SubwayAd_YG21_Grzejka.jpeg`, caption: 'Subway advertisement' },
    { src: `${CDN}/eyesabove/10_EyesAbove_TrainCarAd_YG21_Grzejka.jpg`, caption: 'Train car advertisement' },
    { src: `${CDN}/eyesabove/11_EyesAbove_Boards_YG21_Grzejka.png`, caption: 'Presentation boards' },
  ],
  lastUpdated: '2026-02-07',
};
