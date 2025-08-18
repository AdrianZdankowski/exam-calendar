using TaskService.DTO;

namespace TaskService.Services.TagServices
{
    public interface ITagService
    {
        Task<bool> CreateTagAsync(TagPostDto tagPostDto, string token);

        Task<List<TagDto>> GetAllTagsAsync(int token);

        Task<TagDto> GetTagAsync(int id, string token);
    }
}
