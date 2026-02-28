using CodingTracker.Backend.Data;
using CodingTracker.Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddDbContext<CodingTrackerDb>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")
                      ?? "Data Source=Data/coding_tracker.db"));
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Coding Tracker API",
        Description = "Coding Tracker API description",
        Version = "v1",
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Coding Tracker API V1"); });
}

app.UseCors();
app.UseHttpsRedirection();

app.MapGet("/projects", async (CodingTrackerDb db) => await db.Projects.ToListAsync());

app.MapGet("/projects/{projectId:int}", async (int projectId, CodingTrackerDb db) =>
{
    var project = await db.Projects
        .Include(p => p.Sessions)
        .FirstOrDefaultAsync(p => p.Id == projectId);

    return project == null ? Results.NotFound() : Results.Ok(project);
});

app.MapGet("/projects/{projectId:int}/sessions", async (int projectId, CodingTrackerDb db) =>
{
    var sessions = await db.Sessions
        .Where(s => s.ProjectId == projectId)
        .ToListAsync();

    return Results.Ok(sessions);
});

app.MapPost("/projects",
    async (CodingTrackerDb db, Project project) =>
    {
        await db.Projects.AddAsync(project);
        await db.SaveChangesAsync();
        return Results.Created($"/projects/{project.Id}", project);
    });

app.MapGet("/sessions", async (int? projectId, CodingTrackerDb db) =>
{
    var sessions = await db.Sessions
        .Where(s => projectId == null || s.ProjectId == projectId)
        .Include(s => s.Project)
        .ToListAsync();
    return Results.Ok(sessions);
});
app.MapGet("/sessions/{sessionId:int}", async (int sessionId, CodingTrackerDb db) =>
{
    var session = await db.Sessions.FindAsync(sessionId);
    return session == null ? Results.NotFound() : Results.Ok(session);
});
app.MapPost("/sessions", async (CodingTrackerDb db, SessionDto sessionDto) =>
{
    var session = Session.FromDto(sessionDto);
    await db.Sessions.AddAsync(session);
    await db.SaveChangesAsync();
    return Results.Created($"/sessions/{session.Id}", session);
});

app.Run();