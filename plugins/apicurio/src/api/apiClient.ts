import { createApiRef, DiscoveryApi } from '@backstage/core-plugin-api';
import { Entity } from '@backstage/catalog-model';
import {
  APICURIO_ANNOTATION,
  ApiError,
  ArtifactsSearchResults,
  ArtifactDetail,
} from '@janus-idp/backstage-plugin-apicurio-common';

export interface ApicurioApiV1 {
  setEntity(entity: Entity): void;
  searchArtifacts(query: Record<string, any>): Promise<ArtifactsSearchResults>;
  getArtifact(
    groupId: string,
    id: string,
    version?: string,
  ): Promise<ArtifactDetail | ApiError[]>;
}

export const apicurioApiRef = createApiRef<ApicurioApiV1>({
  id: 'plugin.apicurio.service',
});

/**
 * Provides A KialiClient class to query backend
 */
export class ApicurioApiClient implements ApicurioApiV1 {
  // @ts-ignore
  private readonly discoveryApi: DiscoveryApi;
  public entity: Entity | null;

  constructor(discoveryApi: DiscoveryApi) {
    this.discoveryApi = discoveryApi;
    this.entity = null;
  }

  setEntity = (entity: Entity) => {
    this.entity = entity;
  };

  private async getBaseUrl() {
    return `${await this.discoveryApi.getBaseUrl('apicurio')}`;
  }

  private async fetcher(url: string) {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      throw new Error(
        `failed to fetch data, status ${response.status}: ${response.statusText}`,
      );
    }
    return await response.json();
  }

  private encodeGetParams(params: Record<string, any>) {
    const result = Object.keys(params)
      .filter(key => typeof params[key] !== 'undefined')
      .map(
        k =>
          `${encodeURIComponent(k)}=${encodeURIComponent(params[k] as string)}`,
      )
      .join('&');

    const value_apicurio_anotation =
      this.entity!.metadata!.annotations![APICURIO_ANNOTATION];
    return `${result}${
      result.length > 0 ? '&properties=' : 'properties='
    }${value_apicurio_anotation}`;
  }

  async searchArtifacts(query: Record<string, any> = {}) {
    const proxyUrl = await this.getBaseUrl();
    const params = this.encodeGetParams(query);
    return (await this.fetcher(
      `${proxyUrl}/search/artifacts?${params}`,
    )) as ArtifactsSearchResults;
  }

  async getArtifact(groupId: string, id: string, version: string = 'latest') {
    const proxyUrl = await this.getBaseUrl();
    const params = this.encodeGetParams({});
    return (await this.fetcher(
      `${proxyUrl}/artifact/${groupId}/${id}/versions/${version}?${params}`,
    )) as ArtifactDetail;
  }
}
