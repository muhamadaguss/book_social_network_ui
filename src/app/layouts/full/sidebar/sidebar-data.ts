import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    displayName: 'My Books',
    iconName: 'books',
    route: '/books',
  },
  {
    displayName: 'My Waiting List',
    iconName: 'heart',
    route: '/waiting-list',
  },
  {
    displayName: 'My Returned Books',
    iconName: 'book-upload',
    route: '/returned-books',
  },
  {
    displayName: 'Borrowed Books',
    iconName: 'book-download',
    route: '/borrowed-books',
  },
];
