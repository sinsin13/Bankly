using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingSystem.Models
{
    // Transaction Entity 
    public class Transaction
    {
        [Key]
        public int TransactionId { get; set; }

        [Required]
        [ForeignKey("Account")]
        public int AccountId { get; set; } 

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(20)]
        public string Type { get; set; } = string.Empty; // Debit, Credit

        [MaxLength(250)]
        public string Description { get; set; } = string.Empty;

        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(50)]
        public string ReferenceNumber { get; set; } = string.Empty;

        // Navigation Property
        public virtual Account Account { get; set; }
    } 
}
