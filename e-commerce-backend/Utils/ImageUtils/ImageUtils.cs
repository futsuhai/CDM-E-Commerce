namespace e_commerce_backend.Utils.ImageUtils
{
    public class ImageUtils
    {
        public static byte[] ConvertBase64ToBytes(string base64String)
        {
            base64String = base64String[(base64String.IndexOf(',') + 1)..];
            byte[] imageBytes = Convert.FromBase64String(base64String);
            return imageBytes;
        }


        public static string ConvertBytesToBase64(byte[] imageBytes)
        {
            string base64String = Convert.ToBase64String(imageBytes);
            return "data:image/png;base64," + base64String;
        }

    }
}