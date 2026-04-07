namespace CryptoApi.Services;

public class CustomCryptoService
{
    private int GenerateSeed(string key)
    {
        int seed = 0;
        foreach (char c in key)
        {
            seed = (seed * 31 + c) % int.MaxValue;
        }
        return seed;
    }
    private int NextRandom(ref int seed)
    {
        seed = (seed * 1103515245 + 12345) & int.MaxValue;
        return seed;
    }

    public byte[] Transform(byte[] data, string key)
    {
        byte[] result = new byte[data.Length];
        Array.Copy(data, result, data.Length);

        int seed = GenerateSeed(key);

        for (int i = 0; i < result.Length; i++)
        {
            int rnd = NextRandom(ref seed);
            result[i] ^= (byte)(rnd % 256);
        }

        seed = GenerateSeed(key);
        for (int i = 0; i < result.Length; i++)
        {
            int rnd = NextRandom(ref seed);
            result[i] = (byte)((result[i] + (rnd % 17)) % 256);
        }

        result = ShuffleBlocks(result);

        return result;
    }

    public byte[] ReverseTransform(byte[] data, string key)
    {
        byte[] result = new byte[data.Length];
        Array.Copy(data, result, data.Length);

        result = UnshuffleBlocks(result);

        int seed = GenerateSeed(key);
        for (int i = 0; i < result.Length; i++)
        {
            int rnd = NextRandom(ref seed);
            result[i] = (byte)((256 + result[i] - (rnd % 17)) % 256);
        }

        seed = GenerateSeed(key);
        for (int i = 0; i < result.Length; i++)
        {
            int rnd = NextRandom(ref seed);
            result[i] ^= (byte)(rnd % 256);
        }

        return result;
    }

    private byte[] ShuffleBlocks(byte[] data)
    {
        byte[] result = new byte[data.Length];
        Array.Copy(data, result, data.Length);

        int blockSize = 4;
        for (int i = 0; i < result.Length; i += blockSize)
        {
            int length = Math.Min(blockSize, result.Length - i);
            Array.Reverse(result, i, length);
        }

        return result;
    }

    private byte[] UnshuffleBlocks(byte[] data)
    {
        return ShuffleBlocks(data);
    }
}