using BankingSystem.DTOs.Kyc;
using BankingSystem.Infrastructure;
using Microsoft.EntityFrameworkCore;
using BankingSystem.Models;

namespace BankingSystem.Services.Kyc
{
    public class KycService : IKycService
    {
        private readonly BankingDbContext _context;

        public KycService(BankingDbContext context)
        {
            _context = context;
        }
        // Customer Service regarding KYC
        // Submit your kyc (customer)
        public async Task SubmitKycAsync(int customerId, SubmitKycDto dto)
        {
            if (await _context.Kycs.AnyAsync(x => x.CustomerId == customerId))
                throw new Exception("Kyc already Submitted");

            // I dont know why error is occuring few possibilities 
            // one-one relation , foreign key acha hona hai , 
            var kyc = new Models.Kyc
            {
                CustomerId = customerId,
                PhoneNumber = dto.PhoneNumber,
                AadhaarNumber = dto.AadhaarNumber,
                PanNumber = dto.PanNumber,
                AddressProof = dto.AddressProof,
            };

            _context.Kycs.Add(kyc);
            await _context.SaveChangesAsync();
        }

        // Customer Service regarding KYC
        // View my kyc (customer)
        public async Task<KycResponseDto> GetMyKycAsync(int customerId)
        {
            var kyc = await _context.Kycs
                .FirstOrDefaultAsync(x => x.CustomerId == customerId);

            if (kyc == null)
                throw new Exception("KYC not submitted");

            return new KycResponseDto
            {
                Status = kyc.Status,
                SubmittedAt = kyc.SubmittedAt,
                AdminRemarks = kyc.AdminRemarks
            };
        }

        // ADMIN Service regarding KYC
        // See all registered Kyc & approve or reject them
        public async Task ApproveKycAsync(int customerId)
        {
            var kyc = await _context.Kycs.FirstOrDefaultAsync(x => x.CustomerId == customerId);
            if (kyc == null) throw new Exception("KYC not found");

            kyc.Status = "Approved";

            var customer = await _context.Customers.FindAsync(customerId);
            customer!.Status = "Approved";

            await _context.SaveChangesAsync();
        }

        // ADMIN Service regarding KYC
        // See all registered Kyc & can reject them

        public async Task RejectKycAsync(int customerId, string remarks)
        {
            var kyc = await _context.Kycs.FirstOrDefaultAsync(x => x.CustomerId == customerId);
            if (kyc == null) throw new Exception("KYC not found");

            kyc.Status = "Rejected";
            kyc.AdminRemarks = remarks;

            var customer = await _context.Customers.FindAsync(customerId);
            customer!.Status = "Rejected";

            await _context.SaveChangesAsync();
        }
    }
}

