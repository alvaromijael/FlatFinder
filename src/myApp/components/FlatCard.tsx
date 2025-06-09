import React from "react";
import { Box, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import type { Timestamp } from "firebase/firestore";
import type { AppFlat } from "../interfaces/AppFlat";
import { updateFavoriteStatus } from "../services/UpdateFavoriteFlat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

/*type FlatCardProps = {
  src: string;
  name: string;
  city: string;
  streetName: string;
  streetNumber: string;
  areaSize: number;
  hasAC: boolean;
  yearBuilt: number;
  rentPrice: number;
  dateAvailable: Timestamp;
};*/

type FlatCardProps = AppFlat & {
  onFavoriteToggle?: (newValue: boolean) => void;
};

export const FlatCard = ({
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
  uid,
  isFavorite = false,
  onFavoriteToggle,
}: FlatCardProps) => {
  const handleFavoriteClick = async () => {
    const newFavorite = !isFavorite;
    await updateFavoriteStatus(uid, newFavorite);
    onFavoriteToggle?.(newFavorite); // pasa el nuevo valor
  };

  return (
    <Card
      elevation={3}
      sx={{
        position: "relative",
        borderRadius: 2,
        transition: "transform 0.3s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        width: "100%",
      }}
    >
      <CardMedia
        component="img"
        image={src}
        alt={name}
        sx={{ height: 200, objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" paragraph>
          {city} <br />
          {`${streetName} ${streetNumber}`} <br />
          {areaSize} m² <br />
          {hasAC ? "Con aire acondicionado" : "Sin aire acondicionado"} <br />
          {yearBuilt} <br />
          {dateAvailable?.toDate?.().toLocaleDateString() ?? "Sin fecha"}
        </Typography>

        <Typography variant="h6" color="success.main" fontWeight="bold">
          $ {rentPrice}
        </Typography>
      </CardContent>

      {/* Botón de favorito */}
      <Box
        sx={{
          position: "absolute",
          bottom: 8,
          right: 8,
        }}
      >
        <IconButton onClick={handleFavoriteClick} sx={{ color: "red" }}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>
    </Card>
  );
};