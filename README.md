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
docker pull quay.io/wtrocki/app-services-backstage
docker run -it -p 7007:7007 quay.io/wtrocki/app-services-backstage
```

## Releases

1. Create new release in the github
2. Docker image would be published automatically
