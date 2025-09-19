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

            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            if (await tagService.CreateTagAsync(request, userIdClaim) is false)
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
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            return await tagService.GetTagAsync(TagId, userIdClaim);
        }

        [Authorize]
        [HttpDelete("{TagId}")]
        public async Task<ActionResult<string>> DeleteTag(int TagId)
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            if (await tagService.DeleteTagAsync(TagId, userIdClaim) is false)
            {
                return NotFound("Tag with specified id was not found or is a global tag.");
            }

            return Ok("Tag deleted successfully.");
        }

        [Authorize]
        [HttpPatch]
        public async Task<ActionResult<string>> UpdateTag(TagDto tagDto)
        {
            var userIdClaim = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);

            if (await tagService.UpdateTagAsync(tagDto, userIdClaim) is false) return BadRequest("Tag is global or does not exist.");

            return Ok("Tag updated successfully.");
        }
    }
}
