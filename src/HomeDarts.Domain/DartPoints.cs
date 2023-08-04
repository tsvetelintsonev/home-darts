namespace HomeDarts.Domain;

public class DartPoints
{
    public DartPoints(string label)
    {
        Label = label;
        Value = Label switch
        {
            "BULL" => 50,
            _ when Label[0] == 'T' => ConvertFromLabelWithPrefix() * 3,
            _ when Label[0] == 'D' => ConvertFromLabelWithPrefix() * 2,
            _ when Label[0] == 'S' => ConvertFromLabelWithPrefix(),
            _ => Convert.ToInt32(Label),
        };
    }

    public string Label { get; }
    public int Value { get; }

    public bool IsDouble() => Label[0] == 'D';
    
    public DartPoints Copy() => new (Label);

    private int ConvertFromLabelWithPrefix() => Convert.ToInt32(Label[1..]);
}