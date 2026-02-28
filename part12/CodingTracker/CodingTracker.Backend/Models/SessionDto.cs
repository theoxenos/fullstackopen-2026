namespace CodingTracker.Backend.Models;

public class SessionDto
{
    public int ProjectId { get; set; }
    public DateTimeOffset StartTime { get; set; }
    public DateTimeOffset? EndTime { get; set; }
}