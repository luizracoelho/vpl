using AuthService.Domain.Contracts;
using AuthService.Domain.Utils;
using AuthService.Domain.VMs.Users;
using AutoMapper;
using MediatR;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AuthService.App.Commands.Users
{
    public class LoginCommand : IRequest<UserVm>
    {
        public string Email { get; set; }
        public string Password { get; set; }

        public class LoginCommandHandler : IRequestHandler<LoginCommand, UserVm>
        {
            private readonly IUnitOfWork _uow;
            private readonly IMapper _mapper;

            public LoginCommandHandler(IUnitOfWork uow, IMapper mapper)
            {
                _uow = uow;
                _mapper = mapper;
            }

            public async Task<UserVm> Handle(LoginCommand request, CancellationToken cancellationToken)
            {
                if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
                    throw new Exception("Usuário ou senha inválidos.");

                var user = await _uow.Users.FindByEmail(request.Email);

                if (user == null)
                    throw new Exception("Usuário ou senha inválidos.");

               
                if (user.Password != request.Password.PasswordEncrypt("SAltKey1"))
                  throw new Exception("Usuário ou senha inválidos.");

                var userVm = _mapper.Map<UserVm>(user);

                userVm.Token = GenerateToken(user.Id);

                return userVm;
            }

            private static string GenerateToken(long subject)
            {
                var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, subject.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var token = new JwtSecurityToken(
                    issuer: "br.com.vpl",
                    audience: "br.com.vpl",
                    claims: claims,
                expires: DateTime.UtcNow.AddHours(12),
                    signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes("V3h!cLe@2os3TesT")), SecurityAlgorithms.HmacSha256)
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        }
    }
}
