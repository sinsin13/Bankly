using BankingSystem.DTOs.Account;

namespace BankingSystem.Services.Accounts
{
    // This is like commentment for Account like :
    // creating account , get all account for a logged in customer , get account by account id , 
   // and rest three things like : freeze , unfreeze account and close the account is being managed by admin 
    public interface IAccountService
    {
        // Customer creates a new bank account
        Task<AccountResponseDto> CreateAccountAsync(int customerId, CreateAccountDto dto);

        // Customer views all of their accounts
        Task<List<AccountResponseDto>> GetMyAccountsAsync(int customerId);

        // Customer views one specific account
        Task<AccountResponseDto> GetAccountByAccountNumberAsync(string accountNumber, int customerId);

        // Admin freezes an account
        Task FreezeAccountAsync(string accountNumber);

        // Admin unfreezes an account
        Task UnfreezeAccountAsync(string accountNumber);

        // Admin permanently closes an account
        Task CloseAccountAsync(string accountNumber);
    }
}
