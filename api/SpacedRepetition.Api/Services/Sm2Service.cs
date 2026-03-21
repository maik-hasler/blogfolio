namespace SpacedRepetition.Api.Services;

public static class Sm2Service
{
    public static (double EF, int Interval, int Repetitions) Calculate(
        double currentEF, int currentInterval, int currentReps, int quality)
    {
        ArgumentOutOfRangeException.ThrowIfLessThan(quality, 0);
        ArgumentOutOfRangeException.ThrowIfGreaterThan(quality, 5);

        double newEF;
        int newInterval;
        int newReps;

        if (quality >= 3)
        {
            newReps = currentReps + 1;
            newInterval = newReps switch
            {
                1 => 1,
                2 => 6,
                _ => (int)Math.Round(currentInterval * currentEF)
            };
            newEF = currentEF + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        }
        else
        {
            newReps = 0;
            newInterval = 1;
            newEF = currentEF;
        }

        newEF = Math.Max(1.3, newEF);

        return (newEF, newInterval, newReps);
    }
}
