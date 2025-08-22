using Microsoft.EntityFrameworkCore;
using TaskService.Data;
using TaskService.DTO;
using TaskService.Entities;

namespace TaskService.Services.TagServices
{
    public class TagService(TaskDbContext context) : ITagService
    {
        public async Task<bool> CreateTagAsync(TagPostDto tagPostDto, int userId)
        {

            if (await context.Tags.AnyAsync(t => t.Name == tagPostDto.Name && t.UserId == userId))
            {
                return false;
            }

            var tag = new Tag() { Name = tagPostDto.Name , UserId = userId };
            
            context.Tags.Add(tag);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<List<TagDto>> GetAllTagsAsync(int userId)
        {
            return await context.Tags
                .Where(t => t.UserId == userId || t.UserId == null)
                .Select(t => new TagDto { Id = t.Id, Name = t.Name })
                .ToListAsync();
        }

        public async Task<TagDto> GetTagAsync(int id, int userId)
        {
            var tag = await context.Tags.FirstOrDefaultAsync(t => t.Id == id && (t.UserId == userId || t.UserId == null));
            if (tag == null) return null;
            var response = new TagDto();
            response.Id = tag.Id;
            response.Name = tag.Name;

            return response;
        }
    }
}
