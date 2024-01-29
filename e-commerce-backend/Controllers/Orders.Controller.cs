using AutoMapper;
using e_commerce_backend.Models.Backend;
using e_commerce_backend.Models.Frontend;
using e_commerce_backend.Services.AccountService;
using e_commerce_backend.Services.OrderService;
using Microsoft.AspNetCore.Mvc;

namespace e_commerce_backend.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IAccountService _accountService;
        private readonly ILogger<OrdersController> _logger;
        private readonly IMapper _mapper;

        public OrdersController(
            ILogger<OrdersController> logger,
            IMapper mapper,
            IOrderService orderService,
            IAccountService accountService)
        {
            _logger = logger;
            _mapper = mapper;
            _orderService = orderService;
            _accountService = accountService;
        }

        [HttpPost("AddOrder")]
        public async Task<IActionResult> AddOrder([FromBody] OrderModel orderModel)
        {
            orderModel.Id = Guid.NewGuid().ToString();
            var order = _mapper.Map<Order>(orderModel);
            await _orderService.CreateAsync(order);
            return Ok(orderModel);
        }


        [HttpGet("GetOrders")]
        public async Task<List<OrderModel>> GetOrders()
        {
            var orders = await _orderService.GetAllAsync();
            var orderModels = _mapper.Map<List<OrderModel>>(orders);
            return orderModels;
        }

        [HttpGet("GetOrdersWithId/{accountId}")]
        public async Task<List<OrderModel>> GetOrdersWithId(Guid accountId)
        {
            var orders = await _orderService.GetAllAsync();
            var account = await _accountService.GetAsync(accountId);
            var accountOrders = account.AccountData.Orders;
            var filteredOrders = orders.Where(order => accountOrders.Contains(order.Id.ToString())).ToList();
            var orderModels = _mapper.Map<List<OrderModel>>(filteredOrders);
            return orderModels;
        }

        [HttpPut("EditStatus")]
        public async Task<IActionResult> EditProduct([FromBody] OrderModel orderModel)
        {
            var order = _mapper.Map<Order>(orderModel);
            await _orderService.UpdateAsync(order.Id, order);
            return Ok(orderModel);
        }
    }
}