FROM registry.access.redhat.com/ubi8/nodejs-16

WORKDIR /opt/backstage

USER root

RUN npm install --global yarn

# Still failing ... from: https://github.com/backstage/backstage/issues/9983#issuecomment-1133791360
# Install Pythion > 3.7
RUN yum install make gcc openssl-devel bzip2-devel libffi-devel zlib-devel java-11-openjdk-devel graphviz fontconfig -y && \
  curl https://www.python.org/ftp/python/3.7.9/Python-3.7.9.tgz --output Python-3.7.9.tgz && \
  tar xzf Python-3.7.9.tgz && \
  cd Python-3.7.9 && \
  ./configure --enable-optimizations && \
  make altinstall && \
  curl https://bootstrap.pypa.io/get-pip.py --output get-pip.py && \
  python3.7 get-pip.py && \
  pip3 install --upgrade pip && pip install mkdocs-techdocs-core==1.0.2 && \
  cd .. && rm Python-3.7.9.tgz && rm -rf Python-3.7.9 && \
  yum -y clean all --enablerepo='*'
RUN curl -o plantuml.jar -L http://sourceforge.net/projects/plantuml/files/plantuml.1.2021.12.jar/download && echo "a3d10c17ab1158843a7a7120dd064ba2eda4363f  plantuml.jar" | sha1sum -c - && mv plantuml.jar /opt/plantuml.jar
RUN echo '#!/bin/sh\n\njava -jar '/opt/plantuml.jar' ${@}' >> /usr/local/bin/plantuml

COPY --chown=1001:0 yarn.lock package.json packages/backend/dist/skeleton.tar.gz ./
RUN tar xzf skeleton.tar.gz && rm skeleton.tar.gz

RUN yarn install --frozen-lockfile --production --network-timeout 300000 && rm -rf "$(yarn cache dir)"

COPY --chown=1001:0 packages/backend/dist/bundle.tar.gz app-config*.yaml ./
COPY --chown=1001:0 apicurio ./apicurio
RUN tar xzf bundle.tar.gz && rm bundle.tar.gz

RUN chown -R 1001:0 /opt/backstage && chmod -R ug+rwx /opt/backstage

ENV LOG_LEVEL=debug

USER 1001

EXPOSE 7007

CMD ["node", "packages/backend", "--config", "app-config.yaml", "--config", "app-config.production.yaml"]
