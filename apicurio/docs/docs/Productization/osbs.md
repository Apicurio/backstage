# OSBS

## What is OSBS?
OSBS - OpenShift Build System 

- Brew backend responsible for building productized docker images and rpm packages
- OSBS is used for building base (rhel) images, layered images, and even the builder image itself.
- Images to be released to customers MUST be built in OSBS
- Enforces a strict set of constraints on the build process
- Built on top of Brew, acting as a Koji content-generator
- Invoked with the rhpkg command

