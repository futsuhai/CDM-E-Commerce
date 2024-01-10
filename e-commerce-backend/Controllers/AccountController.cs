using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Frontend;
using e_commerce_backend.Models.Options;
using e_commerce_backend.Services.AccountService;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/accounts")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _accountService;
        private readonly IMapper _mapper;
        private readonly ILogger<AccountController> _logger;
        private readonly JwtOptions _jwtOptions;

        public AccountController(
            ILogger<AccountController> logger,
            IAccountService accountService,
            IMapper mapper,
            JwtOptions jwtOptions)
        {
            _logger = logger;
            _accountService = accountService;
            _mapper = mapper;
            _jwtOptions = jwtOptions;
        }

        [HttpPut("UpdateAccount")]
        public async Task<IActionResult> UpdateAccount([FromBody] AccountModel accountModel)
        {
            var existingAccount = await _accountService.GetAsync(accountModel.Id);
            if (existingAccount != null)
            {
                _mapper.Map(accountModel, existingAccount);
                existingAccount.Tokens = _jwtOptions.GetJwtTokens(existingAccount.Login);
                await _accountService.UpdateAsync(existingAccount.Id, existingAccount);
                var resultAccount = _mapper.Map<AccountModel>(existingAccount);
                return Ok(resultAccount);
            }
            else
            {
                return NotFound();
            }
        }
    }
}