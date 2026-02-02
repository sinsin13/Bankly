using BankingSystem.DTOs.Transfers;

namespace BankingSystem.Services.Transfers
{
    public interface ITransferService
    {
        Task<TransferResponseDto> TransferAsync(int customerId , TransferRequestDto dto);
    }
}
