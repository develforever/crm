import { fn } from 'storybook/test';
import { BrowserRouter } from 'react-router-dom';

import { Menu } from './Menu';


export default {
  title: 'CRM/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {

  },
  args: {
    intranetUrl: '/pl',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export const Main = {
  args: {

  },
};

