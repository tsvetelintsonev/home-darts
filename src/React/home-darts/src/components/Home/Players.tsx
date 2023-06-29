'use client';

import Grid from "@mui/material/Unstable_Grid2";
import Item from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Player } from "@/models/Player";
import { useContext } from "react";
import DartGameContext from "@/contexts/DartGameContext";


export default function Players() {
    const { players } = useContext(DartGameContext);
     

    const payerItems = players.map(player => {
        return <Grid xs={12} key={player.id}>
            <Item sx={{ display: 'flex' }}>
                <Paper elevation={0} square sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexGrow: '1',
                    lineHeight: '4rem',
                    padding: '0 1rem'
                }}>
                    {renderAccuracyIcon(player)}
                    <Box sx={{ display: 'flex', flexGrow: '1', justifyContent: 'space-between' }}>
                        <span style={{ textAlign: 'left' }}>{player.name}</span>
                        <span>{player.remainingPoints}</span>
                    </Box>
                </Paper>
            </Item>
        </Grid>
    });

    return (
        <Grid sx={{ flexDirection: "column", width: "22%", fontSize: '1.4rem', fontWeight: '500' }} container rowSpacing={0} columnSpacing={{ xs: 0, sm: 0, md: 0 }}>
            {payerItems}
        </Grid>
    );

    function renderAccuracyIcon(player: Player) {
        return (
                <span style={{
                display: 'flex',
                alignItems: 'center',
                width: '2rem',
                height: '2rem',
                marginRight: '1.2rem'
                }}>
                    {player.myTurn
                    ? ( <img 
                            style={{
                                width: '2rem',
                                height: '2rem',
                            }}
                            src="accuracy-50x50.png" 
                            alt="Accuracy"/> )
                    : ( null )}
                </span>
            );
    }
}