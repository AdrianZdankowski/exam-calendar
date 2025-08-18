using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using TaskService.DTO;
using TaskService.Services.TagServices;

namespace TaskService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController(ITagService tagService) : ControllerBase
    {
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<string>> AddTag(TagPostDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var authHeader = HttpContext.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authHeader) && !authHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                return Unauthorized();

            var token = authHeader.Substring("Bearer ".Length).Trim();

            if (await tagService.CreateTagAsync(request, token) is false)
            {
                return BadRequest("Tag with the given name already exists!");
            }

            return Ok("Tag created successfully");
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<List<TagDto>>> GetAllTags()
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            return await tagService.GetAllTagsAsync(userIdClaim);
        }

        [Authorize]
        [HttpGet("{TagId}")]
        public async Task<ActionResult<TagDto>> GetTagById(int TagId)
        {
            var authHeader = HttpContext.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authHeader) && !authHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                return Unauthorized();

            var token = authHeader.Substring("Bearer ".Length).Trim();

            return await tagService.GetTagAsync(TagId, token);
        }
    }
}
