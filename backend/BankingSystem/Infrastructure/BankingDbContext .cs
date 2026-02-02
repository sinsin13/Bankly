using Microsoft.EntityFrameworkCore;
using BankingSystem.Models;

namespace BankingSystem.Infrastructure
{
    public class BankingDbContext : DbContext
    {
        public BankingDbContext(DbContextOptions<BankingDbContext> options)
        : base(options)
        {
        }

        public DbSet<Customer> Customers => Set<Customer>();
        public DbSet<Account> Accounts => Set<Account>();
        public DbSet<Transaction> Transactions => Set<Transaction>();
        public DbSet<Transfer> Transfers => Set<Transfer>();
        public DbSet<Kyc> Kycs => Set<Kyc>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasIndex(x => x.Email)
                .IsUnique();

            modelBuilder.Entity<Account>()
                .HasOne(a => a.Customer)
                .WithMany(c => c.Accounts)
                .HasForeignKey(a => a.CustomerId);

            modelBuilder.Entity<Transaction>()
                .HasOne(t => t.Account)
                .WithMany()
                .HasForeignKey(t => t.AccountId);

            // Transfer -> FromAccount
            modelBuilder.Entity<Transfer>()
                .HasOne(t => t.FromAccount)
                .WithMany(a => a.TransfersFrom)
                .HasForeignKey(t => t.FromAccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // Transfer -> ToAccount
            modelBuilder.Entity<Transfer>()
                .HasOne(t => t.ToAccount)
                .WithMany(a => a.TransfersTo)
                .HasForeignKey(t => t.ToAccountId)
                .OnDelete(DeleteBehavior.Restrict);

            // Kyc -> Customer (one to one)
            modelBuilder.Entity<Customer>()
                .HasOne(k => k.Kyc)
                .WithOne(c => c.Customer)
                .HasForeignKey<Kyc>(k => k.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Kyc>()
                .HasIndex(k => k.CustomerId)
                .IsUnique();
        }


    }
}
