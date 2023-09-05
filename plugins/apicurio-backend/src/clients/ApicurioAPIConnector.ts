import { Logger } from 'winston';
import { ForwardedError } from '@backstage/errors';
import {
  ArtifactsSearchResults,
  ArtifactDetail,
  ArtifactMetaData,
  ApicurioRegistry,  
  ApiError,
  Rule,
  SearchedVersionResults,
} from '@janus-idp/backstage-plugin-apicurio-common';
import fetch from 'node-fetch';
import { hasProperty } from '../helpers';

type Options = {
  logger: Logger;
  apicurio_registry: ApicurioRegistry;
};

export interface ApicurioApi {
  searchArtifacts(query: string): Promise<ArtifactsSearchResults>;
  getArtifact(
    groupId: string,
    id: string,
    version: string,
    annotation?: string,
  ): Promise<ArtifactDetail | ApiError[]>;
}

const registryAPI = 'apis/registry/v2';

export class ApicurioApiImpl implements ApicurioApi {
  private readonly logger: Logger;
  private readonly apicurio: ApicurioRegistry;
  constructor(options: Options) {
    options.logger.debug(
      `creating apicurio client with url=${options.apicurio_registry.url}`,
    );
    this.apicurio = options.apicurio_registry;
    this.logger = options.logger;
  }

  private async fetchAPI<T>(
    endpoint: string,
    kind: string,
    type: string = 'json',
  ): Promise<T> {
    const url = new URL(endpoint, this.apicurio.url).href;
    this.logger.info(`Fetching ${kind} : ${url}`);
    return fetch(url)
      .then(resp => {
        if (type === 'text') {
          // @ts-ignore
          return resp.text() as Promise<T>;
        }
        return resp.json() as Promise<T>;
      })
      .catch(error => {
        this.logger.error(` Error fetching ${kind} : ${error}`);
        throw new Error(error);
      });
  }

  async searchArtifacts(query: string): Promise<ArtifactsSearchResults> {
    try {
      const searchArtifacts = this.fetchAPI<ArtifactsSearchResults>(
        `${registryAPI}/search/artifacts?${query}`,
        'searchArtifacts',
      );
      await searchArtifacts
        .then(response => response)
        .catch(error => {
          this.logger.error(`Error searching artifacts: ${error}`);
          throw new Error(error);
        });
      return searchArtifacts;
    } catch (err) {
      throw new ForwardedError(`Unexpected Error fetching Artifacts :`, err);
    }
  }

  async getArtifact(
    groupId: string,
    id: string,
    version: string,
    properties?: string,
  ): Promise<ArtifactDetail | ApiError[]> {
    try {
      const artifact: ArtifactDetail = {
        artifact: null,
        artifactContent: '',
        rules: null,
        versions: null,
        link: `${this.apicurio.url}/ui/artifacts/${groupId}/${id}/versions/${version}`,
      };
      let errors: ApiError[] = [];
      const endpoint = `${registryAPI}/groups/${groupId}/artifacts/${id}`;
      let endpointVersion = endpoint;
      if (version !== 'latest') {
        endpointVersion += `/versions/${version}`;
      }
      let rules: string[] = [];
      const metaArtifact = this.fetchAPI<ArtifactMetaData | ApiError>(
        `${endpointVersion}/meta`,
        'getMetaArtifact',
      );
      const contentArtifact = this.fetchAPI<string | ApiError>(
        endpointVersion,
        ' getContentArtifact',
        'text',
      );
      const rulesArtifact = this.fetchAPI<string[] | ApiError>(
        `${endpoint}/rules`,
        ' getRulesArtifact',
      );
      const versionsArtifact = this.fetchAPI<SearchedVersionResults | ApiError>(
        `${endpoint}/versions?limit=500`,
        ' getVersionsArtifact',
      );
      await Promise.all([
        metaArtifact,
        contentArtifact,
        rulesArtifact,
        versionsArtifact,
      ]).then(results => {
        // Check MetaInformation
        errors = results.filter(
          res => (res as ApiError).error_code,
        ) as ApiError[];
        if (errors.length === 0) {
          const meta = results[0] as ArtifactMetaData;
          if (hasProperty(meta.properties, properties)) {
            artifact.artifact = meta;
            artifact.artifactContent = results[1] as string;
            rules = results[2] as string[];
            artifact.versions = results[3] as SearchedVersionResults;
          } else {
            errors.push({
              causes: null,
              name: 'Artifact not allowed',
              error_code: 405,
              message: '',
              detail: `Artifact ${groupId}/${id} has not the properties ${properties} defined in the entity`,
            });
          }
        }
      });
      if (errors.length === 0) {
        const rulesConfigArtifact: Promise<Rule | ApiError>[] = rules.map(r =>
          this.fetchAPI<Rule | ApiError>(
            `${endpoint}/rules/${r}`,
            ` getRulesArtifact_${r}`,
          ),
        );
        await Promise.all(rulesConfigArtifact).then(results => {
          errors = results.filter(
            res => (res as ApiError).error_code,
          ) as ApiError[];
          if (errors.length === 0) {
            artifact.rules = results as Rule[];
          }
        });
      }

      return errors.length > 0 ? errors : artifact;
    } catch (err) {
      throw new ForwardedError(`Unexpected Error fetching Artifacts :`, err);
    }
  }
}
