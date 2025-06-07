import React from "react";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Timestamp } from "firebase/firestore";

type FlatCardProps = {
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
}: FlatCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{
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
    </Card>
  );
};