using TaskService.DTO;
using TaskService.Entities;

namespace TaskService.Services.TaskServices
{
    public interface ITaskItemService
    {
        Task<TaskItem> CreateTaskAsync(TaskPostDto taskPostDto);

        Task<TaskDto> GetTaskAsync(int id);

        Task<List<TaskDto>> GetAllTasksByUserIdAsync(string token);

        Task<List<TaskDto>> GetUserTasksByMonthAsync(string token, int year, int month);

        Task<bool> DeleteTaskAsync(string token, int id);
    }
}
