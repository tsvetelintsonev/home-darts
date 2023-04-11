namespace HomeDarts.Domain;

public class Player
{
    private readonly List<ThrowingRound> _rounds;
    private bool _winner;

    public Player(int id, string name)
    {
        Id = id;
        Name = name;
        _rounds = new List<ThrowingRound>();
    }

    public int Id { get; private set; }
    public string Name { get; private set; }
    public bool MyTurn { get; private set; }
    public int RemainingPoints { get; private set; }

    public void SetInitialPoints(int points) => RemainingPoints = points;

    public void SetMyTurn(bool myTurn) => MyTurn = myTurn;

    public void AddRound(ThrowingRound round)
    {
       var remainingPoints = RemainingPoints - round.GetTotalScore();

        if (RoundIsBust(remainingPoints, round))
        {
            return;
        }

        RemainingPoints = remainingPoints;
        
        if (RemainingPoints == 0)
        {
            _winner = true;
        }
        
        _rounds.Add(round.Copy());
    }

    public bool HavePossibleCheckout() => RemainingPoints <= 170;

    public bool HaveWon() => _winner;

    private bool RoundIsBust(int remainingPoints, ThrowingRound round)
    {
        if (remainingPoints is 0 && round.LastPointIsDouble())
        {
            return false;
        }

        return remainingPoints is 1 or < 1;
    }
}
