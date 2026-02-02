using BankingSystem.DTOs.Transfers;
using BankingSystem.Services.Transactions;
using BankingSystem.Services.Transfers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankingSystem.Controllers
{
    [Authorize]
    [Route("api/transfers")]
    [ApiController]
    public class TransferController : ControllerBase
    {
        private readonly ITransferService _transferService;
        public TransferController(ITransferService transferService)
        {
            _transferService = transferService;
        }

        [HttpPost]
        public async Task<IActionResult> Transfer([FromBody] TransferRequestDto dto)
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var result = await _transferService.TransferAsync(customerId, dto);

            return Ok(result);
        }
    }
}
