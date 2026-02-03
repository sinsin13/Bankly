using System.ComponentModel.DataAnnotations;

namespace BankingSystem.DTOs.Transaction
{
    public class WithdrawTransactionDto
    {
        [Required]
        public string AccountNumber { get; set; } = string.Empty;

        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Amount must be greater than zero")]

        public decimal Amount { get; set; }
    }
}
