namespace BankingSystem.DTOs.Kyc
{
    public class KycResponseDto
    {
        public string Status { get; set; } = string.Empty;
        public DateTime SubmittedAt { get; set; }
        public string ? AdminRemarks { get; set; }
    }
}
