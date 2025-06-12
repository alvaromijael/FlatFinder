import React, { useEffect, useState } from "react";
import { FlatCard } from "../components/FlatCard";
import { GetAllFlats } from "../services/GetAllFlats";
import type { AppFlat } from "../interfaces/AppFlat";
import { useAuthContext } from "@/auth/context/AuthContext";
import {
  Typography,
  Container,
  CircularProgress,
  Grid,
} from "@mui/material";


export const MyFlatsPage = () => {
  const { user, loading: authLoading } = useAuthContext();
  const [myFlats, setMyFlats] = useState<AppFlat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFlats = async () => {
      if (!user) return;
      try {
        const allFlats = await GetAllFlats();
        const filtered = allFlats.filter(
          (flat) => flat.creatorUid === user.uid
        );
        setMyFlats(filtered);
      } catch (error) {
        console.error("Error al cargar mis flats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && user) {
      loadFlats();
    }
  }, [authLoading, user]);

  if (authLoading || loading) {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Cargando tus publicaciones...
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 5 }}>

      <Grid container spacing={3}>
        {myFlats.length > 0 ? (
          myFlats.map((flat) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={flat.uid}>
              <FlatCard
                {...flat}
                onFavoriteToggle={(newVal) => {
                  setMyFlats((prev) =>
                    prev.map((f) =>
                      f.uid === flat.uid ? { ...f, isFavorite: newVal } : f
                    )
                  );
                }}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No has publicado ningún flat aún.</Typography>
        )}
      </Grid>
    </Container>
  );
};