using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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

        [Authorize]
        [HttpGet("{taskId:int}")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int taskId)
        {
            var taskDto = await taskService.GetTaskAsync(taskId);

            if (taskDto == null) return BadRequest("No task found with specified id");

            return Ok(taskDto);
        }

        [Authorize]
        [HttpGet("user")]
        public async Task<ActionResult<List<TaskDto>>> GetAllUserTasks()
        {
            var authHeader = HttpContext.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authHeader) && !authHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                return Unauthorized();

            var token = authHeader.Substring("Bearer ".Length).Trim();

            var tasks = await taskService.GetAllTasksByUserIdAsync(token);

            if (tasks == null) return BadRequest("Wrong user id");

            return Ok(tasks);
        }

        [Authorize]
        [HttpGet("user/date/{year:int}/{month:int}")]
        public async Task<ActionResult<List<TaskDto>>> GetUserTasksByMonth(int year, int month)
        {
            var authHeader = HttpContext.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authHeader) && !authHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                return Unauthorized();

            var token = authHeader.Substring("Bearer ".Length).Trim();

            var tasks = await taskService.GetUserTasksByMonthAsync(token, year, month);

            if (month < 1 || month > 12) return BadRequest("Month must be between 1 and 12");

            if (tasks == null) return BadRequest("Wrong user id, year or month");

            return Ok(tasks);
        }

        [Authorize]
        [HttpDelete("{taskId:int}")]
        public async Task<ActionResult<string>> DeleteTask(int taskId)
        {
            var authHeader = HttpContext.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authHeader) && !authHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                return Unauthorized();

            var token = authHeader.Substring("Bearer ".Length).Trim();

            if (await taskService.DeleteTaskAsync(token,taskId)) return Ok($"Task with id: {taskId} was deleted");
            else return BadRequest("No task found with specified id");
        }
    }
}
