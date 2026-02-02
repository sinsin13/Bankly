using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.Xml;

namespace BankingSystem.Models
{
    // Account Entity
    public class Account
    {
        [Key]
        public int AccountId { get; set; }

        [Required]
        [ForeignKey("Customer")]
        public int CustomerId { get; set; }

        [Required]
        [MaxLength(20)]
        public string AccountNumber { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Type { get; set; } = String.Empty; // Savings, Current, etc.

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Balance { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Active";

        [Required]
        public DateTime CreatedDate { get; set; }

        // Navigation Properties
        public virtual Customer Customer { get; set; }
        public virtual ICollection<Transaction> Transactions { get; set; }
        public virtual ICollection<Transfer> TransfersFrom { get; set; }
        public virtual ICollection<Transfer> TransfersTo { get; set; }
    }
}
