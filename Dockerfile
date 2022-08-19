FROM registry.access.redhat.com/ubi8/nodejs-16

WORKDIR /opt/backstage

USER root

RUN npm install --global yarn

COPY --chown=1001:0 yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

RUN yarn install --frozen-lockfile --production --network-timeout 300000 && rm -rf "$(yarn cache dir)"

COPY --chown=1001:0 packages/backend/dist/bundle.tar.gz app-config*.yaml ./
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

RUN chown -R 1001:0 /opt/backstage && chmod -R ug+rwx /opt/backstage

USER 1001

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
