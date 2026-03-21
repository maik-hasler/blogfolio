using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using SpacedRepetition.Api.Data;
using SpacedRepetition.Api.Domain;
using SpacedRepetition.Api.Dtos;
using SpacedRepetition.Api.Services;

namespace SpacedRepetition.Api.Endpoints;

public static class ReviewEndpoints
{
    public static void MapReviewEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api").RequireAuthorization();

        group.MapPost("/reviews", async (ReviewRequest request, AppDbContext db, HttpContext http) =>
        {
            var userId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Results.Unauthorized();

            if (request.Quality < 0 || request.Quality > 5)
                return Results.BadRequest("Quality must be between 0 and 5.");

            if (string.IsNullOrWhiteSpace(request.CardSlug))
                return Results.BadRequest("CardSlug is required.");

            var progress = await db.CardProgress.FindAsync(userId, request.CardSlug);

            if (progress is null)
            {
                progress = new CardProgress
                {
                    UserId = userId,
                    CardSlug = request.CardSlug
                };
                db.CardProgress.Add(progress);
            }

            var (ef, interval, reps) = Sm2Service.Calculate(
                progress.EasinessFactor,
                progress.Interval,
                progress.Repetitions,
                request.Quality);

            progress.EasinessFactor = ef;
            progress.Interval = interval;
            progress.Repetitions = reps;
            progress.NextReviewUtc = DateTime.UtcNow.AddDays(interval);
            progress.LastReviewUtc = DateTime.UtcNow;
            progress.TotalReviews++;

            await db.SaveChangesAsync();

            return Results.Ok(ToDto(progress));
        });

        group.MapGet("/progress", async (string? tag, AppDbContext db, HttpContext http) =>
        {
            var userId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Results.Unauthorized();

            var query = db.CardProgress
                .Where(cp => cp.UserId == userId);

            if (!string.IsNullOrWhiteSpace(tag) && tag != "all")
            {
                var prefix = tag.ToLowerInvariant() + "/";
                query = query.Where(cp => cp.CardSlug.StartsWith(prefix));
            }

            var results = await query
                .Select(cp => ToDto(cp))
                .ToListAsync();

            return Results.Ok(results);
        });

        group.MapGet("/due", async (string slugs, AppDbContext db, HttpContext http) =>
        {
            var userId = http.User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId is null)
                return Results.Unauthorized();

            if (string.IsNullOrWhiteSpace(slugs))
                return Results.BadRequest("slugs parameter is required.");

            var slugList = slugs.Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries);

            var existing = await db.CardProgress
                .Where(cp => cp.UserId == userId && slugList.Contains(cp.CardSlug))
                .ToListAsync();

            var now = DateTime.UtcNow;
            var existingMap = existing.ToDictionary(cp => cp.CardSlug);

            var dueSlugs = new List<string>();
            var notDueSlugs = new List<string>();

            foreach (var slug in slugList)
            {
                if (!existingMap.TryGetValue(slug, out var progress) || progress.NextReviewUtc <= now)
                    dueSlugs.Add(slug);
                else
                    notDueSlugs.Add(slug);
            }

            return Results.Ok(new DueCardsResponse(dueSlugs.ToArray(), notDueSlugs.ToArray()));
        });
    }

    private static CardProgressDto ToDto(CardProgress cp) => new(
        cp.CardSlug,
        cp.EasinessFactor,
        cp.Interval,
        cp.Repetitions,
        cp.NextReviewUtc,
        cp.TotalReviews);
}
