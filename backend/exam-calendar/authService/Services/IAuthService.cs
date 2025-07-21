using authService.DTO;
using authService.Entities;

namespace authService.Services
{
    public interface IAuthService
    {
        Task<bool> RegisterAsync(UserDto userDto);

        Task<List<User>> GetAllUsersAsync();

        Task<TokenResponse?> LoginAsync(UserDto userDto);

        Task<TokenResponse?> RefreshTokensAsync(RefreshTokenRequest request);

        string GenerateToken(User user);

        Task<bool> LogoutAsync(string jwtToken);
    }
}
