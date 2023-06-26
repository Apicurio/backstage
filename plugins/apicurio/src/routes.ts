import { createRouteRef, createSubRouteRef } from '@backstage/core-plugin-api';

export const rootRouteRef = createRouteRef({
  id: 'apicurio',
});

export const artifactRouteRef = createSubRouteRef({
  id: 'apicurio-artifact',
  path: '/artifacts/:groupId/:id/versions/:version',
  parent: rootRouteRef,
});
