export class ThrowingRoundScoreCalculator {

    public static calculate = (throwingRoundPoints : string[]) : number => 
        throwingRoundPoints
            .map(label => ThrowingRoundScoreCalculator.getScoreLabelAsInt(label))
            .reduce((accumulator, current) => accumulator + current, 0);

    private static convertLabelToInt = (label: string) : number => parseInt(label.slice(1), 10);

    private static getScoreLabelAsInt = (label: string) : number => {
        var labelPrefix = label[0];

        switch (labelPrefix) {
            case 'T':
                return ThrowingRoundScoreCalculator.convertLabelToInt(label) * 3;
            case 'D':
                return ThrowingRoundScoreCalculator.convertLabelToInt(label) * 2;
            case 'S':
                return ThrowingRoundScoreCalculator.convertLabelToInt(label);
            default:
                return parseInt(label, 10);
        }
    }


}