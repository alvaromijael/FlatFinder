// components/FlatFilterSidebar.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";

type Props = {
  flats: string[]; // lista de ciudades
  filters: {
    city: string;
    priceMin: string;
    priceMax: string;
    areaMin: string;
    areaMax: string;
    orderBy: string;
  };
  onChange: (filters: Props["filters"]) => void;
};

export const FlatFilterSidebar = ({ flats, filters, onChange }: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  const uniqueCities = Array.from(new Set(flats)).sort();

  return (
    <Box
      sx={{
        width: 260,
        p: 2,
        borderLeft: "1px solid #ddd",
        position: "sticky",
        top: 20,
        height: "100%",
      }}
    >
      {/* Ciudad */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Ciudad</InputLabel>
        <Select
          name="city"
          value={filters.city}
          label="Ciudad"
          onChange={handleSelectChange}
        >
          <MenuItem value="">Todas</MenuItem>
          {uniqueCities.map((city) => (
            <MenuItem key={city} value={city}>
              {city}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Precio */}
      <Typography variant="subtitle2" mb={1}>
        Precio (USD)
      </Typography>
      <Box display="flex" gap={1} mb={2}>
        <TextField
          label="Min"
          name="priceMin"
          value={filters.priceMin}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <TextField
          label="Max"
          name="priceMax"
          value={filters.priceMax}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </Box>

      {/* Área */}
      <Typography variant="subtitle2" mb={1}>
        Área (m²)
      </Typography>
      <Box display="flex" gap={1} mb={2}>
        <TextField
          label="Min"
          name="areaMin"
          value={filters.areaMin}
          onChange={handleChange}
          size="small"
          fullWidth
        />
        <TextField
          label="Max"
          name="areaMax"
          value={filters.areaMax}
          onChange={handleChange}
          size="small"
          fullWidth
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Ordenar */}
      <FormControl fullWidth>
        <InputLabel>Ordenar por</InputLabel>
        <Select
          name="orderBy"
          value={filters.orderBy}
          label="Ordenar por"
          onChange={handleSelectChange}
        >
          <MenuItem value="">Sin orden</MenuItem>
          <MenuItem value="city">Ciudad</MenuItem>
          <MenuItem value="price">Precio</MenuItem>
          <MenuItem value="area">Área</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
