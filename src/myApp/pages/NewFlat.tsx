import {
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Paper,
    Box,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { registerFlat } from "../services/AddFlatServices";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "@/auth/context/AuthContext";
import { useNavigate } from "react-router-dom";

type NewFlatData = {
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

export const NewFlat = () => {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewFlatData>();

    const onSubmit = async (data: NewFlatData) => {
        if (!user) return;

        try {
            const flat = await registerFlat(
                data.src,
                data.name,
                data.city,
                data.streetName,
                data.streetNumber,
                data.areaSize,
                data.hasAC,
                data.yearBuilt,
                data.rentPrice,
                Timestamp.fromDate(new Date(data.dateAvailable)),
                user.uid
            );
            console.log("Flat Registrado:", flat);
            navigate("/mis-flats");
        } catch (error) {
            console.error(error);
        }
    };

    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: "5%",
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    width: "100%",
                    maxWidth: "40%",
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#fff",
                    mt: 5,
                }}
            >
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
                                min: {
                                    value: 50,
                                    message: "El área debe ser mínimo de 50 m²",
                                },
                                max: {
                                    value: 2000,
                                    message: "El área no puede superar los 2000 m²",
                                },
                            })}
                            error={!!errors.areaSize}
                            helperText={errors.areaSize?.message}
                        />

                        <FormControlLabel
                            control={<Checkbox {...register("hasAC")} color="primary" />}
                            label="¿Tiene aire acondicionado?"
                        />

                        <TextField
                            label="Año de construcción"
                            type="number"
                            fullWidth
                            {...register("yearBuilt", {
                                required: "El año es obligatorio",
                                min: {
                                    value: 1534,
                                    message: "El año no puede ser anterior a 1534",
                                },
                                max: {
                                    value: 2025,
                                    message: "El año no puede ser posterior a 2025",
                                },
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
                                min: {
                                    value: 1,
                                    message: "El precio debe ser mayor que 0",
                                },
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
                                    value >= today || "La fecha debe ser hoy o en el futuro",
                            })}
                            error={!!errors.dateAvailable}
                            helperText={errors.dateAvailable?.message}
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Publicar Flat
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
};