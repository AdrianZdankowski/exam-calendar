using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskService.DTO;
using TaskService.Services.TaskServices;

namespace TaskService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController(ITaskItemService taskService) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<string>> AddTask(TaskPostDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var task = await taskService.CreateTaskAsync(request);

            if (task == null) return BadRequest("No tags found with specified ids");

            return Ok("Task has been added");
        }

        [HttpGet("id/{taskId}")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int taskId)
        {
            var taskDto = await taskService.GetTaskAsync(taskId);

            if (taskDto == null) return BadRequest("No task found with specified id");

            return Ok(taskDto);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<TaskDto>>> GetAllUserTasks(int userId)
        {
            var tasks = await taskService.GetAllTasksByUserIdAsync(userId);

            if (tasks == null) return BadRequest("Wrong user id");

            return Ok(tasks);
        }

        [HttpDelete("{taskId}")]
        public async Task<ActionResult<string>> DeleteTask(int taskId)
        {
            if (await taskService.DeleteTaskAsync(taskId)) return Ok($"Task with id: {taskId} was deleted");
            else return BadRequest("No task found with specified id");
        }
    }
}
