using Microsoft.EntityFrameworkCore;
using TaskService.Data;
using TaskService.DTO;
using TaskService.Entities;

namespace TaskService.Services.TagServices
{
    public class TagService(TaskDbContext context) : ITagService
    {
        public async Task<bool> CreateTagAsync(TagPostDto tagPostDto)
        {

            if (await context.Tags.AnyAsync(t => t.Name == tagPostDto.Name))
            {
                return false;
            }

            var tag = new Tag();
            tag.Name = tagPostDto.Name;

            context.Tags.Add(tag);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<List<TagDto>> GetAllTagsAsync()
        {
            return await context.Tags.Select(t => new TagDto { Id = t.Id, Name = t.Name }).ToListAsync();
        }

        public async Task<TagDto> GetTagAsync(int id)
        {
            var tag = await context.Tags.FirstOrDefaultAsync(t => t.Id == id);
            if (tag == null) { return null; }
            var response = new TagDto();
            response.Id = tag.Id;
            response.Name = tag.Name;

            return response;
        }
    }
}
