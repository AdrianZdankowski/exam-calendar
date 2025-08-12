using TaskService.DTO;

namespace TaskService.Services.TagServices
{
    public interface ITagService
    {
        Task<bool> CreateTagAsync(TagPostDto tagPostDto);

        Task<List<TagDto>> GetAllTagsAsync();

        Task<TagDto> GetTagAsync(int id);
    }
}
