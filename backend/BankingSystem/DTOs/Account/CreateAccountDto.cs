using System.ComponentModel.DataAnnotations;

namespace BankingSystem.DTOs.Account
{
    public class CreateAccountDto
    {
        [Required]
        public string AccountType { get; set; } = string.Empty;
        // Allowed values: "Savings" or "Current"

    }
}
