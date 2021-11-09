import { Box, FormControl, Grid, InputLabel, OutlinedInput } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import * as React from 'react';
import { City, ListParams } from '../../../models';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export function StudentFilter({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) {

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!onSearchChange) return;
    const newFilter = {
      ...filter,
      _page: 1,
      name_like: e.target.value
    };
    onSearchChange(newFilter);
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size = "small">
            <InputLabel htmlFor="outlined-adornment-amount">Search by name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              endAdornment={<Search />}
              label="Search by name"
              labelWidth={60}
              onChange= { handleSearchChange }
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}
