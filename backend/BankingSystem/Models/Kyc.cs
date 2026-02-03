using System.ComponentModel.DataAnnotations;

namespace BankingSystem.Models
{
    public class Kyc
    {
        [Key]
        public int KycId { get; set; }                    // Primary Key
        public int CustomerId { get; set; }               // Foreign Key to Customer

        [Required]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string AadhaarNumber { get; set; } = string.Empty;  // Indian ID

        [Required]
        public string PanNumber { get; set; } = string.Empty;      // Tax ID

        [Required]
        public string AddressProof { get; set; } = string.Empty;   

        public string Status { get; set; } = "Submitted";          // Submitted, Approved, Rejected
        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
        public string? AdminRemarks { get; set; }                  // Admin's comments -> Optional 

        //Navigation property 
        public Customer Customer { get; set; } = null!;

    }
}
