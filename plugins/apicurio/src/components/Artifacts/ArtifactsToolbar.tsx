import React from 'react';
import {
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TablePagination,
  TextField,
  Tooltip,
} from '@material-ui/core';
import Clear from '@material-ui/icons/Clear';
import SearchRounded from '@material-ui/icons/SearchRounded';
import SortByAlpha from '@material-ui/icons/SortByAlpha';

type ArtifactToolbarProps = {
  fieldType: string;
  fieldValue: string;
  limit: number;
  page: number;
  total: number;
  sortAsc: boolean;
  onFilterFieldChange: (field: string) => void;
  onFilterValueChange: (value: string) => void;
  onLimitChange: (limit: number) => void;
  onPageChange: (page: number) => void;
  onSortChange: (sortAsc: boolean) => void;
  onClearInput: () => void;
  onRefresh: () => void;
};

export const FilterFields = [
  'name',
  'group',
  'description',
  'labels',
  'globalId',
  'contentId',
];

const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const ArtifactsToolbar = (props: ArtifactToolbarProps) => {
  const onKeyUpCapture = (key: any) => {
    if (key.key === 'Enter') {
      props.onRefresh();
    }
  };

  return (
    <Grid container direction="row" spacing={0}>
      <Grid item style={{ height: '60px' }} xs={12}>
        <Select
          labelId="artifact-filter-field"
          id="artifact-filter-field"
          value={props.fieldType || FilterFields[0]}
          label={FilterFields[0]}
          style={{ width: '130px' }}
          onChange={event =>
            props.onFilterFieldChange(event.target.value as string)
          }
          variant="outlined"
        >
          {FilterFields.map(f => (
            <MenuItem value={f}>{capitalizeFirstLetter(f)}</MenuItem>
          ))}
        </Select>
        <TextField
          hiddenLabel
          id="artifact-filter-value"
          value={props.fieldValue}
          onChange={event =>
            props.onFilterValueChange(event.target.value as string)
          }
          onKeyUpCapture={onKeyUpCapture}
          style={{ width: '250px', marginTop: '4px' }}
          variant="outlined"
          InputProps={{
            endAdornment: props.fieldValue.length > 0 && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    props.onFilterValueChange('');
                  }}
                  edge="end"
                >
                  <Clear />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Tooltip title="Search/Refresh">
          <IconButton
            type="button"
            size="medium"
            aria-label="search"
            style={{ height: '100%' }}
            onClick={() => props.onRefresh()}
          >
            <SearchRounded />
          </IconButton>
        </Tooltip>
        <Tooltip title={`Sort list ${!props.sortAsc ? 'asc' : 'desc'}`}>
          <IconButton
            type="button"
            size="medium"
            aria-label="search"
            style={{ height: '100%' }}
            onClick={() => props.onSortChange(!props.sortAsc)}
          >
            <SortByAlpha />
          </IconButton>
        </Tooltip>
      </Grid>
      {props.total > 0 && (
        <Grid item xs={12}>
          <TablePagination
            component="div"
            count={props.total}
            page={props.page}
            onPageChange={(_, page) => props.onPageChange(page)}
            rowsPerPage={props.limit}
            onRowsPerPageChange={event =>
              props.onLimitChange(parseInt(event.target.value, 10))
            }
          />
        </Grid>
      )}
    </Grid>
  );
};
