using Microsoft.EntityFrameworkCore;
using TaskService.Entities;

namespace TaskService.Data
{
    public class TaskDbContext(DbContextOptions<TaskDbContext> options): DbContext(options)
    {
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<Tag> Tags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<TaskItem>()
                .HasIndex(t => t.UserId);

            modelBuilder.Entity<Tag>()
                .HasIndex(t => t.Name)
                .IsUnique();


            modelBuilder.Entity<TaskItem>()
                .HasMany(t => t.Tags)
                .WithMany(tk => tk.Tasks)
                .UsingEntity<Dictionary<string, object>>(
                "TaskTag",
                r => r.HasOne<Tag>().WithMany().HasForeignKey("TagId").HasPrincipalKey(t => t.Id),
                l => l.HasOne<TaskItem>().WithMany().HasForeignKey("TaskId").HasPrincipalKey(tk => tk.Id),
                j => j.HasKey("TaskId", "TagId"));

            base.OnModelCreating(modelBuilder);
        }
    }
}
