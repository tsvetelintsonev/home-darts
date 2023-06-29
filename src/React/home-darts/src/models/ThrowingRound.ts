import { DartPoints } from "./DartPoints";

export class ThrowingRound {

    private _dartPoints: DartPoints[];

    constructor() {
        this._dartPoints = [];
    }

    public get totalScore(): number {
        return this._dartPoints
            .map(dartPoints => dartPoints.value)
            .reduce((accumulator, current) => accumulator + current , 0);
    }

    public get lastPointIsDouble(): boolean {
        var lastPoint = this._dartPoints[this._dartPoints.length - 1];

        return lastPoint?.isDouble() ?? false;
    }

    public add = (points: DartPoints) : void =>
    {
        if (this.hasReachedMaxThrows())
        {
            return;
        }
        
        this._dartPoints.push(points);
    }

    public copy = () => Object.create(this);

    private hasReachedMaxThrows = () : boolean => this._dartPoints.length === 3;
}