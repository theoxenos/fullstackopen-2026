using CodingTracker.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace CodingTracker.Backend.Data;

public class CodingTrackerDb(DbContextOptions<CodingTrackerDb> options) : DbContext(options)
{
    public DbSet<Project> Projects { get; set; }
    public DbSet<Session> Sessions { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    modelBuilder.Entity<Project>().HasData(
        new Project
        {
            Id = 1,
            Name = "Web Application",
            Description = "Building a full-stack web application with ASP.NET Core and Vue.js",
            StartDate = new DateTimeOffset(2026, 1, 15, 0, 0, 0, TimeSpan.Zero),
            EndDate = new DateTimeOffset(2026, 3, 30, 0, 0, 0, TimeSpan.Zero)
        },
        new Project
        {
            Id = 2,
            Name = "Mobile App",
            Description = "Developing a cross-platform mobile application",
            StartDate = new DateTimeOffset(2026, 2, 1, 0, 0, 0, TimeSpan.Zero),
            EndDate = new DateTimeOffset(2026, 4, 15, 0, 0, 0, TimeSpan.Zero)
        },
        new Project
        {
            Id = 3,
            Name = "API Development",
            Description = "Creating RESTful API services for enterprise application",
            StartDate = new DateTimeOffset(2026, 1, 20, 0, 0, 0, TimeSpan.Zero),
            EndDate = new DateTimeOffset(2026, 2, 28, 0, 0, 0, TimeSpan.Zero)
        }
    );

    modelBuilder.Entity<Session>().HasData(
        new Session
        {
            Id = 1,
            ProjectId = 1,
            StartTime = new DateTimeOffset(2026, 1, 15, 9, 0, 0, TimeSpan.Zero),
            EndTime = new DateTimeOffset(2026, 1, 15, 12, 30, 0, TimeSpan.Zero)
        },
        new Session
        {
            Id = 2,
            ProjectId = 1,
            StartTime = new DateTimeOffset(2026, 1, 16, 10, 0, 0, TimeSpan.Zero),
            EndTime = new DateTimeOffset(2026, 1, 16, 15, 45, 0, TimeSpan.Zero)
        },
        new Session
        {
            Id = 3,
            ProjectId = 2,
            StartTime = new DateTimeOffset(2026, 2, 1, 8, 30, 0, TimeSpan.Zero),
            EndTime = new DateTimeOffset(2026, 2, 1, 11, 0, 0, TimeSpan.Zero)
        },
        new Session
        {
            Id = 4,
            ProjectId = 2,
            StartTime = new DateTimeOffset(2026, 2, 2, 13, 0, 0, TimeSpan.Zero),
            EndTime = new DateTimeOffset(2026, 2, 2, 17, 30, 0, TimeSpan.Zero)
        },
        new Session
        {
            Id = 5,
            ProjectId = 3,
            StartTime = new DateTimeOffset(2026, 1, 20, 9, 0, 0, TimeSpan.Zero),
            EndTime = new DateTimeOffset(2026, 1, 20, 16, 0, 0, TimeSpan.Zero)
        },
        new Session
        {
            Id = 6,
            ProjectId = 3,
            StartTime = new DateTimeOffset(2026, 1, 21, 10, 30, 0, TimeSpan.Zero),
            EndTime = new DateTimeOffset(2026, 1, 21, 14, 15, 0, TimeSpan.Zero)
        }
    );
    }
}