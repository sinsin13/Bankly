namespace BankingSystem.DTOs.Admin
{
    public class AdminStatsDto
    {
        public int TotalAccounts { get; set; }
        public int ActiveAccounts { get; set; }
        public int PendingKycCount { get; set; }
        public int ApprovedKycCount { get; set; }
        public int TotalTransactions { get; set; }
        public int PendingTransfers { get; set; }
    }
}
