using Microsoft.AspNetCore.Http;
using BankingSystem.DTOs.Auth;
using BankingSystem.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace BankingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        // ---------------- REGISTER ----------------
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterCustomerDto registerDto)
        {
            try
            {
                await _authService.RegisterAsync(registerDto);
                return StatusCode(201, "Customer registered successfully. Pending admin approval.");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // ---------------- LOGIN ----------------
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                var result = await _authService.LoginAsync(loginDto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Unauthorized(ex.Message);
            }
        }
    }
}
