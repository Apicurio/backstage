import { ArtifactMetaData } from './artifactMetaData.model';
import { SearchedArtifact } from './searchedArtifact.model';
import { SearchedVersionResults } from './searchedVersion.model';
import { Rule } from './rule.model';

export interface ArtifactsSearchResults {
  artifacts: SearchedArtifact[];
  count: number;
  page: number;
  pageSize: number;
}

export class ArtifactDetail {
  public artifact: ArtifactMetaData | null;
  public artifactContent: string;
  public versions: SearchedVersionResults | null;
  public rules: Rule[] | null;
  public link: string;

  constructor() {
    this.artifact = null;
    this.artifactContent = '';
    this.versions = null;
    this.rules = null;
    this.link = '';
  }
}
