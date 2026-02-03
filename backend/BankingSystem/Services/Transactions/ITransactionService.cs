using BankingSystem.DTOs.Transaction;

namespace BankingSystem.Services.Transactions
{
    public interface ITransactionService
    {
        Task<TransactionResponseDto> DepositAsync(int customerId, DepositTransactionDto dto);
        Task<TransactionResponseDto> WithdrawAsync(int customerId, WithdrawTransactionDto dto);
        Task<List<TransactionResponseDto>> GetAccountStatementAsync(int customerId, string accountNumber);
    }
}
