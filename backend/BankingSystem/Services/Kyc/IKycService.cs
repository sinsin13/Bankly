using BankingSystem.DTOs.Kyc;

namespace BankingSystem.Services.Kyc
{
    public interface IKycService
    {   
        //for Customer
        Task SubmitKycAsync(int customerId, SubmitKycDto dto);
        Task<KycResponseDto> GetMyKycAsync(int customerId);

        //for Admin
        Task ApproveKycAsync(int customerId);

        Task RejectKycAsync(int customerId, string remarks);

    }
}
