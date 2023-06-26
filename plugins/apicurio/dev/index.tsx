import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { apicurioPlugin, ApicurioPage } from '../src/plugin';

createDevApp()
  .registerPlugin(apicurioPlugin)
  .addPage({
    element: <ApicurioPage />,
    title: 'Root Page',
    path: '/apicurio',
  })
  .render();
