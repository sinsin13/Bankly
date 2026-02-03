using System;
using System.ComponentModel.DataAnnotations;

namespace BankingSystem.DTOs.Auth
{
    public class RegisterCustomerDto
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;

        [Required]
        public DateTime Dob { get; set; }

        [Required]
        public string Address { get; set; } = string.Empty;
    }
}
