using BankingSystem.Models;

namespace BankingSystem.Services.Token
{
    public interface IJwtTokenService
    {
        string GenerateToken(Customer customer);
    }
}
