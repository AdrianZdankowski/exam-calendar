using authService.Data;
using authService.DTO;
using authService.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace authService.Services
{
    public class AuthService(AuthDbContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<bool> RegisterAsync(UserDto request)
        {
            if (await context.Users.AnyAsync(u => u.Username == request.Username))
            {
                return false;
            }

            var user = new User();
            var passwordHash = new PasswordHasher<User>().HashPassword(user, request.Password);

            user.Username = request.Username;
            user.PasswordHash = passwordHash;

            context.Users.Add(user);
            await context.SaveChangesAsync();

            return true;
        }

        public async Task<TokenResponse?> LoginAsync(UserDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null) return null;

            var passwordInvalid = new PasswordHasher<User>()
                .VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed;

            if (passwordInvalid) return null;
            return await CreateTokenResponse(user);

        }

        private async Task<TokenResponse> CreateTokenResponse(User user)
        {
            return new TokenResponse
            {
                AccessToken = GenerateToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user)
            };
        }

        public async Task<TokenResponse?> RefreshTokensAsync(RefreshTokenRequest request)
        {
            var user = await ValidateRefreshTokenAsync(request.RefreshToken);
            if (user is null) return null;

            return await CreateTokenResponse(user);
        }

        private async Task<User?> ValidateRefreshTokenAsync(string refreshToken)
        {
            var user = await context.Users.FirstOrDefaultAsync<User>(u => u.RefreshToken == refreshToken);
            if (user is null || user.RefreshTokenExpiryTime <= DateTime.UtcNow) return null;

            return user;
        }

        public string GenerateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(configuration.GetValue<string>("JwtToken:Token")!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512);

            var token = new JwtSecurityToken(
                issuer: configuration.GetValue<string>("JwtToken:Issuer"),
                audience: configuration.GetValue<string>("JwtToken:Audience"),
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(15),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private string GenerateRefreshToken()
        {
            var randomSequence = new byte[32];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomSequence);
            return Convert.ToBase64String(randomSequence);
        }

        private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
        { 
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            // Refresh token is valid for 7 days
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
            await context.SaveChangesAsync();
            return refreshToken;
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await context.Users.ToListAsync();
        }
    }
}
