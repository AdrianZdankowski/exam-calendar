﻿using authService.DTO;
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

            return Ok(result);
        }

        [HttpPost("refresh-token")]
        public async Task<ActionResult<TokenResponse>> RefreshToken(RefreshTokenRequest request)
        {
            var result = await authService.RefreshTokensAsync(request);
            if (result is null || result.AccessToken is null || result.RefreshToken is null) return Unauthorized("Invalid refesh token");

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
