using BankingSystem.Services.Admin;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BankingSystem.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }

        // Admin views dashboard statistics
        [HttpGet("dashboard/stats")]
        public async Task<IActionResult> GetDashboardStats()
        {
            var stats = await _adminService.GetDashboardStatsAsync();
            return Ok(stats);
        }

        // Admin views all accounts
        [HttpGet("accounts")]
        public async Task<IActionResult> GetAllAccounts()
        {
            var accounts = await _adminService.GetAllAccountsAsync();
            return Ok(accounts);
        }

        // Admin views all pending KYC applications
        [HttpGet("kyc")]
        public async Task<IActionResult> GetKycsByStatus([FromQuery] string? status = "Submitted")
        {
            var kycs = await _adminService.GetKycsByStatusAsync(status);
            return Ok(kycs);
        }
    }
}
