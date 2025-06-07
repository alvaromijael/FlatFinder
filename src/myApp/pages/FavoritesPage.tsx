import React, { useEffect, useState } from "react";
import { GetFavoriteFlats } from "../services/GetFavoriteFlats";
import { FlatCard } from "../components/FlatCard";
import type { AppFlat } from "../interfaces/AppFlat";

import { Typography, Container, CircularProgress, Grid } from "@mui/material";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<AppFlat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const data = await GetFavoriteFlats();
        setFavorites(data);
      } catch (error) {
        console.error("Error al cargar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, []);

  if (loading)
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando favoritos...
        </Typography>
      </Container>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={3}>
        {favorites.length > 0 ? (
          favorites.map((flat) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={flat.uid}>
              <FlatCard
                {...flat}
                onFavoriteToggle={(newVal) => {
                  setFavorites((prev) =>
                    prev
                      .map((f) =>
                        f.uid === flat.uid ? { ...f, isFavorite: newVal } : f
                      )
                      .filter((f) => f.isFavorite) // remueve si desmarcan
                  );
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No tienes flats favoritos aún.</Typography>
        )}
      </Grid>
    </Container>
  );
};