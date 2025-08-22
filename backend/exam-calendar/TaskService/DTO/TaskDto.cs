namespace TaskService.DTO
{
    public class TaskDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateOnly TaskDate { get; set; }
        public TimeOnly? TaskTime { get; set; } 
        public string Description { get; set; } = string.Empty;
        public List<TagDto> Tags { get; set; } = new List<TagDto>();
    }
}
