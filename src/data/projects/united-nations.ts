import type { Project } from '../types';
import { CDN } from './constants';

export const unitedNations: Project = {
  slug: 'united-nations',
  name: 'United Nations',
  category: 'project',
  client: 'United Nations, Office of the PGA',
  agency: 'Thackway McCord',
  role: 'Design, Logo, Digital, Print',
  summary: 'Visual identity for the 73rd President of the General Assembly',
  description:
    'In 2018, the UN President introduced "Morning Minga," a diplomatic dialogue format. The term "Minga" refers to a South American community tradition, reflecting the initiative\'s collaborative spirit and the Ecuadorian heritage of the 73rd PGA, Maria Fernanda Espinosa Garces.',
  disciplines: ['Design', 'Branding', 'Print'],
  categories: ['design'],
  year: 2018,
  featured: true,
  thumbnail: `${CDN}/un/UN_1.png`,
  heroImage: `${CDN}/un/UN_1.png`,
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Create a comprehensive brand identity for a new UN diplomatic initiative that communicates its collaborative spirit and cultural roots, working across digital, print, and environmental applications.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'Developed a visual system encompassing logo design, logo animation, digital applications, and printed materials including banners, leaflets, and diplomatic correspondence. The identity extended to environmental graphics and presentation decks.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'The Morning Minga brand launched across all UN touchpoints. The success of the initial identity led to expansion across additional diplomatic programs under the 73rd PGA.',
    },
  ],
  images: [
    { src: `${CDN}/un/UN_2.png`, caption: 'Morning Minga logo system' },
    { src: `${CDN}/un/UN_3.png`, caption: 'Diplomatic correspondence' },
    { src: `${CDN}/un/UN_4.png`, caption: 'Environmental graphics' },
    { src: `${CDN}/un/UN_6.png`, caption: 'Banner design system' },
    { src: `${CDN}/un/UN_8.png`, caption: 'Digital media applications' },
    { src: `${CDN}/un/UN_9.png`, caption: 'Brand extension materials' },
    { src: `${CDN}/un/UN_PGA_CaseStudy_Slide8.png`, caption: 'Case study presentation' },
    { src: `${CDN}/un/UNPGA73_TransformAwards_Sequence_03.png`, caption: 'Transform Awards submission' },
    { src: `${CDN}/un/additional/MoningMinga.jpg`, caption: 'Morning Minga program identity' },
    { src: `${CDN}/un/additional/MorningMinga_LogoAnimation.gif`, caption: 'Logo animation' },
    { src: `${CDN}/un/additional/UN_PGA_MorningMinga_SocialMediaCard_110618.png`, caption: 'Social media card' },
    { src: `${CDN}/un/additional/UN_PGA73_MorningMinga_LogoAnimation.gif`, caption: 'Logo animation sequence' },
  ],
  lastUpdated: '2026-02-07',
};
