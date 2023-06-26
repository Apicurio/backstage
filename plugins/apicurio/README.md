# Apicurio

Welcome to the apicurio plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn start` in the root directory, and then navigating to [/apicurio](http://localhost:3000/apicurio).

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](./dev) directory.

# Setup Apicurio Plugin

The first step is to add the Apicurio frontend plugin to your Backstage
application.

```bash
# From your Backstage root directory
yarn add --cwd packages/app @janus-idp/plugin-apicurio
```

Once the package has been installed, you need to import the plugin in your app
by adding the "Apicurio" tab to the respective catalog pages.

```tsx title="packages/app/src/components/catalog/EntityPage.tsx"
/* highlight-add-next-line */
import { EntityApicurioContent } from '@janus-idp/plugin-apicurio';

// You can add the tab to any number of pages, the service page is shown as an
// example here
const serviceEntityPage = (
  <EntityLayout>
    {/* other tabs... */}
    {/* highlight-add-start */}
    <EntityLayout.Route path="/apicurio" title="Apicurio">
      <EntityApicurioContent />
    </EntityLayout.Route>
    {/* highlight-add-end */}
  </EntityLayout>
);
```
