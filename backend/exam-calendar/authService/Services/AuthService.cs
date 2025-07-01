using authService.Data;
using authService.DTO;
using authService.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace authService.Services
{
    public class AuthService(AuthDbContext context, IConfiguration configuration) : IAuthService
    {
        public async Task<bool> registerAsync(UserDto request)
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

        public async Task<LoginResponse?> loginAsync(UserDto request)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if (user == null) return null;

            var passwordInvalid = new PasswordHasher<User>()
                .VerifyHashedPassword(user, user.PasswordHash, request.Password) == PasswordVerificationResult.Failed;

            if (passwordInvalid) return null;

            return new LoginResponse { response = "User logged in." };
            
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await context.Users.ToListAsync();
        }
    }
}
