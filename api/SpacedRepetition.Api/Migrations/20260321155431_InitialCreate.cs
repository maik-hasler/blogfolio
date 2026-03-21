using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SpacedRepetition.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CardProgress",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "character varying(64)", maxLength: 64, nullable: false),
                    CardSlug = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    EasinessFactor = table.Column<double>(type: "double precision", nullable: false),
                    Interval = table.Column<int>(type: "integer", nullable: false),
                    Repetitions = table.Column<int>(type: "integer", nullable: false),
                    NextReviewUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastReviewUtc = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    TotalReviews = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CardProgress", x => new { x.UserId, x.CardSlug });
                });

            migrationBuilder.CreateIndex(
                name: "IX_CardProgress_UserId_NextReviewUtc",
                table: "CardProgress",
                columns: new[] { "UserId", "NextReviewUtc" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CardProgress");
        }
    }
}
