using BankingSystem.DTOs.Transaction;
using BankingSystem.Infrastructure;
using Microsoft.EntityFrameworkCore;
using BankingSystem.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace BankingSystem.Services.Transactions
{
    public class TransactionService : ITransactionService
    {
        private readonly BankingDbContext _context;

        public TransactionService(BankingDbContext context)
        {
            _context = context;
        }

        // -------------------- DEPOSIT --------------------
        public async Task<TransactionResponseDto> DepositAsync(int customerId , DepositTransactionDto dto)
        {
            using var dbTransaction = await _context.Database.BeginTransactionAsync();

            var account = await _context.Accounts
                .FirstOrDefaultAsync(a => a.AccountNumber == dto.AccountNumber);

            if (account == null)
                throw new Exception("Account not found");

            if (account.CustomerId != customerId)
                throw new Exception("Account does not belongs to you !");

            if (account.Status != "Active")
                throw new Exception("Account is not active");

            if (dto.Amount <= 0)
                throw new Exception("Invalid deposit amount");

            account.Balance += dto.Amount;

            // Utility :
            string refNo= Guid.NewGuid().ToString();

            var transaction = new Transaction
            {
                AccountId = account.AccountId,
                Amount = dto.Amount,
                Type = "Credit",
                Description = "The amount is being deposited successfully",
                CreatedDate = DateTime.UtcNow,
                ReferenceNumber = refNo
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            // VVI step :
            await dbTransaction.CommitAsync();

            return new TransactionResponseDto
            {
                AccountNumber = account.AccountNumber,
                Amount = dto.Amount, 
                TransactionType = "Credit", 
                ReferenceNumber = refNo , 
                CreatedDate= DateTime.UtcNow,
                BalanceAfterTransaction = account.Balance
            };
        }

        // -------------------- WITHDRAW --------------------

        public async Task<TransactionResponseDto> WithdrawAsync(int customerId, WithdrawTransactionDto dto)
        {
            using var dbTransaction = await _context.Database.BeginTransactionAsync();

            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.AccountNumber == dto.AccountNumber);

            if (account == null)
                throw new Exception("Account not Found");

            if (account.CustomerId != customerId)
                throw new Exception("Account does not belongs to you");

            if (account.Status != "Active")
                throw new Exception("Account is not active");

            if (dto.Amount <= 0)
                throw new Exception("Invalid withdraw amount");

            if (account.Balance < dto.Amount)
                throw new Exception("In-sufficient Funds");

            account.Balance -= dto.Amount;

            // Utils
            string refNo = Guid.NewGuid().ToString();

            var transaction = new Transaction
            {
                AccountId = account.AccountId,
                Amount = dto.Amount,
                Type = "Debit",
                Description = "The amount is being withdrawal successfully",
                CreatedDate = DateTime.UtcNow,
                ReferenceNumber = refNo
            };

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            await dbTransaction.CommitAsync();

            return new TransactionResponseDto
            {
                AccountNumber = account.AccountNumber,
                Amount = dto.Amount,
                TransactionType = "Debit",
                ReferenceNumber = refNo,
                CreatedDate = DateTime.UtcNow,
                BalanceAfterTransaction = account.Balance
            };
        }

        // -------------------- Account Statement / Transaction History --------------------

        public async Task<List<TransactionResponseDto>> GetAccountStatementAsync(int customerId, string accountNumber)
        {
            var account = await _context.Accounts.FirstOrDefaultAsync(x => x.AccountNumber == accountNumber);

            if (account == null)
                throw new Exception("Account does not exist");

            if (account.CustomerId != customerId)
                throw new Exception("You do not own this account");

            var transaction = await _context.Transactions
                .Where(x => x.AccountId == account.AccountId)
                .OrderByDescending(x => x.CreatedDate)
                .Select(x => new TransactionResponseDto
                {
                    AccountNumber = account.AccountNumber,
                    Amount = x.Amount , 
                    TransactionType = x.Type,
                    ReferenceNumber = x.ReferenceNumber,    
                    CreatedDate = DateTime.UtcNow,
                    BalanceAfterTransaction = account.Balance
                }).ToListAsync();

            return transaction;
        }
    }
}
