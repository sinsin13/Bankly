using BankingSystem.DTOs.Admin;
using System.Collections.Generic;
using System.Threading.Tasks;
using BankingSystem.DTOs.Account;
using BankingSystem.DTOs.Kyc;
using BankingSystem.Models;
namespace BankingSystem.Services.Admin
{
    // Admin-specific operations like dashboard stats, reports, etc.
    public interface IAdminService
    {
        // Admin views dashboard statistics
        Task<AdminStatsDto> GetDashboardStatsAsync();
        Task<List<AccountResponseDto>> GetAllAccountsAsync();
        Task<object> GetKycsByStatusAsync(string? status);  // Change return type

    }
}
