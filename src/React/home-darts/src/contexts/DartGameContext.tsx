import { DartPoints } from "@/models/DartPoints";
import { Player } from "@/models/Player";
import { ThrowingRound } from "@/models/ThrowingRound";
import { createContext, ReactNode, useState } from "react";

type DartGameState = {
    players: Player[],
    finished: boolean,
    started: boolean,
    startGame: (playerNames: string[]) => void,
    registerCurrentThrowingRound : (throwingRound: ThrowingRound) => void
}

var initialState : DartGameState = {
    players: [],
    finished: false,
    started: false,
    startGame: (playerNames: string[]) => console.error("startGame not implemented!"),
    registerCurrentThrowingRound : (throwingRound: ThrowingRound) =>  console.error("registerCurrentThrowingRound not implemented!")
}

const DartGameContext = createContext<DartGameState>(initialState);

const DartGameContextProvider = ({ children }: { children: ReactNode }) => {
    const initilPoints = 501;
    const [players, setPlayers] = useState<Player[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const [started, setStarted] = useState<boolean>(false);

    const startGame = (playerNames: string[]): void => {
        if (!playerNames.length) {
            console.error("At least 1 player is required to start a new game!");
            return;
        }

        const newPlayers = playerNames.map((playerName, index) => {
            const player = new Player(index, playerName, initilPoints);

            if (index === 0) {
                player.myTurn = true;
            }

            return player;
        });

        setStarted(true);
        setFinished(false);
        setPlayers([...newPlayers]);
    }

    const getActivePlayer = () : Player => players.find(player => player.myTurn)!;

    const getCurrentPlayerId = () : number => players.find(player => player.myTurn)?.id ?? -1;

    const getNextPlayerId = (currentPlayerId: number) : number => {
        if (currentPlayerId == players.length - 1)
        {
            return 0;
        }

        return currentPlayerId + 1;
    }

    const registerThrowingRound = (throwingRound: ThrowingRound) : void => {
        var activePlayer = getActivePlayer();
        activePlayer.addRound(throwingRound);

        if (playerHaveWon(activePlayer)) {
            activePlayer.isWinner = true;
            setStarted(false);
            setFinished(true);
            return;
        }

        if (lastRoundIsBust(activePlayer))
        {
            activePlayer.removeLastRound();
            return;
        }

        nextPlayersTurn();
    }

    const nextPlayersTurn = () : void => {
        const currentPlayerId = getCurrentPlayerId();
        const nextPlayerId = getNextPlayerId(currentPlayerId);
        
        setNextPlayersTurn(nextPlayerId);
    }

    const setNextPlayersTurn = (nextPlayerId: number) : void => {
        const playersCopy = players.map(player => {
            if (player.id === nextPlayerId) {
                player.myTurn = true;
            }
            else {
                player.myTurn = false;
            }

            return player;
        });

        setPlayers([...playersCopy]);
    }

    const lastRoundIsBust = (player: Player) : boolean => {
        const round = player.getLastThrowingRound();
        return player.remainingPoints === 1 || player.remainingPoints < 1;
    }

    const playerHaveWon = (player: Player) : boolean => {
        const round = player.getLastThrowingRound();
        return player.hasReachedZorePoints() && round.lastPointIsDouble;
    }

    return (
        <DartGameContext.Provider value={{
            players, 
            finished,
            started,
            startGame,
            registerCurrentThrowingRound: registerThrowingRound,
        }}>
            {children}
        </DartGameContext.Provider>
    )
}

export default DartGameContext;
export { DartGameContextProvider };