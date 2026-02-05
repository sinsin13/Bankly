using BankingSystem.DTOs.Auth;
using BankingSystem.Infrastructure;
using BankingSystem.Models;
using BankingSystem.Services.Security;
using BankingSystem.Services.Token;
using Microsoft.EntityFrameworkCore;

namespace BankingSystem.Services.Auth
{
    public class AuthService : IAuthService 
    {
        private readonly BankingDbContext _context;
        private readonly IPasswordHasherService _passwordHasher;
        private readonly IJwtTokenService _jwtTokenService;

        public AuthService(BankingDbContext context, IPasswordHasherService passwordHasher , IJwtTokenService jwtTokenService)
        {
            _context = context;
            _passwordHasher = passwordHasher;
            _jwtTokenService = jwtTokenService;
        }


        public async Task RegisterAsync(RegisterCustomerDto registerDto)
        {
            // Check if email already exists
            if (await _context.Customers.AnyAsync(c => c.Email == registerDto.Email))
                throw new Exception("Email already registered");

            // Create customer entity
            var customer = new Customer
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                PasswordHash = _passwordHasher.HashPassword(registerDto.Password),
                Dob = null,
                Address = registerDto.Address,
                Status = "Pending",     // Admin can approve later
                Role = "Customer"       // Default role
            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
        }

        public async Task<AuthResponseDto> LoginAsync(LoginDto loginDto)
        {
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Email == loginDto.Email);

            if (customer == null)
                throw new Exception("Invalid email or password");

            bool isPasswordValid = _passwordHasher.VerifyPassword(
                loginDto.Password,
                customer.PasswordHash
            );

            if (!isPasswordValid)
                throw new Exception("Invalid email or password");

            // JWT generation will come in next step
            var token = _jwtTokenService.GenerateToken(customer);

            return new AuthResponseDto
            {
                Token = token,
                UserName = customer.Name,
                Role = customer.Role,
                Expiration = DateTime.UtcNow.AddMinutes(60)
            };
        }
    }
}
