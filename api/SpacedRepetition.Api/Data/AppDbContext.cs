using Microsoft.EntityFrameworkCore;
using SpacedRepetition.Api.Domain;

namespace SpacedRepetition.Api.Data;

public class AppDbContext : DbContext
{
    public DbSet<CardProgress> CardProgress => Set<CardProgress>();

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CardProgress>(e =>
        {
            e.HasKey(cp => new { cp.UserId, cp.CardSlug });
            e.Property(cp => cp.UserId).HasMaxLength(64);
            e.Property(cp => cp.CardSlug).HasMaxLength(200);
            e.HasIndex(cp => new { cp.UserId, cp.NextReviewUtc });
        });
    }
}
