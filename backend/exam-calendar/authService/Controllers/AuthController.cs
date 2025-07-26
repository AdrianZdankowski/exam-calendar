using authService.DTO;
using authService.Entities;
using authService.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace authService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(IAuthService authService) : ControllerBase
    {
        [HttpPost("register")]
        public async Task<ActionResult<string>> register(UserDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (await authService.RegisterAsync(request) is false)
            {
                return BadRequest("User already exists!");
            }

            return Ok("User has been created.");
        }

        [HttpPost("login")]
        public async Task<ActionResult<TokenResponse>> login(UserDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await authService.LoginAsync(request);

            if (result == null)
            {
                return BadRequest("User not found.");
            }

            Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(7)
            });

            return Ok(new TokenResponse { AccessToken = result.AccessToken});
        }

        [Authorize]
        [HttpPost("logout")]
        public async Task<ActionResult<string>> logout()
        {
            var authHeader = HttpContext.Request.Headers.Authorization.ToString();

            if (string.IsNullOrEmpty(authHeader) && !authHeader.StartsWith("Bearer", StringComparison.OrdinalIgnoreCase))
                return Unauthorized();

            var token = authHeader.Substring("Bearer ".Length).Trim();

            bool result = await authService.LogoutAsync(token);

            if (!result) return NotFound();
            return Ok("User logged out successfully");
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponse>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(refreshToken)) return BadRequest();

            var result = await authService.RefreshTokensAsync(refreshToken);
            if (result == null) return Unauthorized("Invalid refresh token");

            return Ok(result);
        }

        [Authorize]
        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> getUsers()
        {
            var users = await authService.GetAllUsersAsync();
            return Ok(users);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("admin")]
        public async Task<ActionResult<string>> adminTest()
        {
            return Ok("You are a user with admin role!");
        }
    }
}
