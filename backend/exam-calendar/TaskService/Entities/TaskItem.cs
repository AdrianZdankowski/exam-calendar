using System.ComponentModel.DataAnnotations;

namespace TaskService.Entities
{
    public class TaskItem
    {
        [Key]
        public int Id { get; set; }

        public int UserId { get; set; }

        public DateOnly TaskDate { get; set; }

        public TimeOnly? TaskTime { get; set; }

        public string Description { get; set; } = string.Empty;

        public ICollection<Tag> Tags { get; set; } = new List<Tag>();
    }
}
