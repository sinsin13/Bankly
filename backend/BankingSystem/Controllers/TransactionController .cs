using BankingSystem.DTOs.Transaction;
using BankingSystem.Services.Transactions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankingSystem.Controllers
{
    [Authorize]
    [Route("api/transactions")]
    [ApiController]
    public class TransactionController : ControllerBase
    {
        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        //------------------------------------ Depositing End Point -----------------------------------

        [HttpPost("deposit")]
        public async Task<IActionResult> Deposit([FromBody] DepositTransactionDto dto)
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var result = await _transactionService.DepositAsync(customerId, dto);

            return Ok(result);
        }

        //------------------------------------ Withdrawing End Point -----------------------------------

        [HttpPost("withdraw")]
        public async Task<IActionResult> Withdraw([FromBody] WithdrawTransactionDto dto)
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var result = await _transactionService.WithdrawAsync(customerId, dto);

            return Ok(result);
        }

        //------------------------------------ Depositing End Point -----------------------------------

        [HttpGet("statement/{accountNumber}")]
        public async Task<IActionResult> GetGetAccountStatement (string accountNumber)
        {
            int customerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

            var result = await _transactionService.GetAccountStatementAsync(customerId, accountNumber);

            return Ok(result);
        }
    }
}
