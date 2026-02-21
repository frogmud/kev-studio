import type { Project } from '../types';
import { CDN } from './constants';

export const neverDieGuy: Project = {
  slug: 'never-die-guy',
  name: 'NEVER DIE GUY',
  category: 'project',
  role: 'Direction, Design, Development, Game Design, System Architecture, Motion, VFX',
  summary: 'Roguelike dice combat game (work in progress)',
  description:
    'A Balatro-inspired roguelike where you throw dice at a 3D globe. Built with React 19, Three.js, and a custom combat engine. Includes a companion tools site, NPC lore wiki, and a shared design system across four production sites.',
  disciplines: ['Direction', 'Design', 'Branding', 'Websites', 'Motion', 'Strategy', 'Product'],
  categories: ['direction'],
  year: 2026,
  featured: true,
  thumbnail: `${CDN}/ndg/ndg-cover-image.png`,
  heroImage: `${CDN}/ndg/ndg-logo-image.png`,
  sections: [
    {
      id: 'concept',
      title: 'Concept',
      content:
        'Dice combat meets intergalactic sibling rivalry. Six domains, five NPCs, and AI-generated dialogue for every encounter. Each run spans 18 events with real-time dice physics.',
    },
    {
      id: 'execution',
      title: 'Execution',
      content:
        'React 19, Three.js, MUI 7, Turborepo monorepo. Custom combat engine with seeded RNG, NPC mood systems, Anthropic-powered dialogue, and PartyKit multiplayer. VFX pipeline for meteor impacts and animated rewards.',
    },
    {
      id: 'ecosystem',
      title: 'Ecosystem',
      content:
        'Companion site at dumgorf.net with 15 browser tools and an NPC lore wiki. Shared design token system across four production sites with 76+ Figma frames generated via MCP.',
    },
  ],
  images: [
    { src: `${CDN}/ndg/ndg-case-study-01.png`, caption: 'Homepage with loadout and actions' },
    { src: `${CDN}/ndg/ndg-case-study-02.png`, caption: 'Brand mark' },
    { src: `${CDN}/ndg/ndg-case-study-03.png`, caption: 'Mobile combat and Graveyard' },
    { src: `${CDN}/ndg/ndg-case-study-04.png`, caption: 'Play hub with ASCII globe' },
    { src: `${CDN}/ndg/ndg-case-study-05.png`, caption: 'Victory screen with run stats' },
    { src: `${CDN}/ndg/ndg-case-study-06.png`, caption: 'Mobile wiki pages' },
    { src: `${CDN}/ndg/ndg-case-study-07.png`, caption: 'Domain selection' },
    { src: `${CDN}/ndg/ndg-case-study-08.png`, caption: 'Diepedia items catalog' },
    { src: `${CDN}/ndg/ndg-case-study-09.png`, caption: 'Wiki character profile' },
    { src: `${CDN}/ndg/ndg-case-study-10.png`, caption: 'Settings and dice customization' },
    { src: `${CDN}/ndg/ndg-case-study-11.png`, caption: 'NPC encounter dialog' },
    { src: `${CDN}/ndg/ndg-ds-frames-01.png`, caption: 'Typography scale' },
    { src: `${CDN}/ndg/ndg-ds-frames-02.png`, caption: 'Game HUD elements' },
    { src: `${CDN}/ndg/screen-responsive-breakpoints.png`, caption: 'Responsive breakpoints' },
    { src: `${CDN}/ndg/screen-asset-library.png`, caption: 'Sprite and asset library' },
    { src: `${CDN}/ndg/screen-figma-overview.png`, caption: 'Figma design system' },
  ],
  lastUpdated: '2026-02-14',
};
