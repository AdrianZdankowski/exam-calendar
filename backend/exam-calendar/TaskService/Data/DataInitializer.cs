using Microsoft.EntityFrameworkCore;
using TaskService.Entities;

namespace TaskService.Data
{
    public class DataInitializer(TaskDbContext taskDbContext)
    {
        public async Task initializeDataAsync()
        {
            taskDbContext.Database.EnsureCreated();

            if (!taskDbContext.Tags.Any())
            {
                await addTags();
            }

            if (!taskDbContext.Tasks.Any()) 
            {
                await addTasks();
            }
        }

        private async Task addTags()
        {
            var tag1 = new Tag { Name = "WORK"};
            var tag2 = new Tag { Name = "PRIVATE"};

            taskDbContext.Tags.Add(tag1);
            taskDbContext.Tags.Add(tag2);

            await taskDbContext.SaveChangesAsync();
        }

        private async Task addTasks()
        {
            var tags = await taskDbContext.Tags.ToListAsync();

            var tag1 = tags.FirstOrDefault(t => t.Name == "WORK");

            var tag2 = tags.FirstOrDefault(t => t.Name == "PRIVATE");

            var task1 = new TaskItem
            {
                UserId = 1,
                TaskDate = new DateOnly(2025, 8, 17),
                TaskTime = new TimeOnly(17,30),
                Description = "Test task number 1",
                Tags = new List<Tag> { tag2 }
            };

            var task2 = new TaskItem
            {
                UserId = 2,
                TaskDate = new DateOnly(2025, 8, 17),
                TaskTime = new TimeOnly(18, 30),
                Description = "Test task number 2",
                Tags = new List<Tag> { tag1 }
            };

            taskDbContext.Tasks.Add(task1);
            taskDbContext.Tasks.Add(task2);

            await taskDbContext.SaveChangesAsync();
        }
    }
}
