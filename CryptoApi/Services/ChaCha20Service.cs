using Org.BouncyCastle.Crypto.Engines;
using Org.BouncyCastle.Crypto.Parameters;

namespace CryptoApi.Services;

public class ChaCha20Service
{
    public byte[] Encrypt(byte[] data, byte[] key, byte[] nonce)
    {
        if (nonce.Length != 8)
            throw new ArgumentException($"ChaCha20 requires 8 bytes of IV, but got {nonce.Length} bytes");

        var cipher = new ChaChaEngine();
        var parameters = new ParametersWithIV(new KeyParameter(key), nonce);
        cipher.Init(true, parameters);

        var output = new byte[data.Length];
        cipher.ProcessBytes(data, 0, data.Length, output, 0);

        return output;
    }
    public byte[] Decrypt(byte[] data, byte[] key, byte[] nonce)
    {
        if (nonce.Length != 8)
            throw new ArgumentException($"ChaCha20 requires 8 bytes of IV, but got {nonce.Length} bytes");

        var cipher = new ChaChaEngine();
        var parameters = new ParametersWithIV(new KeyParameter(key), nonce);
        cipher.Init(false, parameters);

        var output = new byte[data.Length];
        cipher.ProcessBytes(data, 0, data.Length, output, 0);

        return output;
    }
}