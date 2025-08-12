using System.ComponentModel.DataAnnotations;

namespace TaskService.DTO
{
    public class TagPostDto
    {
        [Required]
        [MaxLength(32, ErrorMessage = "Tag name cannot exceed 32 characters!")]
        [RegularExpression(@"^[a-zA-Z0-9._-]{2,40}$")]
        public string Name { get; set; } = string.Empty;
    }
}
