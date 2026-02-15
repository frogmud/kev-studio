import type { AboutProfile } from './types';

export const about: AboutProfile = {
  slug: 'kevin-grzejka',
  name: 'Kevin Grzejka',
  category: 'about',
  title: 'Creative Director & Designer',
  location: 'New Jersey',
  description:
    'Creative director and designer based in New Jersey.',
  image: '/assets/kevin-pfp.png',
  links: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kevingrzejka', icon: 'LinkedIn' },
    { label: 'Dribbble', url: 'https://dribbble.com/kevingrz', icon: 'Brush' },
    { label: 'Vimeo', url: 'https://vimeo.com/user101528894', icon: 'VideoLibrary' },
    { label: 'GitHub', url: 'https://github.com/frogmud', icon: 'GitHub' },
    { label: 'Artstation', url: 'https://www.artstation.com/kevgrz', icon: 'Palette' },
  ],
  skills: [
    'Brand Strategy',
    'Visual Identity',
    'Motion Design',
    'Web Design',
    'Art Direction',
    'Storyboarding',
    'Print Design',
  ],
  experience: [
    {
      company: 'Meltwater',
      role: 'Product Designer',
      period: '2025 — Present',
    },
    {
      company: 'Absorb Software',
      role: 'Digital Designer',
      period: '2023 — 2025',
      description:
        'Brand refresh, website redesign, eBook series, CMS migration, product videos, design jams with Product, 3D Prism build, and direction of cross-functional projects.',
    },
    {
      company: 'Thackway McCord',
      role: 'Senior Designer',
      period: '2018 — 2022',
      description:
        'End-to-end branding projects specializing in logo, identity, and system design. Led design direction and managed WordPress development.',
    },
    {
      company: 'Fiserv',
      role: 'Software Development Engineer II',
      period: '2016 — 2017',
      description:
        'Programmed modular reports using APL, Exstream, C#, and Postscript. Transitioned projects from waterfall to agile.',
    },
    {
      company: 'Fiserv',
      role: 'Associate Software Developer',
      period: '2015 — 2016',
      description:
        'Maintained financial document templates using APL, C#, and Postscript.',
    },
    {
      company: 'Rutgers University',
      role: 'Design Intern',
      period: '2014 — 2015',
      description:
        'Designed promotional materials and digital graphics for university events and programs.',
    },
  ],
  seeAlso: [],
};
