using System.ComponentModel.DataAnnotations;

namespace authService.DTO
{
    public class UserDto
    {
        [Required(ErrorMessage = "Username is required!")]
        [MaxLength(32, ErrorMessage = "Username cannot exceed 32 characters!")]
        [RegularExpression(@"^[a-zA-Z0-9]+$")]
        public string Username { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required!")]
        [MinLength(8, ErrorMessage = "Password has to be at least 8 characters long!")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$")]
        public string Password { get; set; } = string.Empty;
    }
}
