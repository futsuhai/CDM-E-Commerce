namespace e_commerce_backend.Models.Backend
{
    public class OrderInfo
    {
        public required string OrderCity { get; set; }
        public required string OrderStreet { get; set; }
        public required string OrderHouse { get; set; }
        public required string OrderFlat { get; set; }
        public required DateTime OrderDate { get; set; }
        public required string OrderPhone { get; set; }
        public required string OrderTime { get; set; }
    }
}