using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TaskService.DTO;
using TaskService.Services.TagServices;

namespace TaskService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagController(ITagService tagService) : ControllerBase
    {
        [HttpPost]
        public async Task<ActionResult<string>> AddTag(TagPostDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await tagService.CreateTagAsync(request) is false)
            {
                return BadRequest("Tag with the given name already exists!");
            }

            return Ok("Tag created successfully");
        }

        [HttpGet]
        public async Task<List<TagDto>> GetAllTags()
        {
            return await tagService.GetAllTagsAsync();
        }

        [HttpGet("{TagId}")]
        public async Task<TagDto> GetTagById(int TagId)
        {
            return await tagService.GetTagAsync(TagId);
        }
    }
}
