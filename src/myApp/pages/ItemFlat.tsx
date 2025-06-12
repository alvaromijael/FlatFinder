import React from "react";
import {
  Box,
  Typography,
  Paper,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import type { AppFlat } from "../interfaces/AppFlat";

export const ItemFlat = () => {
  const { state } = useLocation();
  const flat: AppFlat = state?.flat;

  if (!flat) return <Typography variant="h6">Flat no encontrado</Typography>;

  const {
    src,
    name,
    city,
    streetName,
    streetNumber,
    areaSize,
    hasAC,
    yearBuilt,
    rentPrice,
    dateAvailable,
  } = flat;

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", lg: "row" }}
      alignItems="center"
      justifyContent="center"
      p={4}
      gap={6}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "50%",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <Box
          component="img"
          src={src || "https://placehold.co/400x500"}
          alt={name}
          sx={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Paper>

      <Box width="100%" maxWidth="40%" display="flex" flexDirection="column" gap={2}>
        <Typography variant="h4" fontWeight="bold">
          {name}
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Ubicación: {`${streetName} ${streetNumber}, ${city}`}
        </Typography>

        <Typography variant="h6" color="success.main">
          ${rentPrice}
        </Typography>

        <Typography variant="body1">
          Área: {areaSize} m²
        </Typography>

        <Typography variant="body1">
          {hasAC ? "Con aire acondicionado" : "Sin aire acondicionado"}
        </Typography>

        <Typography variant="body1">
          Año de construcción: {yearBuilt}
        </Typography>

        <Typography variant="body1">
          Disponible desde:{" "}
          {typeof dateAvailable === "string"
            ? dateAvailable
            : dateAvailable?.toDate?.().toLocaleDateString() ?? "Sin fecha"}
        </Typography>

      </Box>
    </Box>
  );
};
