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
  disciplines: ['Direction', 'Design', 'Branding', 'Web Design', 'Motion', 'Strategy'],
  categories: ['direction'],
  year: 2026,
  featured: true,
  thumbnail: `${CDN}/ndg/screen-landing.png`,
  heroImage: `${CDN}/ndg/ndg-logo.svg`,
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
        'Companion site at neverdie.fun with 15 browser tools and an NPC lore wiki. Shared design token system across four production sites with 76+ Figma frames generated via MCP.',
    },
  ],
  images: [
    { src: `${CDN}/ndg/screen-landing.png`, caption: 'Homepage with loadout' },
    { src: `${CDN}/ndg/screen-play-hub.png`, caption: 'Play hub with ASCII globe' },
    { src: `${CDN}/ndg/screen-loadout.png`, caption: 'Loadout selection' },
    { src: `${CDN}/ndg/screen-npc-encounter.png`, caption: 'NPC encounter dialog' },
    { src: `${CDN}/ndg/screen-domain-select.png`, caption: 'Domain selection' },
    { src: `${CDN}/ndg/screen-shop-general.png`, caption: 'Shop — The General' },
    { src: `${CDN}/ndg/screen-shop-bones.png`, caption: 'Shop — Mr. Bones' },
    { src: `${CDN}/ndg/screen-victory.png`, caption: 'Victory screen' },
    { src: `${CDN}/ndg/screen-homepage-alt.png`, caption: 'Settings and controls' },
    { src: `${CDN}/ndg/screen-diepedia.png`, caption: 'Diepedia items catalog' },
    { src: `${CDN}/ndg/screen-wiki-character.png`, caption: 'Wiki character profile' },
    { src: `${CDN}/ndg/screen-victory-compact.png`, caption: 'Victory summary' },
    { src: `${CDN}/ndg/screen-responsive-breakpoints.png`, caption: 'Responsive breakpoints' },
    { src: `${CDN}/ndg/screen-asset-library.png`, caption: 'Sprite and asset library' },
    { src: `${CDN}/ndg/screen-figma-overview.png`, caption: 'Figma design system' },
  ],
  lastUpdated: '2026-02-14',
};
