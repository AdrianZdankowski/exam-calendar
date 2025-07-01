using authService.DTO;
using authService.Entities;

namespace authService.Services
{
    public interface IAuthService
    {
        Task<bool> registerAsync(UserDto userDto);

        Task<List<User>> GetAllUsersAsync();

        Task<LoginResponse?> loginAsync(UserDto userDto);
    }
}
