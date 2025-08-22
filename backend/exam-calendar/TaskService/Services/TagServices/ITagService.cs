using TaskService.DTO;

namespace TaskService.Services.TagServices
{
    public interface ITagService
    {
        Task<bool> CreateTagAsync(TagPostDto tagPostDto, int userId);

        Task<List<TagDto>> GetAllTagsAsync(int userId);

        Task<TagDto> GetTagAsync(int id, int userId);
    }
}
