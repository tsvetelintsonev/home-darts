'use client';

import { DartGameContextProvider } from "@/contexts/DartGameContext";
import Box from "@mui/material/Box";
import CreateNew501Game from "./CreateNew501GameDialog";
import DartBoard from "./DartBoard";
import Players from "./Players";

export default function DartGame() {
    return (
        <>
        <DartGameContextProvider>
            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <Players></Players>
                <CreateNew501Game></CreateNew501Game>            
            </Box>
            <Box>
                <DartBoard></DartBoard>
            </Box>
        </DartGameContextProvider>
        </>
    );
}