import {
  PhFile,
  PhGear,
  PhHeadphones,
  PhImage,
  PhMoon,
  PhPlus,
  PhTag,
  PhVideo,
} from '@phosphor-icons/vue';
import { SidebarItem } from '../types/navigation';

export const sidebarItems: SidebarItem[] = [
  {
    title: 'Home',
    items: [
      {
        title: 'Images',
        icon: PhImage,
        route: '/',
      },
      {
        title: 'Documents',
        icon: PhFile,
        route: '/documents',
      },
      {
        title: 'Audio',
        icon: PhHeadphones,
        route: '/audio',
      },
      {
        title: 'Video',
        icon: PhVideo,
        route: '/video',
      },
    ],
  },
  {
    title: 'Tags',
    items: [
      {
        title: 'All tags',
        icon: PhTag,
        route: '/tags',
      },
      {
        title: 'New tag',
        icon: PhPlus,
        route: '/tags',
        noHighlight: true,
        routeParams: { new: true },
      },
    ],
  },
];

export const bottomSidebarItems: SidebarItem[] = [
  {
    title: 'Settings',
    items: [
      {
        title: 'App settings',
        icon: PhGear,
        route: '/settings',
      },
      {
        title: 'Appearance settings',
        icon: PhMoon,
        route: '/settings/appearance',
      },
    ],
  },
];
