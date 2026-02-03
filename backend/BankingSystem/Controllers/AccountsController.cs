using Microsoft.AspNetCore.Http;

using BankingSystem.DTOs.Account;
using BankingSystem.Services.Accounts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BankingSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // All endpoints require authentication
    public class AccountsController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public AccountsController(IAccountService accountService)
        {
            _accountService = accountService;
        }

        // ---------------- Customer & Admin : CREATE ACCOUNT ----------------
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] CreateAccountDto dto)
        {
            int customerId = GetCustomerIdFromToken();
            var account = await _accountService.CreateAccountAsync(customerId , dto);
            return Ok(account);
        }

        // ---------------- Customer & Admin : GET MY ACCOUNTS ----------------
        [HttpGet]
        public async Task<IActionResult> GetMyAccounts()
        {
            int customerId = GetCustomerIdFromToken();
            var accounts = await _accountService.GetMyAccountsAsync(customerId);
            return Ok(accounts);
        }

        // ---------------- Customer & Admin : GET MY ACCOUNT BY ACCOUNT-NUMBER ----------------
        [HttpGet("{accountNumber}")]
        public async Task<IActionResult> GetAccountByAccountNumber(string accountNumber)
        {
            int customerId = GetCustomerIdFromToken();

            var account = await _accountService.GetAccountByAccountNumberAsync(accountNumber, customerId);

            return Ok(account);
        }

        // ---------------- ADMIN: FREEZE ACCOUNT ----------------
        [Authorize(Roles = "Admin")]
        [HttpPut("{accountNumber}/freeze")]
        public async Task<IActionResult> FreezeAccount(string accountNumber)
        {
            await _accountService.FreezeAccountAsync(accountNumber);
            return Ok("Account frozen successfully");
        }

        // ---------------- ADMIN: UNFREEZE ACCOUNT ----------------
        [Authorize(Roles = "Admin")]
        [HttpPut("{accountNumber}/unfreeze")]
        public async Task<IActionResult> UnfreezeAccount(string accountNumber)
        {
            await _accountService.UnfreezeAccountAsync(accountNumber);
            return Ok("Account unfrozen successfully");
        }

        // ---------------- ADMIN: DELETE ACCOUNT ----------------
        [Authorize(Roles ="Admin")]
        [HttpPut("{accountNumber}/delete")]

        public async Task<IActionResult> CloseAccount(string accountNumber)
        {
            await _accountService.CloseAccountAsync(accountNumber);
            return Ok("Account closed successfully");
        }


        //------------------ Helper Method  : Which parse the token and extract the customerId for verification -----------------

        private int GetCustomerIdFromToken()
        {
            return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        }
    }
}
