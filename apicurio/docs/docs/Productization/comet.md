# Comet

Comet is a web-based interface for managing product and container image metadata presented within the Red Hat Container Catalog. Comet is meant to give content owners a “single pane of glass” to manage their content and gain insight about the things they care about. It’s a thin-client, meaning that all the heavy-lifting is managed by other Factory components. Few things about comet:-
- Comet is a web interface for product container management.
- PM can request new product containers
- Engineers can request new versions for existing containers
- Can view the freshness score and other details of containers.


- [Production](https://comet.engineering.redhat.com/):
Making changes in this environment will have an immediate effect on production metadata in Red Hat Container Catalog.

- [Stage](https://comet.stage.engineering.redhat.com/):
Making changes in this environment will NOT affect production container metadata. Changes will be reflected in [stage Container Catalog](https://access.stage.redhat.com/containers/).

Comet is also the official method for requesting repositories for images. This is done through Comet currently, but in the future, through Honey Badger.There are two types of repository:
- A Build repository is the dist-git and brew configuration that provides you a space on the build system to start building and testing your containers. It holds the Dockerfile and other files required for building the images. Content that will not be shipped to customers shouldn’t need a delivery repository.

- A Delivery repository is the Errata Tool and docker-pulp configuration that lets you publish containers to a publicly accessible repository in the Red Hat registry i.e. [Red Hat Container Catalog](https://catalog.redhat.com/). 

If you’ve never released images before, you will need to request for a Build Repository first for each container. Once you have successful builds, you'll need a Delivery Repository to ship the images to customers.