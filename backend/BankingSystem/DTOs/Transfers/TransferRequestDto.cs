using System.ComponentModel.DataAnnotations;

namespace BankingSystem.DTOs.Transfers
{
    public class TransferRequestDto
    {
        [Required]
        public string FromAccountNumber { get; set; } = string.Empty;

        [Required]
        public string ToAccountNumber { get; set; } = string.Empty;

        [Required]
        [Range(1, double.MaxValue, ErrorMessage = "Transfer amount must be greater than zero")]
        public decimal Amount { get; set; }
    }
}
