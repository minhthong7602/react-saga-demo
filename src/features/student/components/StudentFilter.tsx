import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Button } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import React, { useRef } from 'react';
import { City, ListParams } from '../../../models';

export interface StudentFilterProps {
  filter: ListParams;
  cityList: City[];

  onChange?: (newFilter: ListParams) => void;
  onSearchChange?: (newFilter: ListParams) => void;
}

export function StudentFilter({ filter, cityList, onChange, onSearchChange }: StudentFilterProps) {
  const searchRef = useRef<HTMLInputElement>();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter = {
      ...filter,
      _page: 1,
      name_like: e.target.value
    };
    onSearchChange(newFilter);
  }

  const handleCityChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      city: e.target.value || undefined
    }

    onChange(newFilter);
  }

  const handleSortChange = (e: React.ChangeEvent <{ name?: string; value: unknown }>) => {
    if (!onChange) return;
    const value = e.target.value;
    const [_sort, _order] = (value as string).split('.');
    const newFilter = {
      ...filter,
      _page: 1,
      _sort: _sort || undefined,
      _order: (_order as 'asc' | 'desc') || undefined
    }

    onChange(newFilter);
  }

  const handleClearFilter = () => {
    if (!onChange) return;

    const newFilter = {
      ...filter,
      _page: 1,
      _sort: undefined,
      _order: undefined,
      city: undefined,
      name_like: undefined
    }

    onChange(newFilter);
    if(searchRef.current) {
      searchRef.current.value = '';
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth variant="outlined" size="small">
            <InputLabel htmlFor="outlined-adornment-amount">Search by name</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              endAdornment={<Search />}
              label="Search by name"
              labelWidth={60}
              onChange={handleSearchChange}
              inputRef = { searchRef }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="filterByCity">Filter by city</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              value={filter.city || ''}
              onChange={handleCityChange}
              label="Filter by city"
            >
              <MenuItem value="">
                <em>All city</em>
              </MenuItem>
              {
                cityList.map((city, index) => (
                  <MenuItem key={index} value={city.code}>{city.name}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={2}>
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel id="sortBy">Sort by</InputLabel>
            <Select
              labelId="sortBy"
              value={ filter._sort ? `${filter._sort}.${filter._order}` : '' }
              onChange={ handleSortChange }
              label="Filter by city"
            >
              <MenuItem value="">
                <em>No sort</em>
              </MenuItem>
              <MenuItem value="name.asc">
                Name ASC
              </MenuItem>
              <MenuItem value="name.desc">
                Name DESC
              </MenuItem>
              <MenuItem value="mark.asc">
                Mark ASC
              </MenuItem>
              <MenuItem value="mark.desc">
                Mark DESC
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6} lg={1}>
          <Button
             onClick = { handleClearFilter }
             variant="outlined" 
             color="primary" 
             fullWidth>Clear</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
