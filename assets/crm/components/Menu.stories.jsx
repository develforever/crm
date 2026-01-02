import { MemoryRouter } from 'react-router-dom';

import { Menu } from './Menu';

export default {
  title: 'CRM/Menu',
  component: Menu,
  decorators: [(Story, context) => {
    const initialEntries = context.parameters?.routerInitialEntries ?? ['/'];
    return <MemoryRouter initialEntries={initialEntries}><Story /></MemoryRouter>;
  }],
  tags: ['autodocs'],
  argTypes: {
    intranetUrl: { control: 'text' },
  },
  args: {
    intranetUrl: '/en',
    items: [
      { label: 'Home', to: '/' },
      { label: 'CMS', to: '/cms' },
    ],
  },
};

export const Default = {};

export const ActiveCms = {
  args: {  },
  parameters: { routerInitialEntries: ['/cms'] },
};

export const CustomItems = {
  args: {
    items: [
      { label: 'Overview', to: '/' },
      { label: 'Users', to: '/users' },
    ],

  },
};
