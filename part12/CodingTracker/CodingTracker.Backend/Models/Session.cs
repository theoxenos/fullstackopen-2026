using System.Text.Json.Serialization;

namespace CodingTracker.Backend.Models;

public class Session
{
    public int Id { get; set; }
    public int ProjectId { get; set; }
    [JsonIgnore]
    public Project Project { get; set; } = null!;
    public DateTimeOffset StartTime { get; set; }
    public DateTimeOffset? EndTime  { get; set; }

    public static Session FromDto(SessionDto sessionDto)
    {
        return new Session
        {
            ProjectId = sessionDto.ProjectId,
            StartTime = sessionDto.StartTime,
            EndTime = sessionDto.EndTime,
        };
    }
}