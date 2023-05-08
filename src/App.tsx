import type {AutocompleteRenderInputParams} from '@mui/material/Autocomplete';
import type {SyntheticEvent} from 'react';
import React, {useState} from 'react';
import {useForm, Controller} from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete, {createFilterOptions} from '@mui/material/Autocomplete';
import {DialogForm} from '@components/DialogForm/DialogForm';
import {
    Button,
    Box,
    Grid,
    Alert, FilterOptionsState,
} from '@mui/material';
import {top100Films as initialState} from '@mocks/mocks';

export type Movie = {
    value?: string;
    label: string;
}

type FormValues = {
    movieSelection: Movie | null;
    movieMultiSelection: Movie[]
    name: string;
    comments: string;
};

const filter = createFilterOptions<Movie>();

const App = () => {
    const {
        handleSubmit,
        control,
        reset: formFieldsReset,
    } = useForm<FormValues>();

    const onSubmit = (data: FormValues) => {
        console.table(data)
        formFieldsReset();
        setShowAlert(true);
    };

    const [movies, setMovies] = useState<Movie[]>(initialState)

    const [showAlert, setShowAlert] = useState(false);

    const [open, toggleOpen] = React.useState(false);

    const [dialogValue, setDialogValue] = React.useState<string | null>(null);

    return (
        <Box
            component="form"
            display="flex"
            justifyContent="center"
            alignItems="center"
            maxWidth="1440px"
            position="relative"
            margin="0 auto"
            onSubmit={handleSubmit(onSubmit)}
        >

            <Grid container maxWidth={'548px'}>
                <Grid item md={12} p={1}>
                    <Controller
                        name="movieSelection"
                        control={control}
                        defaultValue={null}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <Autocomplete
                                disablePortal
                                id="selectOne"
                                options={movies}
                                value={value}
                                onChange={(event: SyntheticEvent, newMovie: Movie | null) => {

                                    if (newMovie && newMovie.value) {
                                        toggleOpen(true);
                                        setDialogValue(newMovie.value);
                                    }


                                    onChange(newMovie);
                                }}
                                filterOptions={(options: Movie[], params: FilterOptionsState<Movie>) => {
                                    const filtered = filter(options, params);

                                    if (params.inputValue !== '') {
                                        filtered.push({
                                            value: params.inputValue,
                                            label: `Add "${params.inputValue}"`,
                                        });
                                    }

                                    return filtered;
                                }}
                                getOptionLabel={(option: Movie) => option.value ? option.value : option.label
                                }
                                renderInput={(params: AutocompleteRenderInputParams) => (
                                    <TextField
                                        {...params}
                                        label="Movie"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                                renderOption={(props, option) => <li {...props}>{option.label}</li>}
                            />
                        )}
                        rules={{
                            required: 'Movie is required',
                        }}
                    />
                </Grid>
                <Grid item md={12} p={1}>
                    <Controller
                        name="movieMultiSelection"
                        control={control}
                        defaultValue={[]}
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <Autocomplete
                                multiple
                                disablePortal
                                id="selectMultiple"
                                options={movies}
                                value={value}
                                onChange={(event, newValue: Movie[] | null) => {
                                    onChange(newValue);
                                }}
                                getOptionLabel={(option: Movie) => option.label}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Movies"
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                            />
                        )}
                        rules={{
                            required: 'Movies are required',
                        }}
                    />
                </Grid>
                <Grid item md={12} p={1}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                fullWidth
                                label="Name"
                                variant="filled"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="text"
                            />
                        )}
                        rules={{required: 'Name required'}}
                    />
                </Grid>
                <Grid item md={12} p={1}>
                    <Controller
                        name="comments"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}, fieldState: {error}}) => (
                            <TextField
                                fullWidth
                                multiline
                                label="Comments"
                                variant="filled"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error ? error.message : null}
                                type="text"
                                rows={4}
                            />
                        )}
                        rules={{required: 'Comments required'}}
                    />
                </Grid>
                <Grid item md={12} p={1} display={'flex'} justifyContent="center">
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Signup
                    </Button>
                </Grid>
            </Grid>

            {showAlert &&
                <Alert style={{position: 'absolute', top: '8px', right: '8px'}} onClose={() => setShowAlert(false)}>Your
                    form has been delivered</Alert>}

            <DialogForm open={open} movies={movies} setMovies={setMovies} toggleOpen={toggleOpen} dialogValue={dialogValue}
                        setDialogValue={setDialogValue}/>
        </Box>
    );
};

export default App