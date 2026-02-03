namespace BankingSystem.DTOs.Transfers
{
    public class TransferResponseDto
    {
        public string ReferenceNumber { get; set; } = string.Empty;
        public string FromAccountNumber { get; set; } = string.Empty;
        public string ToAccountNumber { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }
}
