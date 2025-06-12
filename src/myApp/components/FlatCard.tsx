import React from "react";
import { Box, Button, Card, CardContent, CardMedia, IconButton, Typography } from "@mui/material";
import type { Timestamp } from "firebase/firestore";
import type { AppFlat } from "../interfaces/AppFlat";
import { updateFavoriteStatus } from "../services/UpdateFavoriteFlat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAuthContext } from "@/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

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
  creatorUid,
  isFavorite = false,
  onFavoriteToggle,
}: FlatCardProps) => {
  const handleFavoriteClick = async () => {
    const newFavorite = !isFavorite;
    await updateFavoriteStatus(uid, newFavorite);
    onFavoriteToggle?.(newFavorite); // pasa el nuevo valor
  };

  const { user } = useAuthContext();

  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate(`/update-flat/${uid}`, {
      state: {
        flat: {
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
          creatorUid,
        },
      },
    });
  };

  const handleCardClick = () => {
    navigate(`/flat/${uid}`, {
      state: {
        flat: {
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
          creatorUid,
        },
      },
    });
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
      {/* Solo la imagen abre el detalle */}
      <CardMedia
        component="img"
        image={src}
        alt={name}
        onClick={handleCardClick}
        sx={{
          height: 200,
          objectFit: "cover",
          cursor: "pointer",
        }}
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
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // ✅ Evita que dispare navegación
            handleFavoriteClick();
          }}
          sx={{ color: "red" }}
        >
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Box>

      {/* Botón de actualizar o espacio en blanco */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 2,
        }}
      >
        {user?.uid === creatorUid ? (
          <Button
            onClick={(e) => {
              e.stopPropagation(); // ✅ Evita que dispare navegación
              handleUpdateClick();
            }}
            variant="outlined"
            size="small"
          >
            Actualizar
          </Button>
        ) : (
          <Box sx={{ height: 36 }} />
        )}
      </Box>
    </Card>
  );
};