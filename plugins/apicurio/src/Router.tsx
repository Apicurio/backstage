import React from 'react';
import { Button } from '@material-ui/core';
import { useEntity } from '@backstage/plugin-catalog-react';
import { Route, Routes } from 'react-router-dom';
import { ApicurioComponent, ArtifactDetail } from './components';
import { APICURIO_ANNOTATION } from '@janus-idp/backstage-plugin-apicurio-common';
import { artifactRouteRef } from './routes';

export const Router = () => {
  const { entity } = useEntity();
  const apicurioAnnotationValue =
    entity.metadata.annotations?.[APICURIO_ANNOTATION];

  if (apicurioAnnotationValue) {
    return (
      <Routes>
        <Route path="/" element={<ApicurioComponent />} />
        <Route path={artifactRouteRef.path} element={<ArtifactDetail />} />
      </Routes>
    );
  }

  return (
    <>
      <h1>
        Missing label or use a label selector query, which takes precedence over
        the previous annotation.
      </h1>
      <Button variant="contained" color="primary">
        Read Apicurio Plugin Docs
      </Button>
    </>
  );
};
