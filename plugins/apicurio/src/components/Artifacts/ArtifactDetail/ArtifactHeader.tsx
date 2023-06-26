import React from 'react';
import { useParams } from 'react-router';
import { useRouteRef } from '@backstage/core-plugin-api';
import Moment from 'react-moment';
import { artifactRouteRef } from '../../../routes';
import { useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, MenuItem, Menu } from '@material-ui/core';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { SearchedVersionResults } from '@janus-idp/backstage-plugin-apicurio-common';

interface ArtifactHeaderProps {
  versions: SearchedVersionResults | null;
}

export const ArtifactHeader = (props: ArtifactHeaderProps) => {
  const { groupId, id, version } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const artifactLink = useRouteRef(artifactRouteRef);
  const handleMenuClick = (v: string) => {
    handleClose();
    navigate(
      artifactLink({ groupId: groupId || '', id: id || '', version: v }),
    );
  };
  return (
    <Grid container>
      <Grid item xs={9}>{`${groupId}/${id}`}</Grid>
      {props.versions && (
        <Grid item xs={3}>
          <Button
            id="demo-customized-button"
            variant="contained"
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />}
          >
            Version: {version}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div style={{ fontWeight: 'bold' }}>
              <span style={{ marginLeft: '5px' }}>Version</span>
              <span style={{ marginLeft: '50px', paddingRight: '5px' }}>
                Created On
              </span>
            </div>
            <Divider />
            <MenuItem
              key="version_latest"
              onClick={() => handleMenuClick('latest')}
            >
              <span style={{ marginLeft: '5px' }}>latest</span>
            </MenuItem>
            {props.versions.versions.map(v => (
              <MenuItem
                key={`version_${v.version}`}
                onClick={() => handleMenuClick(String(v.version))}
              >
                <span style={{ marginLeft: '5px' }}>{v.version}</span>
                <span style={{ marginLeft: '50px', paddingRight: '5px' }}>
                  <Moment date={v.createdOn} fromNow />
                </span>
              </MenuItem>
            ))}
          </Menu>
        </Grid>
      )}
    </Grid>
  );
};
