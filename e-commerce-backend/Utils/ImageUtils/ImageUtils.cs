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

        public static byte[] SetImageFromFile(string imagePath)
        {
            byte[] imageBytes;

            try
            {
                imageBytes = File.ReadAllBytes(imagePath);
            } catch 
            {
                throw new FileNotFoundException($"File not found: {imagePath}");
            }

            return imageBytes;
        }

        public static  List<byte[]> SetImagesFromFiles(List<string> imagePaths)
        {
            List<byte[]> imageBytesList = new();
            foreach(var imagePath in imagePaths)
            {
                try
                {
                    byte[] imageBytes = File.ReadAllBytes(imagePath);
                    imageBytesList.Add(imageBytes);
                } catch
                {
                    throw new FileNotFoundException($"File not found: {imagePath}");
                }
            }
            return imageBytesList;
        }

        public static List<byte[]> ConvertBase64ListToBytesList(List<string> base64Strings)
        {
            return base64Strings.Select(ConvertBase64ToBytes).ToList();
        }

        public static List<string> ConvertBytesListToBase64List(List<byte[]> imageBytesList)
        {
            return imageBytesList.Select(ConvertBytesToBase64).ToList();
        }
    }
}