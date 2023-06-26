import {
  createApiFactory,
  createPlugin,
  discoveryApiRef,
  createRoutableExtension,
} from '@backstage/core-plugin-api';
import { artifactRouteRef, rootRouteRef } from './routes';
import { ApicurioApiClient, apicurioApiRef } from './api';
import { APICURIO_ANNOTATION } from '@janus-idp/backstage-plugin-apicurio-common';
import { Entity } from '@backstage/catalog-model';

export const apicurioPlugin = createPlugin({
  id: 'apicurio',
  routes: {
    root: rootRouteRef,
    artifact: artifactRouteRef,
  },
  apis: [
    createApiFactory({
      api: apicurioApiRef,
      deps: {
        discoveryApi: discoveryApiRef,
      },
      factory: ({ discoveryApi }) => new ApicurioApiClient(discoveryApi),
    }),
  ],
});

export const ApicurioPage = apicurioPlugin.provide(
  createRoutableExtension({
    name: 'ApicurioPage',
    component: () =>
      import('./components/ApicurioComponent').then(m => m.ApicurioComponent),
    mountPoint: rootRouteRef,
  }),
);

/**
 * Props of EntityExampleComponent
 *
 * @public
 */
export type EntityApicurioContentProps = {
  /**
   * Sets the refresh interval in milliseconds. The default value is 10000 (10 seconds)
   */
  refreshIntervalMs?: number;
};

export const EntityApicurioContent: (
  props: EntityApicurioContentProps,
) => JSX.Element = apicurioPlugin.provide(
  createRoutableExtension({
    name: 'EntityApicurioContent',
    component: () => import('./Router').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

export const isApicurioAvailable = (entity: Entity) =>
  Boolean(entity?.metadata.annotations?.[APICURIO_ANNOTATION]);
