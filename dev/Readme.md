# Development mode for Backstage

Steps to have a running local environment:

- In the root folder of this project run: `yarn && yarn tsc && yarn build && yarn build-image`
- In this folder run: `docker-compose up`

Now you can access the backstage instance at `localhost:7007` and registry at `localhost:8080`
