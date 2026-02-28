namespace CodingTracker.Backend.Models;

public class Project
{
    public int Id { get; set; }
    public DateTimeOffset StartDate { get; set; }
    public DateTimeOffset? EndDate { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public List<Session> Sessions { get; set; } = [];
    
    public override string ToString()
    {
        return $"Project [Id={Id}, StartDate={StartDate}, EndDate={EndDate}, Name={Name}, Description={Description}]";
    }
}