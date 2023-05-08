import type {ChangeEvent, Dispatch, FC} from 'react';
import React from 'react';
import type {Movie} from '../../App';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import TextField from '@mui/material/TextField';

interface DialogForm {
    open: boolean
    dialogValue: string | null
    setDialogValue: Dispatch<DialogForm['dialogValue']>
    toggleOpen: Dispatch<boolean>
    movies: Movie[]
    setMovies: Dispatch<Movie[]>
}

export const DialogForm: FC<DialogForm> = ({open, toggleOpen, dialogValue, setDialogValue, movies, setMovies}) => {

    const handleClose = () => {
        setDialogValue('');
        toggleOpen(false);
    };

    const dialogHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        setMovies([...movies, {
            value: dialogValue || '',
            label: dialogValue || '',
        }]);

        event.stopPropagation()
        event.preventDefault();
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <Box component="form" onSubmit={dialogHandleSubmit}>
                <DialogTitle>Add a new film</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Did you miss any film in our list? Please, add it!
                    </DialogContentText>
                    <TextField
                        fullWidth
                        autoFocus
                        margin="dense"
                        id="name"
                        value={dialogValue}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            setDialogValue(event.target.value)
                        }
                        label="Movie"
                        type="text"
                        variant="outlined"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Box>
        </Dialog>
    );
};
