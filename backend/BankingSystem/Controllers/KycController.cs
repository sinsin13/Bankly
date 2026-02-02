using BankingSystem.DTOs.Kyc;
using BankingSystem.Services.Kyc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankingSystem.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class KycController : ControllerBase
    {
        private readonly IKycService _kycService;

        public KycController(IKycService kycService)
        {
            _kycService = kycService;
        }

        // Submitting the Kyc details from user :

        [HttpPost("submit")]
        public async Task<IActionResult> SubmitKyc(SubmitKycDto dto)
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            await _kycService.SubmitKycAsync(customerId, dto);
            return Ok("KYC submitted successfully");
        }

        // reviewing the Kyc details from user :

        [HttpGet("me")]
        public async Task<IActionResult> GetMyKyc()
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
            return Ok(await _kycService.GetMyKycAsync(customerId));
        }

        //  Admin view all the Kyc details from user : EITHER approve or reject it
        [Authorize(Roles = "Admin")]
        [HttpPut("admin/approve/{customerId}")]
        public async Task<IActionResult> ApproveKyc(int customerId)
        {
            await _kycService.ApproveKycAsync(customerId);
            return Ok("KYC approved");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("admin/reject/{customerId}")]
        public async Task<IActionResult> RejectKyc(int customerId, [FromBody] string remarks)
        {
            await _kycService.RejectKycAsync(customerId, remarks);
            return Ok("KYC rejected");
        }
    }
}
