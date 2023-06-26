import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useApi, useRouteRef } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Grid } from '@material-ui/core';
import { CardTab, TabbedCard } from '@backstage/core-components';
import { CircularProgress, Breadcrumbs, Typography } from '@material-ui/core';
import { CodeSnippet, Link, WarningPanel } from '@backstage/core-components';
import {
  ApiError,
  ArtifactDetail,
} from '@janus-idp/backstage-plugin-apicurio-common';
import { apicurioApiRef } from '../../../api';
import { rootRouteRef } from '../../../routes';
import { OverviewArtifact } from './OverviewArtifact';
import { ContentArtifact } from './ContentArtifact';
import { ArtifactHeader } from './ArtifactHeader';

export const ArtifactDetailComponent = () => {
  const { groupId, id, version } = useParams();
  const artifactsLink = useRouteRef(rootRouteRef);
  const apicurioClient = useApi(apicurioApiRef);
  apicurioClient.setEntity(useEntity().entity);
  const [artifact, setArtifact] = useState<ArtifactDetail>(
    new ArtifactDetail(),
  );
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchArtifact = async () => {
    const artifactDetail = await apicurioClient.getArtifact(
      groupId!,
      id!,
      version,
    );
    if ('artifact' in artifactDetail) {
      setArtifact(artifactDetail);
    } else {
      if (artifactDetail.length > 1) {
        const errorMessage = artifactDetail
          .map((e: ApiError) => `[${e.error_code}] ${e.detail}`)
          .join('\n');
        setError({
          causes: null,
          error_code: 0,
          name: `Could not fetch artifact ${groupId}/${id}.`,
          detail: errorMessage,
          message: '',
        });
      } else {
        setError(artifactDetail[0] as ApiError);
      }
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchArtifact();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [version]);

  if (error) {
    return (
      <>
        <WarningPanel severity="error" title={error.name}>
          <CodeSnippet language="text" text={error.detail} />
        </WarningPanel>
        Return to{' '}
        <Link to={artifactsLink()}>
          <>Artifacts</>
        </Link>
      </>
    );
  }

  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Grid container spacing={0}>
      {artifact.artifact ? (
        <>
          <Grid item xs={12}>
            <Breadcrumbs color="primaryText">
              <Link to={artifactsLink()}>
                <>Artifacts</>
              </Link>
              <Link to={`${artifactsLink()}?group=${groupId}`}>{groupId}</Link>
              <Typography>{id}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12} style={{ marginTop: '30px' }}>
            {/* @ts-ignore*/}
            <TabbedCard title={<ArtifactHeader versions={artifact.versions} />}
              deepLink={{ title: 'Go to apicurio', link: artifact?.link }}
            >
              <CardTab label="Overview">
                <OverviewArtifact
                  meta={artifact.artifact}
                  rules={artifact.rules}
                />
              </CardTab>
              <CardTab label="Content">
                <ContentArtifact
                  artifactContent={artifact.artifactContent}
                  artifactType={artifact.artifact!.type}
                />
              </CardTab>
            </TabbedCard>
          </Grid>
        </>
      ) : (
        <Grid item xs={12}>
          Error
        </Grid>
      )}
    </Grid>
  );
};
