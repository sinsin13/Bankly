using BankingSystem.DTOs.Auth;

namespace BankingSystem.Services.Auth
{
    public interface IAuthService
    {
            Task RegisterAsync(RegisterCustomerDto registerDto);
            //Task means the method above is async , not block the thread and void function , nothing is returning
            Task<AuthResponseDto> LoginAsync(LoginDto loginDto);
            // Task means same but it is returning a AuthResponseDto
        
    }
}
