namespace SpacedRepetition.Api.Domain;

public class CardProgress
{
    public string UserId { get; set; } = default!;
    public string CardSlug { get; set; } = default!;
    public double EasinessFactor { get; set; } = 2.5;
    public int Interval { get; set; }
    public int Repetitions { get; set; }
    public DateTime NextReviewUtc { get; set; } = DateTime.UtcNow;
    public DateTime LastReviewUtc { get; set; }
    public int TotalReviews { get; set; }
}
