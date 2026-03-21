namespace SpacedRepetition.Api.Dtos;

public record CardProgressDto(
    string CardSlug,
    double EasinessFactor,
    int Interval,
    int Repetitions,
    DateTime NextReviewUtc,
    int TotalReviews);
