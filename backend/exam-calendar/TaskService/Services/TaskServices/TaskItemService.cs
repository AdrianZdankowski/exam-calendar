using Microsoft.EntityFrameworkCore;
using TaskService.Data;
using TaskService.DTO;
using TaskService.Entities;

namespace TaskService.Services.TaskServices
{
    public class TaskItemService(TaskDbContext context) : ITaskItemService
    {
        public async Task<TaskItem> CreateTaskAsync(TaskPostDto taskPostDto)
        {
            var tags = await context.Tags
                .Where(t => taskPostDto.TagIds.Contains(t.Id))
                .ToListAsync();

            if (tags == null) return null;

            var task = new TaskItem
            {
                UserId = taskPostDto.UserId,
                TaskDate = taskPostDto.TaskDate,
                TaskTime = taskPostDto.TaskTime,
                Description = taskPostDto.Description,
                Tags = tags
            };

            context.Tasks.Add(task);
            await context.SaveChangesAsync();

            return task;
        }

        public async Task<bool> DeleteTaskAsync(int id)
        {
            var task = await context.Tasks.FirstOrDefaultAsync(t => t.Id == id);
            if (task == null) return false;

            context.Tasks.Remove(task);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<List<TaskDto>> GetAllTasksByUserIdAsync(int userId)
        {
            var tasks = await context.Tasks
                .Include(t => t.Tags)
                .Where(t => t.UserId == userId)
                .ToListAsync(); 

            var taskDtos = tasks.Select(task => new TaskDto
            {
                Id = task.Id,
                UserId = task.UserId,
                TaskDate = task.TaskDate,
                TaskTime = task.TaskTime,
                Description = task.Description,
                Tags = task.Tags.Select(tag => new TagDto
                {
                    Id = tag.Id,
                    Name = tag.Name,
                }).ToList()
            }).ToList();

            return taskDtos;
        }

        public async Task<List<TaskDto>> GetUserTasksForMonthAsync(int userId, int year, int month)
        {
            var tasks = await context.Tasks
                .Include(t => t.Tags)
                .Where (t => t.UserId == userId
                    && t.TaskDate.Year == year
                    && t.TaskDate.Month == month)
                .ToListAsync();

            var taskDtos = tasks.Select(task => new TaskDto
            {
                Id = task.Id,
                UserId = task.UserId,
                TaskDate = task.TaskDate,
                TaskTime = task.TaskTime,
                Description = task.Description,
                Tags = task.Tags.Select(tag => new TagDto
                {
                    Id = tag.Id,
                    Name = tag.Name,
                }).ToList()
            }).ToList();

            return taskDtos;
        }

        public async Task<TaskDto> GetTaskAsync(int id)
        {
            var task = await context.Tasks
                .Include(t => t.Tags)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (task == null) return null;

            var taskDto = new TaskDto
            {
                Id = task.Id,
                UserId = task.UserId,
                TaskDate = task.TaskDate,
                TaskTime = task.TaskTime,
                Description = task.Description,
                Tags = task.Tags.Select(tag => new TagDto
                {
                    Id = tag.Id,
                    Name = tag.Name,
                }).ToList()
            };

            return taskDto;
        }
    }
}
