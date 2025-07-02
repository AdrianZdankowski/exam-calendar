using authService.DTO;
using authService.Entities;

namespace authService.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(UserDto userDto);

        Task<List<User>> GetAllUsersAsync();

        Task<LoginResponse?> LoginAsync(UserDto userDto);

        string GenerateToken(User user);
    }
}
