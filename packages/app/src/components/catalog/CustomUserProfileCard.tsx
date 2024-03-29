/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    ANNOTATION_EDIT_URL,
    RELATION_MEMBER_OF,
    UserEntity,
  } from '@backstage/catalog-model';
  import {
    Avatar,
    InfoCard,
    InfoCardVariants,
    Link,
  } from '@backstage/core-components';
  import {
    Box,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
  } from '@material-ui/core';
  import {
    EntityRefLinks,
    getEntityRelations,
    useEntity,
  } from '@backstage/plugin-catalog-react';
  
  import Alert from '@material-ui/lab/Alert';
  import EditIcon from '@material-ui/icons/Edit';
  import EmailIcon from '@material-ui/icons/Email';
  import GroupIcon from '@material-ui/icons/Group';
  import { LinksGroup } from './LinksGroup';
  import PersonIcon from '@material-ui/icons/Person';
  import GitHubIcon from '@material-ui/icons/GitHub';
  import { FaJira, FaRedhat } from 'react-icons/fa';
  import React from 'react';
  
  const CardTitle = (props: { title?: string }) =>
    props.title ? (
      <Box display="flex" alignItems="center">
        <PersonIcon fontSize="inherit" />
        <Box ml={1}>{props.title}</Box>
      </Box>
    ) : null;
  
  /** @public */
  export const CustomUserProfileCard = (props: {
    variant?: InfoCardVariants;
    showLinks?: boolean;
  }) => {
    const { entity: user } = useEntity<UserEntity>();
    if (!user) {
      return <Alert severity="error">User not found</Alert>;
    }
  
    const entityMetadataEditUrl =
      user.metadata.annotations?.[ANNOTATION_EDIT_URL];
  
    const {
      metadata: { name: metaName, description, links },
      spec: { profile },
    } = user;
    const displayName = profile?.displayName ?? metaName;
    const emailHref = profile?.email ? `mailto:${profile.email}` : undefined;
    const memberOfRelations = getEntityRelations(user, RELATION_MEMBER_OF, {
      kind: 'Group',
    });

    const githubUsername = user.metadata.annotations?.['github.com/username'];
    const jiraUsername = user.metadata.annotations?.['jira/username'];
    const roverProfileLink = user.metadata.annotations?.['rover.redhat.com/user-profile'];
  
    return (
      <InfoCard
        title={<CardTitle title={displayName} />}
        subheader={description}
        variant={props.variant}
        action={
          <>
            {entityMetadataEditUrl && (
              <IconButton
                aria-label="Edit"
                title="Edit Metadata"
                component={Link}
                to={entityMetadataEditUrl}
              >
                <EditIcon />
              </IconButton>
            )}
          </>
        }
      >
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} sm={2} xl={1}>
            <Avatar displayName={displayName} picture={profile?.picture} />
          </Grid>
  
          <Grid item md={10} xl={11}>
            <List>
              {profile?.email && (
                <ListItem>
                  <ListItemIcon>
                    <Tooltip title="Email">
                      <EmailIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText>
                    <Link to={emailHref ?? ''}>{profile.email}</Link>
                  </ListItemText>
                </ListItem>
              )}

              {githubUsername && (
                <ListItem>
                  <ListItemIcon>
                    <Tooltip title="Github Username">
                        <GitHubIcon />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText>
                    <Link to={githubUsername ? `https://github.com/${githubUsername}` : ''}>{githubUsername}</Link>
                  </ListItemText>
                </ListItem>
              )}

              {jiraUsername && (
                <ListItem>
                  <ListItemIcon>
                    <Tooltip title="Jira Username">
                      <FaJira size={24} />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText>
                    <Link to={jiraUsername ? `https://issues.redhat.com/secure/ViewProfile.jspa?name=${jiraUsername}` : ''}>{jiraUsername}</Link>
                  </ListItemText>
                </ListItem>
              )}

              {roverProfileLink && (
                <ListItem>
                  <ListItemIcon>
                    <Tooltip title="Rover Profile">
                      <FaRedhat size={24} />
                    </Tooltip>
                  </ListItemIcon>
                  <ListItemText>
                    <Link to={roverProfileLink ?? ''}>Rover Profile</Link>
                  </ListItemText>
                </ListItem>
            )}
  
              <ListItem>
                <ListItemIcon>
                  <Tooltip title="Member of">
                    <GroupIcon />
                  </Tooltip>
                </ListItemIcon>
                <ListItemText>
                  <EntityRefLinks
                    entityRefs={memberOfRelations}
                    defaultKind="Group"
                  />
                </ListItemText>
              </ListItem>
  
              {props?.showLinks && <LinksGroup links={links} />}
            </List>
          </Grid>
        </Grid>
      </InfoCard>
    );
  };