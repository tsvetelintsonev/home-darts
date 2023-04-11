namespace HomeDarts.Domain;

public class DartPoints
{
    private int? _value;

    public DartPoints(string label) => Label = label;
    
    public string Label { get; }
    public int Value {
        get
        {
            if (_value is not null) return (int)_value;

            _value = GetValue();

            return (int)_value;
        }
    }

    public bool IsDouble() => Label[0] == 'D';
    
    public DartPoints Copy() => new (Label);

    private int GetValue()
        => Label switch
        {
            "BULL" => 50,
            _ when Label[0] == 'T' => ConvertFromLabelWithPrefix() * 3,
            _ when Label[0] == 'D' => ConvertFromLabelWithPrefix() * 2,
            _ when Label[0] == 'S' => ConvertFromLabelWithPrefix(),
            _ => Convert.ToInt32(Label),
        };
    
    private int ConvertFromLabelWithPrefix() => Convert.ToInt32(Label[1..]);
    
}