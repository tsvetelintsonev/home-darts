using System.Reactive.Linq;
using System.Reactive.Subjects;
using Microsoft.Extensions.Logging;

namespace HomeDarts.Domain.Stores;

public class DartsGameStore
{
    private readonly ILogger<DartsGameStore> _logger;
    private readonly List<Player> _players;
    
    private readonly BehaviorSubject<List<Player>> _playersSubject;
    private readonly BehaviorSubject<bool> _startedSubject;
    private readonly BehaviorSubject<bool> _finishedSubject;
    private const int _totalGamePoints = 501;

    public DartsGameStore(ILogger<DartsGameStore> logger)
    {
        _logger = logger;
        _players = new List<Player>();
        
        _playersSubject = new BehaviorSubject<List<Player>>(_players);
        _startedSubject = new BehaviorSubject<bool>(false);
        _finishedSubject = new BehaviorSubject<bool>(false);

        Players = _playersSubject.AsObservable();
        Started = _startedSubject.AsObservable();
        Finished = _finishedSubject.AsObservable();
    }

    public IObservable<List<Player>> Players { get; }
    public IObservable<bool> Finished { get; }
    public IObservable<bool> Started { get; }

    public void Rematch() 
        => StartNewGame(_players.Select(player => player.Name).ToList());
    
    public void StartNewGame(List<string> playerNames)
    {
        _players.Clear();
        playerNames.ForEach(AddPlayer);
        NextPlayersTurn();
        _startedSubject.OnNext(true);
        _finishedSubject.OnNext(false);
    }

    public void AddRound(ThrowingRound round)
    {
        var currentPlayer = GetCurrentPlayer();
        currentPlayer.AddRound(round.Copy());

        if (currentPlayer.HaveWon())
        {
            _finishedSubject.OnNext(true);
            NotifyPlayersUpdated();
            return;
        }

        NextPlayersTurn();
    }
    
    private void AddPlayer(string name)
    {
        var player = new Player(_players.Count, name);
        player.SetInitialPoints(_totalGamePoints);
        _players.Add(player);
        NotifyPlayersUpdated();
    }
    
    private void NextPlayersTurn()
    {
        var currentPlayerId = _players.SingleOrDefault(player => player.MyTurn)?.Id ?? -1;
        _players.ForEach(player => player.SetMyTurn(false));        
        var nextPlayer = _players.ElementAt(GetNextPlayerId(currentPlayerId));
        nextPlayer.SetMyTurn(true);
        NotifyPlayersUpdated();
    }

    private void NotifyPlayersUpdated() => _playersSubject.OnNext(_players.ToList());

    private Player GetCurrentPlayer() => _players.Single(player => player.MyTurn);
    
    private int GetNextPlayerId(int currentPlayerId)
    {
        if (currentPlayerId == _players.Count - 1)
        {
            return 0;
        }

        return currentPlayerId + 1;
    }

}