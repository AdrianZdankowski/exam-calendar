using TaskService.DTO;
using TaskService.Entities;

namespace TaskService.Services.TaskServices
{
    public interface ITaskItemService
    {
        Task<TaskItem> CreateTaskAsync(TaskPostDto taskPostDto);

        Task<TaskDto> GetTaskAsync(int id);

        Task<List<TaskDto>> GetAllTasksByUserIdAsync(int userId);

        Task<bool> DeleteTaskAsync(int id);
    }
}
