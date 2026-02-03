using BankingSystem.DTOs.Transfers;
using BankingSystem.Infrastructure;
using BankingSystem.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using System.Text.RegularExpressions;

namespace BankingSystem.Services.Transfers
{
    public class TransferService : ITransferService
    {
        private readonly BankingDbContext _context;
        public TransferService(BankingDbContext context)
        {
            _context = context;
        }

        public async Task<TransferResponseDto> TransferAsync(int customerId, TransferRequestDto dto)
        {
            using var dbTransaction = await _context.Database.BeginTransactionAsync();

            try
            {
                //    Fetch accounts(row-level lock)
                var fromAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.AccountNumber == dto.FromAccountNumber);
                var toAccount = await _context.Accounts.FirstOrDefaultAsync(x => x.AccountNumber == dto.ToAccountNumber);

                // Validating the both account numbers 
                if (fromAccount == null || toAccount == null)
                    throw new Exception("Account not found");

                // From Customer must be loogin in or must be verified 
                if (customerId != fromAccount.CustomerId)
                    throw new Exception("You do not own the source account");

                // Status of both accounts being checked 
                if (fromAccount.Status != "Active" || toAccount.Status != "Active")
                    throw new Exception("One of the accounts is not active");
                
                // Fund can-not be transfer to same account
                if (fromAccount.AccountId == toAccount.AccountId)
                    throw new Exception("Cannot transfer to same account");

                // Negative money does'nt hold Acid property (consistency)
                if (dto.Amount <= 0)
                    throw new Exception("Invalid Transfer Amount");

                // Transfer only occurs when the source account have the sufficient balance 
                if (fromAccount.Balance < dto.Amount)
                    throw new Exception("Insufficient balance");

                // Update balances
                fromAccount.Balance -= dto.Amount;
                toAccount.Balance += dto.Amount;

                // Generate reference number
                string referenceNumber = Guid.NewGuid().ToString();

                // Create debit transaction (fromAccount)
                var debitTransaction = new Transaction
                {
                    AccountId = fromAccount.AccountId,
                    Amount = dto.Amount,
                    Type = "Debit",
                    Description = "The amount is trafer to " + toAccount.AccountNumber,
                    CreatedDate = DateTime.UtcNow,
                    ReferenceNumber = referenceNumber
                };

                // Create credit transaction (toAccount)

                var creditTransaction = new Transaction
                {
                    AccountId =toAccount.AccountId,
                    Amount = dto.Amount,
                    Type = "Credit",
                    Description = "The amount is trafer from " + fromAccount.AccountNumber,
                    CreatedDate = DateTime.UtcNow,
                    ReferenceNumber = referenceNumber
                };

                // Create transfer record

                var transfer = new Transfer
                {
                    FromAccountId = fromAccount.AccountId,
                    ToAccountId = toAccount.AccountId,
                    Amount = dto.Amount ,
                    Date = DateTime.UtcNow,
                    Status = "Completed"
                };

                _context.Transactions.AddRange(debitTransaction, creditTransaction);
                _context.Transfers.Add(transfer);
                await _context.SaveChangesAsync();

                await dbTransaction.CommitAsync();

                // Response

                return new TransferResponseDto
                {
                    ReferenceNumber = referenceNumber,
                    FromAccountNumber = fromAccount.AccountNumber,
                    ToAccountNumber = toAccount.AccountNumber,
                    Amount = dto.Amount,
                    Status = "Completed",
                    CreatedDate = DateTime.UtcNow
                };
            }
            catch
            {
                await dbTransaction.RollbackAsync();
                throw;
            }
        }
    }
}
