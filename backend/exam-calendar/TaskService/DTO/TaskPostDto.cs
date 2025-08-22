using System.ComponentModel.DataAnnotations;

namespace TaskService.DTO
{
    public class TaskPostDto
    {
        [Required]
        public int UserId { get; set; }
        [Required]
        public DateOnly TaskDate { get; set; }
        public TimeOnly? TaskTime {  get; set; }
        [Required]
        public string Description {  get; set; } = string.Empty;
        public List<int> TagIds { get; set; } = new();
    }
}
