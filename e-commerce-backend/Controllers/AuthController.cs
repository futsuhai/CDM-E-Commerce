using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Frontend;
using e_commerce_backend.Models.Options;
using e_commerce_backend.Services.AccountService;
using e_commerce_backend.Utils.ImageUtils;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthController> _logger;
        private readonly CryptoOptions _cryptoOptions;
        private readonly JwtOptions _jwtOptions;

        public AuthController(
            ILogger<AuthController> logger,
            IAccountService accountService,
            IMapper mapper,
            CryptoOptions cryptoOptions,
            JwtOptions jwtOptions)
        {
            _logger = logger;
            _accountService = accountService;
            _mapper = mapper;
            _cryptoOptions = cryptoOptions;
            _jwtOptions = jwtOptions;
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] AccountModel accountModel)
        {
            var errors = await _accountService.CheckDuplicateAccounts(accountModel.Login, accountModel.Email);
            if (errors.Any())
            {
                _logger.LogError("Ошибка при создании аккаунта");
                return BadRequest(new { message = "Ошибка при регистрации пользователя", detail = errors });
            }
            var salt = _cryptoOptions.GenerateSalt();
            var hashPassword = _cryptoOptions.GenerateHashPassword(accountModel.Password, salt);
            var account = _mapper.Map<Account>(accountModel);
            account.Salt = Convert.ToBase64String(salt);
            account.HashPassword = Convert.ToBase64String(hashPassword);
            account.Tokens = _jwtOptions.GetJwtTokens(account.Login);
            account.Avatar = ImageUtils.SetImageFromFile("InitAssets/avatar.jpg");
            await _accountService.CreateAsync(account);
            return Ok("Регистрация прошла успешно");
        }

        [HttpPut("Auth")]
        public async Task<IActionResult> Login([FromBody] AccountModel accountModel)
        {
            var account = await _accountService.GetAccountByLoginAsync(accountModel.Login);
            if (account == null)
            {
                return Unauthorized();
            }
            var hashPassword = _cryptoOptions.GenerateHashPassword(accountModel.Password, Convert.FromBase64String(account.Salt));
            if (Convert.ToBase64String(hashPassword) == account.HashPassword)
            {
                var tokens = _jwtOptions.GetJwtTokens(account.Login);
                account.Tokens = tokens;
                await _accountService.UpdateAsync(account.Id, account);
                var loginedAccount = _mapper.Map<AccountModel>(account);
                return Ok(loginedAccount);
            }
            else
            {
                return Unauthorized();
            }
        }

        [HttpPut("RefreshTokens/{refreshToken}")]
        public async Task<IActionResult> RefreshTokens(string refreshToken)
        {
            var login = _jwtOptions.GetLoginFromJwtToken(refreshToken);
            var account = await _accountService.GetAccountByLoginAsync(login);
            if (account?.Tokens.RefreshToken == refreshToken)
            {
                var tokens = _jwtOptions.GetJwtTokens(login);
                account.Tokens = tokens;
                await _accountService.UpdateAsync(account.Id, account);
                return Ok(account);
            }
            else 
            {
                return Unauthorized();
            }
        }
    }
}