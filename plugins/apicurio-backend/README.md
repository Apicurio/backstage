# apicurio

Welcome to the apicurio backend plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn
start` in the root directory, and then navigating to [/apicurio](http://localhost:3000/apicurio).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](/dev) directory.

## Install apicurio backend plugin

```bash
# From your Backstage root directory
yarn add --cwd packages/backend @backstage/backstage-plugin-apicurio-backend
```

Create a file called `apicurio.ts` inside `packages/backend/src/plugins/` and
add the following:

```ts title="packages/backend/src/plugins/apicurio.ts"
import { createRouter } from '@janus-idp/backstage-plugin-apicurio-backend';
import { Router } from 'express';
import { PluginEnvironment } from '../types';

export default async function createPlugin(
  env: PluginEnvironment,
): Promise<Router> {
  return await createRouter({
    logger: env.logger,
    config: env.config,
  });
}
```

And import the plugin to `packages/backend/src/index.ts`. There are three lines
of code you'll need to add, and they should be added near similar code in your
existing Backstage backend.

```typescript title="packages/backend/src/index.ts"
// ..
/* highlight-add-next-line */
import apicurio from './plugins/apicurio';

async function main() {
  // ...
  /* highlight-add-next-line */
  const apicurioEnv = useHotMemoize(module, () => createEnv('apicurio'));
  // ...
  /* highlight-add-next-line */
  apiRouter.use('/apicurio', await apicurio(apicurioEnv));
```

That's it! The Apicurio backend have now been added to your Backstage app.

# Setup configuration

Add in app-config under catalog

```yaml
catalog:
  providers:
    apicurio:
      url: http://localhost:8080
```
