import React from 'react';
import { Page, Content } from '@backstage/core-components';
import { Artifacts } from '../';

export const ApicurioComponent = () => {
  return (
    <Page themeId="tool">
      <Content>
        <Artifacts />
      </Content>
    </Page>
  );
};
