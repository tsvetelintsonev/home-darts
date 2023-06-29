export class DartPoints {
    private _value? : number | null = null;
    private _label : string;

    constructor(label: string) {
        this._label = label;
    }

    public get value() : number {
        if (this._value !== null) return this._value!;

        this._value = this.calculateValue();

        return this._value;
    };

    public isDouble = () : boolean => this._label[0] == 'D';
    
    public copy = () => Object.create(this);

    private calculateValue = () : number => {
        var labelPrefix = this._label[0];

        switch (labelPrefix) {
            case 'T':
                return this.convertLabelToInt(this._label) * 3;
            case 'D':
                return this.convertLabelToInt(this._label) * 2;
            case 'S':
                return this.convertLabelToInt(this._label);
            default:
                return parseInt(this._label, 10);
        }
    };

    private convertLabelToInt = (label: string) : number => parseInt(label.slice(1), 10);
}