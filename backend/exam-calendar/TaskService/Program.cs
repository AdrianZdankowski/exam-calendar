using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Scalar.AspNetCore;
using System.Text;
using TaskService.Data;
using TaskService.Services.TagServices;
using TaskService.Services.TaskServices;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddScoped<ITagService, TagService>();
builder.Services.AddScoped<ITaskItemService, TaskItemService>();

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddDbContext<TaskDbContext>(options => options.UseInMemoryDatabase("taskDb"));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["JwtToken:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["JwtToken:Audience"],
            ValidateLifetime = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["JwtToken:Token"]!)),
            ValidateIssuerSigningKey = true
        };
    });

builder.Configuration
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddJsonFile($"appsettingss.{builder.Environment.EnvironmentName}.json", optional: true)
    .AddUserSecrets<Program>()
    .AddEnvironmentVariables();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<TaskDbContext>();
    var dataInitializer = new DataInitializer(context);
    await dataInitializer.initializeDataAsync();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

//app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
