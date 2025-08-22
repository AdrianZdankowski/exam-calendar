using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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

            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var task = await taskService.CreateTaskAsync(request, userIdClaim);

            if (task == null) return BadRequest("No tags found with specified ids");

            return Ok("Task has been added");
        }

        [Authorize]
        [HttpGet("{taskId:int}")]
        public async Task<ActionResult<TaskDto>> GetTaskById(int taskId)
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var taskDto = await taskService.GetTaskAsync(taskId, userIdClaim);

            if (taskDto == null) return BadRequest("No task found with specified id");

            return Ok(taskDto);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetAllUserTasks()
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var tasks = await taskService.GetAllTasksByUserIdAsync(userIdClaim);

            if (tasks == null) return NoContent();

            return Ok(tasks);
        }

        [Authorize]
        [HttpGet("date/{year:int}/{month:int}")]
        public async Task<ActionResult<List<TaskDto>>> GetUserTasksByMonth(int year, int month)
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            var tasks = await taskService.GetUserTasksByMonthAsync(userIdClaim, year, month);

            if (month < 1 || month > 12) return BadRequest("Month must be between 1 and 12");

            if (tasks == null) return BadRequest("Wrong user id, year or month");

            return Ok(tasks);
        }

        [Authorize]
        [HttpDelete("{taskId:int}")]
        public async Task<ActionResult<string>> DeleteTask(int taskId)
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            if (await taskService.DeleteTaskAsync(userIdClaim,taskId)) return Ok($"Task with id: {taskId} was deleted");
            else return BadRequest("No task found with specified id");
        }
    }
}
