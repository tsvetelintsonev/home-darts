namespace HomeDarts.Domain;

public class ThrowingRound
{
    private List<DartPoints> _dartPoints;

    public ThrowingRound() => _dartPoints = new();

    private ThrowingRound(List<DartPoints> dartPoints) => _dartPoints = dartPoints;
    
    public void Add(DartPoints points)
    {
        if (HasReachedMaxThrows())
        {
            throw new InvalidOperationException("Max. 3 throws are allowed per throwing round.");
        }
        
        _dartPoints.Add(points);
    }

    public bool HasReachedMaxThrows() => _dartPoints.Count == 3;

    public bool LastPointIsDouble()
    {
        var lastPoint = _dartPoints.LastOrDefault();

        return lastPoint?.IsDouble() ?? false;
    }

    public void Clear() => _dartPoints.Clear();
    
    public int GetTotalScore()
        => _dartPoints.Aggregate(0, (total, points) => total + points.Value);
    public ThrowingRound Copy() => new (_dartPoints.Select(x => x.Copy()).ToList());

}