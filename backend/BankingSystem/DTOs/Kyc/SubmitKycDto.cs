namespace BankingSystem.DTOs.Kyc
{
    public class SubmitKycDto
    {
        public string PhoneNumber { get; set; } = string.Empty;
        public string AadhaarNumber { get; set; } = string.Empty;
        public string PanNumber { get; set; } = string.Empty;
        public string AddressProof { get; set; } = string.Empty;
    }
}
