import { Button, Checkbox, FormControlLabel, Grid, Link, TextField } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { registerFlat } from "../services/AddFlatServices";
import { FlatLayout } from "../components/FlatLayout";
import { Timestamp } from "firebase/firestore";
import { useAuthContext } from "@/auth/context/AuthContext";


type NewFlatData = {
    //uid: string;
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

//const [hasAC, setHasAC] = useState<boolean>(false);

export const NewFlat = () => {

    const { user } = useAuthContext();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<NewFlatData>();

    const navigate = useNavigate();

    const onSubmit = async (data: NewFlatData) => {
        
        if (!user) {
            console.error("El usuario no está autenticado");
            return;
        }

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
            navigate('/*');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <FlatLayout description="">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="URL Imagen"
                        fullWidth
                        {...register("src", {
                            required: "La URL de la imagen es obligatorio",
                        })}
                        error={!!errors.src}
                        helperText={errors.src?.message}
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Nombre"
                        fullWidth
                        {...register("name", {
                            required: "El Nombre es obligatorio",
                        })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Ciudad"
                        fullWidth
                        {...register("city", {
                            required: "La ciudad es obligatorio",
                        })}
                        error={!!errors.city}
                        helperText={errors.city?.message}
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Calle"
                        fullWidth
                        {...register("streetName", {
                            required: "El nombre de la calla es obligatorio",
                        })}
                        error={!!errors.streetName}
                        helperText={errors.streetName?.message}
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Número de Casa"
                        type="number"
                        fullWidth
                        {...register("streetNumber", {
                            required: "El número es obligatorio",
                        })}
                        error={!!errors.streetNumber}
                        helperText={errors.streetNumber?.message}
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Area en m2"
                        type="number"
                        fullWidth
                        {...register("areaSize", {
                            required: "El area es obligatorio",
                        })}
                        error={!!errors.areaSize}
                        helperText={errors.areaSize?.message}
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...register("hasAC")}
                                color="primary"
                            />
                        }
                        label="¿Tiene aire AC?"
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Año de construcción"
                        type="number"
                        fullWidth
                        {...register("yearBuilt", {
                            required: "El año es obligatorio",
                        })}
                        error={!!errors.yearBuilt}
                        helperText={errors.yearBuilt?.message}
                    />
                </Grid>

                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Precio de renta"
                        type="number"
                        fullWidth
                        {...register("rentPrice", {
                            required: "El precio es obligatorio",
                        })}
                        error={!!errors.rentPrice}
                        helperText={errors.rentPrice?.message}
                    />
                </Grid>
                <Grid sx={{ margin: 2 }}>
                    <TextField
                        label="Fecha de disponibilidad"
                        type="date"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        {...register("dateAvailable", {
                            required: "La fecha es obligatoria",
                        })}
                        error={!!errors.dateAvailable}
                        helperText={errors.dateAvailable?.message}
                    />
                </Grid>

                <Grid container spacing={2} sx={{ mb: 2, mt: 1 }} justifyContent="center">
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Button type="submit" variant="contained" fullWidth>
                            Nueva Flat
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </FlatLayout>
    );
};
