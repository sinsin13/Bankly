using BankingSystem.DTOs.Admin;
using BankingSystem.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using BankingSystem.DTOs.Kyc;
using BankingSystem.DTOs.Account;
using BankingSystem.Models;

namespace BankingSystem.Services.Admin
{
    public class AdminService : IAdminService
    {
        private readonly BankingDbContext _context;

        public AdminService(BankingDbContext context)
        {
            _context = context;
        }


        // this is admin service to get dashboard stats
        public async Task<AdminStatsDto> GetDashboardStatsAsync()
        {
            return new AdminStatsDto
            {
                TotalAccounts = await _context.Accounts.CountAsync(),
                ActiveAccounts = await _context.Accounts.CountAsync(),
                PendingKycCount = await _context.Kycs.CountAsync(),
                ApprovedKycCount = await _context.Kycs.CountAsync(),
                TotalTransactions = await _context.Transactions.CountAsync(),
                PendingTransfers = await _context.Transfers.CountAsync()
            };
        }

        // this is admin service to get all accounts
        public async Task<List<AccountResponseDto>> GetAllAccountsAsync()
        {
            return await _context.Accounts
                .Include(a => a.Customer) // Include customer details
                .Select(a => new AccountResponseDto
                {
                    AccountNumber = a.AccountNumber,
                    Type = a.Type,
                    Balance = a.Balance,
                    Status = a.Status,
                    CreatedDate = a.CreatedDate,
                    AccountHolderName = a.Customer.Name
                    // Add CustomerName if your DTO has it
                })
                .ToListAsync();
        }

        // this is admin service to get all pending kycs
        public async Task<object> GetKycsByStatusAsync(string? status)
        {
            var query = _context.Kycs
                .Include(k => k.Customer)
                .AsQueryable();

            if (!string.IsNullOrEmpty(status))
            {
                query = query.Where(k => k.Status == status);
            }

            var kycs = await query
                .Select(k => new
                {
                    k.CustomerId,
                    CustomerName = k.Customer.Name,
                    CustomerEmail = k.Customer.Email,  // Only safe fields
                    k.PhoneNumber,
                    MaskedAadhaar = "XXXX-XXXX-" + k.AadhaarNumber.Substring(k.AadhaarNumber.Length - 4),  // Mask sensitive data
                    k.PanNumber,
                    k.Status,
                    k.SubmittedAt,
                    k.AdminRemarks
                })
                .ToListAsync();

            return kycs;
        }

    }
}
