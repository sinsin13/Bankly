using BankingSystem.DTOs.Account;
using BankingSystem.Infrastructure;
using BankingSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace BankingSystem.Services.Accounts
{
    public class AccountService : IAccountService
    {
        private readonly BankingDbContext _context;
        public AccountService(BankingDbContext context)
        {
            _context = context;
        }


        // Fisrt commitment implementation : CreateAccountAsync
        public async Task<AccountResponseDto> CreateAccountAsync(int customerId, CreateAccountDto dto)
        {
            // 1. Fetch customer
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.CustomerId == customerId);

            if (customer == null)
                throw new Exception("Customer not found");

            // 2. Check KYC approval
            if (customer.Status != "Approved")
                throw new Exception("Customer is not approved to create an account");

            // 3. Generate Account Number
            var accountNumber = GenerateAccountNumber();

            // 4. Create Account entity
            var account = new Account
            {
                CustomerId = customerId,
                AccountNumber = accountNumber,
                Type = dto.AccountType,
                Balance = 20000,
                Status = "Active",
                CreatedDate = DateTime.UtcNow
            };

            // 5. Save to DB
            _context.Accounts.Add(account);
            await _context.SaveChangesAsync();

            // 6. Convert to Response DTO
            return new AccountResponseDto
            {
                AccountNumber = account.AccountNumber,
                Type = account.Type,
                Balance = account.Balance,
                Status = account.Status,
                CreatedDate = account.CreatedDate,
                AccountHolderName = customer.Name
            };


        }
        private string GenerateAccountNumber()
        {
            return DateTime.UtcNow.Ticks.ToString();
        }

        // Second commitment implementation : GetAllAccountAsync

        public async Task<List<AccountResponseDto>> GetMyAccountsAsync(int customerId)
        {
            var accounts = await _context.Accounts
                .Include(a => a.Customer)
                .Where(a => a.CustomerId == customerId)
                .ToListAsync();

            return accounts.Select(a => new AccountResponseDto
            {
                AccountNumber = a.AccountNumber,
                Type = a.Type,
                Balance = a.Balance,
                Status = a.Status,
                CreatedDate = a.CreatedDate,
                AccountHolderName = a.Customer.Name
            }).ToList();
        }

        // Third commitment implementation : GetAccountByAccountNumberAsync

        public async Task<AccountResponseDto> GetAccountByAccountNumberAsync(string accountNumber, int customerId)
        {
            var account = await _context.Accounts
                .Include(a => a.Customer)
                .FirstOrDefaultAsync(a => a.AccountNumber == accountNumber);

            if (account == null)
                throw new Exception("Account not found");

            // Ownership enforcement
            if (account.CustomerId != customerId)
                throw new Exception("You do not own this account");

            return new AccountResponseDto
            {
                AccountNumber = account.AccountNumber,
                Type = account.Type,
                Balance = account.Balance,
                Status = account.Status,
                CreatedDate = account.CreatedDate,
                AccountHolderName = account.Customer.Name

            };
        }

        // Admin related stuff : freeze , unfrezze , delete
        // Fourth commitment implementation : FreezeAccountAsync

        public async Task FreezeAccountAsync(String accountNumber)
        {
            var account = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.AccountNumber == accountNumber);

            if (account == null)
                throw new Exception("Account not found");

            if (account.Status == "Closed")
                throw new Exception("Closed accounts cannot be frozen");

            account.Status = "Frozen";
            await _context.SaveChangesAsync();
        }

        // Fifth commitment implementation : UnfreezeAccountAsync

        public async Task UnfreezeAccountAsync(string accountNumber)
        {
            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.AccountNumber == accountNumber);

            if (account == null)
                throw new Exception("The account is not found");

            if (account.Status != "Frozen")
                throw new Exception("Only frozen accounts can be unfrozen");

            account.Status = "Active";
            await _context.SaveChangesAsync();
        }

        // Sixth  commitment implementation : UnfreezeAccountAsync

        public async Task CloseAccountAsync(string accountNumber)
        {
            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.AccountNumber == accountNumber);

            if (account == null)
                throw new Exception("Account not found");

            if (account.Status == "Closed")
                throw new Exception("Account is already closed");

            account.Status = "Closed";
            await _context.SaveChangesAsync();
        }

    }
}
