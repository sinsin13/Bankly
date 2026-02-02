using System.ComponentModel.DataAnnotations;

namespace BankingSystem.Models
{

        // Customer Entity
        public class Customer 
        {
            [Key]
            public int CustomerId { get; set; }

            [Required]
            [MaxLength(100)]
            public string Name { get; set; } = string.Empty;

            [Required]
            [EmailAddress]
            [MaxLength(100)]
            public string Email { get; set; } = string.Empty;

            [Required]
            public string PasswordHash { get; set; } = string.Empty;

            [Required]
            public DateTime Dob { get; set; }

            [MaxLength(250)]
            public string Address { get; set; }

            [Required]
            [MaxLength(20)]
            public string Status { get; set; } = "Pending"; // Approved , Rejected , pending-> onboarding and kyc approval
           
            [Required]
            [MaxLength(50)]
            public string Role { get; set; } = "Customer";

        // Navigation Property
            public virtual ICollection<Account> Accounts { get; set; }
            public Kyc ? Kyc { get; set; }  // One-to-One relationship (nullable because customer might not have submitted KYC yet)
    }
}

