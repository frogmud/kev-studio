import type { Project } from '../types';
import { CDN } from './constants';

export const sylvamo: Project = {
  slug: 'sylvamo',
  name: 'Sylvamo',
  category: 'project',
  client: 'Sylvamo (International Paper)',
  agency: 'Thackway McCord',
  role: 'Design, Branding, Web, Storyboarding, Print, Motion',
  summary: 'Branding for International Paper spinoff',
  description:
    'International Paper spun off their global papers business as Sylvamo, creating one of the world\'s largest producers of uncoated papers. The new company needed an identity from scratch.',
  disciplines: ['Design', 'Branding', 'Websites', 'Storyboarding', 'Print', 'Motion'],
  categories: ['design'],
  year: 2021,
  featured: true,
  thumbnail: `${CDN}/sylvamo/Sylvamo_CaseStudy_16x9_Guidelines.png`,
  heroImage: `${CDN}/sylvamo/Sylvamo_CaseStudy_WebHero.png`,
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Launch a Fortune 500 company with operations across four continents. The brand needed to work across cultures while establishing Sylvamo as the definitive paper company.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'The name Sylvamo comes from Latin roots meaning "love of forests." We built a brand system that celebrates the natural origins of paper while positioning the company as a sustainable industry leader.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'Sylvamo went public on the NYSE with a fully realized brand presence, from investor materials to facility signage across global operations.',
    },
  ],
  images: [
    { src: `${CDN}/sylvamo/Sylvamo_CaseStudy_16x9_Guidelines.png`, caption: 'Brand guidelines overview' },
    { src: `${CDN}/sylvamo/Sylvamo_CaseStudy_16x9_Instagram.png`, caption: 'Instagram content design' },
    { src: `${CDN}/sylvamo/Sylvamo_CaseStudy_Brochure.png`, caption: 'Corporate brochure' },
    { src: `${CDN}/sylvamo/Sylvamo_CaseStudy_HowTo.png`, caption: 'Product how-to guide' },
    { src: `${CDN}/sylvamo/Sylvamo_CaseStudy_IPODay3.gif`, caption: 'IPO day celebration' },
    { src: `${CDN}/sylvamo/Sylvamo_CaseStudy_TextFlip.gif`, caption: 'Typography animation' },
    { src: `${CDN}/sylvamo/Sylvamo_CaseStudy_Truck.jpg`, caption: 'Fleet vehicle branding' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_01.png`, caption: 'Indigo Awards brand overview' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_02.gif`, caption: 'Indigo Awards brand animation' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_03.png`, caption: 'Indigo Awards logo presentation' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_04.gif`, caption: 'Indigo Awards motion piece' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_05.png`, caption: 'Indigo Awards collateral' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_06.png`, caption: 'Indigo Awards digital applications' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_07.png`, caption: 'Indigo Awards print materials' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_08.gif`, caption: 'Indigo Awards animation reel' },
    { src: `${CDN}/sylvamo/Sylvamo_IndigoAwards21_09.png`, caption: 'Indigo Awards summary' },
  ],
  lastUpdated: '2026-02-07',
};
