using e_commerce_backend.Models.Backend;
using e_commerce_backend.Repository.OrderRepository;
using e_commerce_backend.Services.OrderService;

namespace e_commerce_backend.Services.ProductService
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(
            IOrderRepository orderRepository
        )
        {
            _orderRepository = orderRepository;
        }

        public async Task<IList<Order>> GetAllAsync() =>
            await _orderRepository.GetAllAsync();

        public async Task<Order> GetAsync(Guid id) =>
            await _orderRepository.GetAsync(id);

        public async Task DeleteAsync(Guid id) =>
             await _orderRepository.DeleteAsync(id);

        public async Task UpdateAsync(Guid id, Order item) =>
            await _orderRepository.UpdateAsync(id, item);

        public async Task CreateAsync(Order item) =>
            await _orderRepository.CreateAsync(item);
    }
}