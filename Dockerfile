FROM registry.access.redhat.com/ubi8/nodejs-16

WORKDIR /app

USER root

RUN npm install --global yarn

RUN yum install make gcc openssl-devel bzip2-devel libffi-devel zlib-devel java-11-openjdk-devel graphviz fontconfig brotli-devel python3.11 -y && \
    curl https://bootstrap.pypa.io/get-pip.py --output get-pip.py && \
    python3 get-pip.py && \
    pip3 install --upgrade pip && pip3 install mkdocs-techdocs-core && \
    yum -y clean all --enablerepo='*'
RUN curl -o plantuml.jar -L http://sourceforge.net/projects/plantuml/files/plantuml.1.2023.10.jar/download && mv plantuml.jar /opt/plantuml.jar
RUN echo '#!/bin/sh\n\njava -jar '/opt/plantuml.jar' ${@}' >> /usr/local/bin/plantuml

COPY --chown=1001:0 yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

RUN yarn install --frozen-lockfile --production --network-timeout 300000 && rm -rf "$(yarn cache dir)"

COPY --chown=1001:0 packages/backend/dist/bundle.tar.gz app-config*.yaml /app/
COPY --chown=1001:0 apicurio /app/apicurio
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

RUN chown -R 1001:0 /app && chmod -R ug+rwx /app

ENV LOG_LEVEL=debug

USER 1001

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
