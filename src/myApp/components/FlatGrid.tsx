import React, { useEffect, useState } from "react";
import { GetAllFlats } from "../services/GetAllFlats";
import { FlatCard } from "./FlatCard";
import type { AppFlat } from "../interfaces/AppFlat";
import { Typography, Container, CircularProgress } from "@mui/material";
import { Grid } from "@mui/material";
import { FlatFilterSidebar } from "./FlatFilterSidebar";

export const FlatGrid = () => {
    const [flats, setFlats] = useState<AppFlat[]>([]);
    const [loading, setLoading] = useState(true);

    // Filtros y ordenamiento
    const [filters, setFilters] = useState({
        city: "",
        priceMin: "",
        priceMax: "",
        areaMin: "",
        areaMax: "",
        orderBy: "",
    });

    useEffect(() => {
        const loadFlats = async () => {
            try {
                const data = await GetAllFlats();
                setFlats(data);
            } catch (error) {
                console.error("Error al obtener flats:", error);
            } finally {
                setLoading(false);
            }
        };
        loadFlats();
    }, []);

    const applyFilters = () => {
        let filtered = [...flats];

        if (filters.city) {
            filtered = filtered.filter((f) => f.city === filters.city);
        }

        if (filters.priceMin) {
            filtered = filtered.filter((f) => f.rentPrice >= parseFloat(filters.priceMin));
        }

        if (filters.priceMax) {
            filtered = filtered.filter((f) => f.rentPrice <= parseFloat(filters.priceMax));
        }

        if (filters.areaMin) {
            filtered = filtered.filter((f) => f.areaSize >= parseFloat(filters.areaMin));
        }

        if (filters.areaMax) {
            filtered = filtered.filter((f) => f.areaSize <= parseFloat(filters.areaMax));
        }

        switch (filters.orderBy) {
            case "city":
                filtered.sort((a, b) => a.city.localeCompare(b.city));
                break;
            case "price":
                filtered.sort((a, b) => a.rentPrice - b.rentPrice);
                break;
            case "area":
                filtered.sort((a, b) => a.areaSize - b.areaSize);
                break;
        }

        return filtered;
    };

    const filteredFlats = applyFilters();

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
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 10 }}>
                    <Grid container spacing={3}>
                        {filteredFlats.map((flat) => (
                            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={flat.uid}>
                                <FlatCard
                                    {...flat}
                                    onFavoriteToggle={(newValue) => {
                                        setFlats((prev) =>
                                            prev.map((f) =>
                                                f.uid === flat.uid ? { ...f, isFavorite: newValue } : f
                                            )
                                        );
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Barra lateral derecha */}
                <Grid size={{ xs: 12, md: 2 }}>
                    <FlatFilterSidebar
                        flats={flats.map((f) => f.city)}
                        filters={filters}
                        onChange={setFilters}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};
