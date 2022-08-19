# App Services [Backstage](https://backstage.io)

Backstage for Application Services

## Running

To start the app, run:

```sh
yarn install
yarn dev
yarn start-backend
```

## Building for production

```bash
yarn tsc
yarn build
```

## Docker image

```bash
docker pull quay.io/aperuffo/backstage-demo:latest
docker run -it -p 7007:7007 quay.io/aperuffo/backstage-demo:latest
```

The Docker image will be rebuilt and pushed on merge to `main`.

## Deploying to OpenShift

1. `oc new-app quay.io/wtrocki/app-services-backstage` (or use kubernetes.yaml for non openshift deploy)
2. Fetch route url `oc get route`
3. Set backend url in the env `APP_CONFIG_backend_baseUrl=your url` 