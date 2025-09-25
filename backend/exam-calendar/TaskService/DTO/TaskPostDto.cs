using System.ComponentModel.DataAnnotations;

namespace TaskService.DTO
{
    public class TaskPostDto
    {
        [Required]
        public DateOnly TaskDate { get; set; }
        public TimeOnly? TaskTime {  get; set; }
        [Required]
        [MaxLength(200, ErrorMessage = "Task description cannot exceed 200 characters.")]
        public string Description {  get; set; } = string.Empty;
        public List<int> TagIds { get; set; } = new();
    }
}
