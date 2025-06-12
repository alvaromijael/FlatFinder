// pages/UpdateFlat.tsx
import {
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Paper,
    Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Timestamp } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import { updateFlat } from "../services/UpdateFlatServices";
import type { AppFlat } from "../interfaces/AppFlat";
import React, { useEffect } from "react";

type FormData = {
    src: string;
    name: string;
    city: string;
    streetName: string;
    streetNumber: string;
    areaSize: number;
    hasAC: boolean;
    yearBuilt: number;
    rentPrice: number;
    dateAvailable: string;
};

export const UpdateFlat = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const flat: AppFlat | undefined = state?.flat;

    useEffect(() => {
        // Si no hay flat, redirigir
        if (!flat) {
            navigate("/");
        }
    }, [flat, navigate]);

    // Evitar ejecución prematura si no hay flat
    if (!flat) return null;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            ...flat,
            dateAvailable:
                typeof flat.dateAvailable === "string"
                    ? flat.dateAvailable
                    : flat.dateAvailable?.toDate?.()?.toISOString().split("T")[0] ?? "",
        },
    });

    const onSubmit = async (data: FormData) => {
        try {
            await updateFlat(flat.uid, {
                ...data,
                dateAvailable: Timestamp.fromDate(new Date(data.dateAvailable)),
            });
            navigate("/");
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (
        <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", px: "5%" }}>
            <Paper sx={{ width: "100%", maxWidth: "40%", p: 4, borderRadius: 3, backgroundColor: "#fff", mt: 5 }}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="URL Imagen"
                            fullWidth
                            {...register("src", {
                                required: "La imagen es obligatoria",
                                pattern: {
                                    value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                                    message: "Debe ser una URL válida",
                                },
                            })}
                            error={!!errors.src}
                            helperText={errors.src?.message}
                        />
                        <TextField
                            label="Nombre"
                            fullWidth
                            {...register("name", {
                                required: "El nombre es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9\s]+$/,
                                    message: "Solo caracteres alfanuméricos",
                                },
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            label="Ciudad"
                            fullWidth
                            {...register("city", {
                                required: "La ciudad es obligatoria",
                                pattern: {
                                    value: /^[a-zA-Z0-9\s]+$/,
                                    message: "Solo caracteres alfanuméricos",
                                },
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                        <TextField
                            label="Calle"
                            fullWidth
                            {...register("streetName", {
                                required: "La calle es obligatoria",
                                pattern: {
                                    value: /^[a-zA-Z0-9\s]+$/,
                                    message: "Solo caracteres alfanuméricos",
                                },
                            })}
                            error={!!errors.streetName}
                            helperText={errors.streetName?.message}
                        />
                        <TextField
                            label="Número de Casa"
                            fullWidth
                            {...register("streetNumber", {
                                required: "El número es obligatorio",
                                pattern: {
                                    value: /^[a-zA-Z0-9\s]+$/,
                                    message: "Solo caracteres alfanuméricos",
                                },
                            })}
                            error={!!errors.streetNumber}
                            helperText={errors.streetNumber?.message}
                        />
                        <TextField
                            label="Área (m²)"
                            type="number"
                            fullWidth
                            {...register("areaSize", {
                                required: "El área es obligatoria",
                                min: { value: 50, message: "Mínimo 50 m²" },
                                max: { value: 2000, message: "Máximo 2000 m²" },
                            })}
                            error={!!errors.areaSize}
                            helperText={errors.areaSize?.message}
                        />
                        <FormControlLabel
                            control={<Checkbox {...register("hasAC")} defaultChecked={flat.hasAC} />}
                            label="¿Tiene aire acondicionado?"
                        />
                        <TextField
                            label="Año de construcción"
                            type="number"
                            fullWidth
                            {...register("yearBuilt", {
                                required: "El año es obligatorio",
                                min: { value: 1534, message: "Desde 1534" },
                                max: { value: 2025, message: "Hasta 2025" },
                            })}
                            error={!!errors.yearBuilt}
                            helperText={errors.yearBuilt?.message}
                        />
                        <TextField
                            label="Precio de renta"
                            type="number"
                            fullWidth
                            {...register("rentPrice", {
                                required: "El precio es obligatorio",
                                min: { value: 1, message: "Mayor a 0" },
                            })}
                            error={!!errors.rentPrice}
                            helperText={errors.rentPrice?.message}
                        />
                        <TextField
                            label="Fecha de disponibilidad"
                            type="date"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            {...register("dateAvailable", {
                                required: "La fecha es obligatoria",
                                validate: (value) =>
                                    value >= today || "Debe ser hoy o en el futuro",
                            })}
                            error={!!errors.dateAvailable}
                            helperText={errors.dateAvailable?.message}
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Actualizar Flat
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};
