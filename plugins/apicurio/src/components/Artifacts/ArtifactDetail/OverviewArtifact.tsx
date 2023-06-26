import React from 'react';
import Moment from 'react-moment';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@material-ui/core';
import CheckCircleRounded from '@material-ui/icons/CheckCircleRounded';
import CodeRounded from '@material-ui/icons/CodeRounded';
import {
  ArtifactMetaData,
  Rule,
} from '@janus-idp/backstage-plugin-apicurio-common';
import { ArtifactTypeIcon } from '../ArtifactTypeIcon';

const cssNoField: React.CSSProperties = { color: '#6a6e73' };
const renderItem = (
  title: string,
  value: Element | string,
  valueStyle: React.CSSProperties = {},
) => {
  return (
    <>
      <Grid item>
        <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
      </Grid>
      <Grid item>
        <Typography style={valueStyle}>{value}</Typography>
      </Grid>
    </>
  );
};

const renderChip = (label: string, styleLabel: React.CSSProperties = {}) => {
  return (
    <Tooltip title={label}>
      <Chip label={label} style={styleLabel} />
    </Tooltip>
  );
};

export const OverviewArtifact = (props: {
  meta: ArtifactMetaData;
  rules: Rule[] | null;
}) => {
  const isRuleEnabled = (ruleType: string): boolean => {
    if (!props.rules) {
      return false;
    }
    return props.rules.filter(rule => rule.type === ruleType).length > 0;
  };

  const getRuleConfig = (ruleType: string): string => {
    if (props.rules) {
      const frules: Rule[] = props.rules.filter(r => r.type === ruleType);
      if (frules.length === 1) {
        return frules[0].config;
      }
    }
    return 'UNKNOWN';
  };

  const ValidityRule = isRuleEnabled('VALIDITY') ? (
    <>{getRuleConfig('VALIDITY')}</>
  ) : null;
  const CompatibilityRule = isRuleEnabled('COMPATIBILITY') ? (
    <>{getRuleConfig('COMPATIBILITY')}</>
  ) : null;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            avatar={<ArtifactTypeIcon type={props.meta.type} />}
            title="Version metadata"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1} direction="column">
              {renderItem(
                'Name',
                props.meta.name || 'No name',
                props.meta.name ? {} : cssNoField,
              )}
              {renderItem('ID', props.meta.id)}
              {renderItem(
                'Description',
                props.meta.description || 'No description',
                props.meta.description ? {} : cssNoField,
              )}
              {renderItem('Status', props.meta.state)}
              {/* @ts-ignore*/}
              {renderItem( 'Created', <Moment date={props.meta.createdOn} fromNow />,
              )}
              {/* @ts-ignore*/}
              {renderItem( 'Modified', <Moment date={props.meta.modifiedOn} fromNow />,
              )}
              {renderItem('Global ID', String(props.meta.globalId))}
              {renderItem('Content ID', String(props.meta.contentId))}
              <Grid item>
                <Typography style={{ fontWeight: 'bold' }}>Labels</Typography>
              </Grid>
              <Grid item>
                {props.meta.labels && props.meta.labels.length > 0 ? (
                  <>
                    {props.meta.labels.map(l =>
                      renderChip(l, {
                        color: '#002952',
                        backgroundColor: '#e7f1fa',
                      }),
                    )}
                  </>
                ) : (
                  <Typography style={cssNoField}>No labels</Typography>
                )}
              </Grid>
              <Grid item>
                <Typography style={{ fontWeight: 'bold' }}>
                  Properties
                </Typography>
              </Grid>
              <Grid item>
                {props.meta.properties &&
                Object.entries(props.meta.properties).length > 0 ? (
                  <>
                    {Object.entries(props.meta.properties).map(([k, v]) =>
                      renderChip(`${k}=${v}`, {
                        color: '#1f0066',
                        backgroundColor: '#f2f0fc',
                      }),
                    )}
                  </>
                ) : (
                  <Typography style={cssNoField}>No properties</Typography>
                )}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardHeader
            title="Content Rules"
            titleTypographyProps={{ variant: 'h4' }}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={1} direction="column">
              <Grid item style={ValidityRule ? {} : { color: '#6a6e73' }}>
                <Grid container>
                  <Grid item xs={3}>
                    <CheckCircleRounded />
                    Validity rule
                  </Grid>
                  <Grid item xs={ValidityRule ? 7 : 9}>
                    Ensure that content is <em>valid</em> when updating this
                    artifact.
                  </Grid>
                  {ValidityRule && (
                    <Grid item xs={2}>
                      {ValidityRule}
                    </Grid>
                  )}
                </Grid>
              </Grid>
              <Grid item style={CompatibilityRule ? {} : { color: '#6a6e73' }}>
                <Grid container>
                  <Grid item xs={3}>
                    <CodeRounded />
                    Compatibility rule
                  </Grid>
                  <Grid item xs={CompatibilityRule ? 7 : 9}>
                    Enforce a compatibility level when updating this artifact
                    (for example, select Backward for backwards compatibility).
                  </Grid>
                  {CompatibilityRule && (
                    <Grid item xs={2}>
                      {CompatibilityRule}
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
