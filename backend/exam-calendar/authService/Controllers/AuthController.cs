using authService.DTO;
using authService.Entities;
using authService.Services;
using Microsoft.AspNetCore.Http;
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

            if (await authService.registerAsync(request) is false)
            {
                return BadRequest("User already exists!");
            }

            return Ok("User has been created.");
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> login(UserDto request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await authService.loginAsync(request);

            if (result == null)
            {
                return BadRequest("User not found.");
            }

            return Ok(result);
        }



        [HttpGet("users")]
        public async Task<ActionResult<List<User>>> getUsers()
        {
            var users = await authService.GetAllUsersAsync();
            return Ok(users);
        }
    }
}
