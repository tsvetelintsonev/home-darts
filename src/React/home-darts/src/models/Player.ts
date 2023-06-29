import { ThrowingRound } from "./ThrowingRound";

export class Player {
    private _id: number;
    private _name: string;
    private _isWinner: boolean;
    private _remainingPoints: number = 0;
    private _throwingRounds: ThrowingRound[];

    public myTurn: boolean;

    constructor(id: number, name: string, initialPoints: number) {
        this._id = id;
        this._name = name;
        this._isWinner = false;
        this._remainingPoints = initialPoints;
        this._throwingRounds = [];
        this.myTurn = false;
    }

    public get id() : number {
        return this._id;
    }

    public get name() : string {
        return this._name;
    }

    public get isWinner() : boolean {
        return this._isWinner;
    }

    public set isWinner(isWinner: boolean) {
        this._isWinner = isWinner;
    }

    public get remainingPoints() : number {
        return this._remainingPoints;
    }

    public addRound = (round: ThrowingRound) : void => {
        this._remainingPoints = this._remainingPoints - round.totalScore;
        this._throwingRounds.push(round);
    }

    public removeLastRound = () : void => {
        const lastThrowingRound = this._throwingRounds.pop();
        this._remainingPoints = this._remainingPoints + (lastThrowingRound?.totalScore ?? 0);
    }

    public hasReachedZorePoints = () : boolean => this._remainingPoints === 0;

    public getLastThrowingRound = () : ThrowingRound => this._throwingRounds[this._throwingRounds.length - 1];
}