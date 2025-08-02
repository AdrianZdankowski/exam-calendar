using authService.DTO;
using authService.Entities;
using authService.Models;

namespace authService.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(UserDto userDto);

        Task<List<User>> GetAllUsersAsync();

        Task<TokenData?> LoginAsync(UserDto userDto);

        Task<TokenResponse?> RefreshTokensAsync(string refreshToken);

        string GenerateToken(User user);

        Task<bool> LogoutAsync(string jwtToken);
    }
}
