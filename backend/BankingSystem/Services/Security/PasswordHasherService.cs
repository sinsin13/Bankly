using Microsoft.AspNetCore.Identity;

namespace BankingSystem.Services.Security
{
    public class PasswordHasherService : IPasswordHasherService
    {
        private readonly PasswordHasher<object> _passwordHasher;
        // Microsoft's PasswordHasher uses PBKDF2 algorithm 
        // 1. Salt Generation   2. Hash the hashed pass 1000 times  3. Output: base64-encoded string containing algorithm version, salt, and hash 

        public PasswordHasherService()
        {
            _passwordHasher = new PasswordHasher<object>();
        }

        // Used during Registration (This HashPassword goes-into Database)
        public string HashPassword(string password)
        {
            return _passwordHasher.HashPassword(null!, password);
        }

        //Used During the Login (Checks that the user is Valid or Not)
        public bool VerifyPassword(string password, string passwordHash)
        {
            var result = _passwordHasher.VerifyHashedPassword(null!, passwordHash, password);
            return result == PasswordVerificationResult.Success;
        } 
    }
}
