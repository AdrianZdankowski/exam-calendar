using TaskService.DTO;
using TaskService.Entities;

namespace TaskService.Services.TaskServices
{
    public interface ITaskItemService
    {
        Task<TaskItem> CreateTaskAsync(TaskPostDto taskPostDto, int userId);

        Task<TaskDto> GetTaskAsync(int id, int userId);

        Task<List<TaskDto>> GetAllTasksByUserIdAsync(int userId);

        Task<List<TaskDto>> GetUserTasksByMonthAsync(int userId, int year, int month);

        Task<bool> DeleteTaskAsync(int userId, int id);

        Task<bool> UpdateTaskAsync(TaskPostDto taskDto, int id, int userId);
    }
}
