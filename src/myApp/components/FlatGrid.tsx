import React, { useEffect, useState } from "react";
import { GetAllFlats } from "../services/GetAllFlats";
import { FlatCard } from "./FlatCard";
import type { AppFlat } from "../interfaces/AppFlat";

import { Typography, Container, CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";

export const FlatGrid = () => {
  const [flats, setFlats] = useState<AppFlat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlats = async () => {
      try {
        console.log("Llamando GetAllFlats...");
        const data = await GetAllFlats();
        console.log("Flats recibidos:", data);
        setFlats(data);
      } catch (error) {
        console.error("Error al obtener flats:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFlats();
  }, []);

  if (loading)
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando...
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Listado de Flats
      </Typography>
      <Grid container spacing={3}>
        {flats.map((flat) => (
          <Grid size={{xs:12, md:6, lg:4}}  key={flat.uid}>
            <FlatCard {...flat} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};