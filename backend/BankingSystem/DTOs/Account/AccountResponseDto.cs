namespace BankingSystem.DTOs.Account
{
    public class AccountResponseDto
    {
        public string AccountNumber { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public decimal Balance { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }

        // Optional: Include basic user info
        public string? AccountHolderName { get; set; }

    }
}
