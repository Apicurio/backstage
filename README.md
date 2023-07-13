# App Services [Backstage](https://backstage.io)

Backstage for Application Services

## Running Locally

To start the app, run:

```sh
# build
yarn install
# you need to specify the Registry endpoint
# to bring up a temporary in-memory one:
#  podman run  -it -p 8080:8080 apicurio/apicurio-registry-mem:latest-release
REGISTRY_ENDPOINT="http://localhost:8080" yarn dev
```
## Replicate the environment

```sh
# create a new environment
python3.10 -m venv .env
# activate it
source .env/bin/activate
# or this if on windows
.\env\Scripts\activate
# install packages
pip install -r requirements.txt
```

## Build pre-requisites on Fedora

```sh
# you need to install python3.10 and pass a reference to GYP to use it
sudo dnf install pypy2 pypy3.9 python3.10 libuv-devel brotli-devel
export  NODE_GYP_FORCE_PYTHON=/usr/bin/python3.10

yarn install

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

1. `oc new-app quay.io/aperuffo/app-services-backstage` (or use kubernetes.yaml for non openshift deploy)
2. Fetch route url `oc get route`
3. Set backend url in the env `APP_CONFIG_backend_baseUrl=your url` 
