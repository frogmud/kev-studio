import type { Project } from '../types';
import { CDN } from './constants';

export const qrCodesFun: Project = {
  slug: 'qr-codes-fun',
  name: 'Making QR codes fun!',
  category: 'project',
  client: 'Rosie and Bean',
  agency: 'Thackway McCord',
  role: 'Art Direction, Design, Illustration, Motion, Programming, Packaging',
  summary: 'Custom QR code illustrations for holiday chocolate bars',
  description:
    'Holiday gift project transforming functional QR codes into engaging pet portraits, each linking to a personalized digital experience. Hand-drawn illustrations maintain scannability while serving as the packaging\'s primary visual element.',
  disciplines: ['Direction', 'Branding', 'Websites', 'Print', 'Motion', 'Strategy'],
  categories: ['direction'],
  year: 2021,
  featured: false,
  thumbnail: `${CDN}/chocolates/TM_IndigoAwards21_01.gif`,
  heroImage: `${CDN}/chocolates/TM_IndigoAwards21_01.gif`,
  quotes: [
    { text: 'Indigo Design Award 2021 and Communication Arts Illustration shortlist.' },
  ],
  sections: [
    {
      id: 'challenge',
      title: 'Challenge',
      content:
        'Reimagine QR codes as hand-drawn pet portraits for holiday chocolate packaging, maintaining scannability while creating delightful, personal gift experiences.',
    },
    {
      id: 'approach',
      title: 'Approach',
      content:
        'Meticulously illustrated QR codes as pet portraits, designed packaging using Monotype\'s Cotford typeface, and built 8-bit style pet animations on custom landing pages. Extended with companion stickers and GIF animations on Giphy.',
    },
    {
      id: 'results',
      title: 'Results',
      content:
        'The project won an Indigo Design Award 2021 and was shortlisted for Communication Arts Illustration. The approach demonstrated that functional technology can be visually delightful.',
    },
  ],
  images: [
    { src: `${CDN}/chocolates/02_TM_Chocolates_YG21_Grzejka.jpg`, caption: 'Chocolate bar collection' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_02.gif`, caption: 'QR code scanning demo' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_03.png`, caption: 'QR code pet portraits' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_04.png`, caption: 'Packaging design' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_05.png`, caption: 'Packaging flat layout' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_06.jpg`, caption: 'Finished chocolate bars' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_07.png`, caption: 'Companion sticker designs' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_08.png`, caption: 'Gift box presentation' },
    { src: `${CDN}/chocolates/TM_IndigoAwards21_09.gif`, caption: '8-bit pet animation' },
  ],
  lastUpdated: '2026-02-07',
};
