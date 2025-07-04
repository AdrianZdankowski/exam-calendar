using authService.Entities;
using Microsoft.AspNetCore.Identity;

namespace authService.Data
{
    public class DataInitializer(AuthDbContext authDbContext)
    {
        public async Task initializeDataAsync()
        {
            authDbContext.Database.EnsureCreated();

            if (!authDbContext.Users.Any())
            {
                await addUsers();
            }
        }

        private async Task addUsers()
        {
            var user = new User();
            var passwordHash = new PasswordHasher<User>().HashPassword(user, "Test@123");

            user.Username = "Janek";
            user.PasswordHash = passwordHash;

            var adminUser = new User();
            var adminPasswordHash = new PasswordHasher<User>().HashPassword(adminUser, "Admin@123");

            adminUser.Username = "Admin";
            adminUser.PasswordHash = adminPasswordHash;
            adminUser.Role = "Admin";

            authDbContext.Users.Add(adminUser);
            authDbContext.Users.Add(user);
            await authDbContext.SaveChangesAsync();
        }
    }
}
