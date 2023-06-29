import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { ChangeEvent, PropsWithChildren, useContext, useState } from "react";
import IconButton from "@mui/material/IconButton";
import { Close, Delete } from "@mui/icons-material";
import DartGameContext from "@/contexts/DartGameContext";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function CreateNew501Game() {
    const [open, setOpen] = useState(false);
    const [fullWidth, setFullWidth] = useState(true);
    const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

    const [playerNames, setPlayerNames] = useState<string[]>([]);
    const [playerName, setPlayerName] = useState<string>('');

    const { startGame } = useContext(DartGameContext);

    const handleClickOpen = () : void => {
        setOpen(true);
    };
    
    const handleClose = () : void => {
        setOpen(false);
    };

    const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) : void => 
        setPlayerName(event.target.value);
    
    const handleAddPlayer = () => {
        if (playerName.length <= 1 ) {
            return;
        }
        
        setPlayerNames(prevPlayerNames => [...prevPlayerNames, playerName]);
        setPlayerName('');
    };

    const handleDeletePlayer = (playerName: string): void => {
        setPlayerNames(prevPlayerNames => [...prevPlayerNames.filter(name => name !== playerName)]);
    };

    const handleStartGame = () => {
        if (!playerNames.length) {
            return;
        }

        startGame([...playerNames]);
        setPlayerNames([]);
        handleClose();
    };

    return (<>
        <Grid sx={{ flexDirection: "column", width: "20%", justifyContent: 'flex-end' }}
          container
          rowSpacing={0}
          columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
          <Grid>
            <Item sx={{ display: 'flex', justifyContent: 'end' }}>
                <Button 
                    sx={{ fontWeight: 'bold', marginTop: '1.2rem', marginRight: '1.4rem', textTransform: 'uppercase' }} 
                    variant="contained"
                    onClick={handleClickOpen}>
                    New 501 game
                </Button>
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth} 
                    open={open}>
                    <DialogTitle>
                        New 501 game
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                            >
                            <Close />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <Grid sx={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                            <Item sx={{ flex: '1' }}>
                                <TextField
                                    value={playerName}
                                    autoFocus
                                    margin="dense"
                                    id="playerName"
                                    label="Player name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                    onChange={handlePlayerNameChange}
                                />
                            </Item>
                            <Item>
                                <Button
                                    sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                                    variant="contained"
                                    onClick={handleAddPlayer}>Add
                                </Button>
                            </Item>
                        </Grid>
                        <AddedUsersList 
                            playerNames={playerNames}
                            deletePlayer={handleDeletePlayer}>
                        </AddedUsersList>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            sx={{ fontWeight: 'bold', textTransform: 'uppercase' }}
                            variant="contained"
                            onClick={handleStartGame}>Start new game
                        </Button>
                    </DialogActions>
                </Dialog>
            </Item>
          </Grid>
        </Grid>
    </>)
}

interface AddedUsersListProps extends PropsWithChildren  {
    playerNames: string[],
    deletePlayer: (playerName: string) => void
}

const AddedUsersList = ({ playerNames, deletePlayer } : AddedUsersListProps) => {
    return (<>
        <List dense={true}>
              {playerNames.map((playerName, index) =>
                <ListItem
                    key={index}
                    secondaryAction={
                        <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => deletePlayer(playerName)}>
                            <Delete />
                        </IconButton>
                    }>
                    <ListItemText primary={playerName}/>
                    </ListItem>,
              )}
            </List>    
    </>)
}