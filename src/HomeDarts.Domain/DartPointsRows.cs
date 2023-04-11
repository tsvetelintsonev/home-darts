namespace HomeDarts.Domain;

public class DartPointsRows
{
    private readonly List<DartPoints> _dartPoints = new ();

    public DartPointsRows(int count, string? label = null)
        => CreateDartPoints(count, label);

    public void AddPoint(string label) => _dartPoints.Add(new DartPoints(label));

    public DartPoints GetLast() => _dartPoints.Last();
    
    public List<DartPoints> GetAll() => _dartPoints;

    private void CreateDartPoints(int count, string? label = null)
    {
        for (int i = 1; i <= count; i++)
        {
            if (!string.IsNullOrWhiteSpace(label))
            {
                _dartPoints.Add(new DartPoints($"{label}{i}"));
                continue;
            }

            _dartPoints.Add(new DartPoints(i.ToString()));
        }
    }
}