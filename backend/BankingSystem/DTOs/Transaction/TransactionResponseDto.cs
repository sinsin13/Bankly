namespace BankingSystem.DTOs.Transaction
{
    public class TransactionResponseDto
    {
        public string AccountNumber { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string TransactionType { get; set; } = string.Empty;
        public string ReferenceNumber { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
        public decimal? BalanceAfterTransaction { get; set; }
    }
}
