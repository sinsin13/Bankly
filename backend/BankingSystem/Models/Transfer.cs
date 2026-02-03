using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BankingSystem.Models
{
    // Transfer Entity
    public class Transfer
    {
        [Key]
        public int TransferId { get; set; }

        [Required]
        [ForeignKey("FromAccount")]
        public int FromAccountId { get; set; }

        [Required]
        [ForeignKey("ToAccount")]
        public int ToAccountId { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Amount { get; set; }

        [Required]
        public DateTime Date { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Completed"; // Completed, Failed, Pending

        // Navigation Properties
        public virtual Account FromAccount { get; set; }
        public virtual Account ToAccount { get; set; }
    }
}
