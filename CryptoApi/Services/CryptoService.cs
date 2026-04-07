using System.Text;
using CryptoApi.Models;
using CryptoApi.Services.Interfaces;
using System.Security.Cryptography;

namespace CryptoApi.Services;

public class CryptoService : ICryptoService
{
    private readonly CustomCryptoService _custom;
    private readonly ChaCha20Service _chacha20;

    public CryptoService(CustomCryptoService custom, ChaCha20Service chacha20)
    {
        _custom = custom;
        _chacha20 = chacha20;
    }

    public EncryptResponse Encrypt(EncryptRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Text))
            throw new ArgumentException("Text is required");

        if (string.IsNullOrWhiteSpace(request.Key))
            throw new ArgumentException("Key is required");

        var salt = CryptoUtils.GenerateSalt();
        var nonce = CryptoUtils.GenerateNonce();

        var plainBytes = Encoding.UTF8.GetBytes(request.Text);

        var fullKey = CryptoUtils.GenerateKey(request.Key, salt);

        var encKey = fullKey.Take(32).ToArray();
        var macKey = fullKey.Skip(32).Take(32).ToArray();

        try
        {
            var customEncrypted = _custom.Transform(
                plainBytes,
                Convert.ToBase64String(encKey)
            );

            var finalEncrypted = _chacha20.Encrypt(customEncrypted, encKey, nonce);

            var version = new byte[] { 1 };

            var combined = new byte[1 + salt.Length + nonce.Length + finalEncrypted.Length];

            Buffer.BlockCopy(version, 0, combined, 0, 1);
            Buffer.BlockCopy(salt, 0, combined, 1, salt.Length);
            Buffer.BlockCopy(nonce, 0, combined, 1 + salt.Length, nonce.Length);
            Buffer.BlockCopy(finalEncrypted, 0, combined, 1 + salt.Length + nonce.Length, finalEncrypted.Length);

            var hmac = CryptoUtils.ComputeHmac(combined, macKey);

            var resultBytes = new byte[combined.Length + hmac.Length];

            Buffer.BlockCopy(combined, 0, resultBytes, 0, combined.Length);
            Buffer.BlockCopy(hmac, 0, resultBytes, combined.Length, hmac.Length);

            return new EncryptResponse
            {
                Result = Convert.ToBase64String(resultBytes),
                Algorithm = "Composite v1"
            };
        }
        finally
        {
            CryptographicOperations.ZeroMemory(fullKey);
            CryptographicOperations.ZeroMemory(encKey);
            CryptographicOperations.ZeroMemory(macKey);
        }
    }

    public string Decrypt(DecryptRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.EncryptedText))
            throw new ArgumentException("Encrypted text is required");

        if (string.IsNullOrWhiteSpace(request.Key))
            throw new ArgumentException("Key is required");

        var fullBytes = Convert.FromBase64String(request.EncryptedText);

        if (fullBytes.Length < 1 + 16 + 8 + 32)
            throw new Exception("Invalid data");

        var hmacStart = fullBytes.Length - 32;

        var data = new byte[hmacStart];
        Buffer.BlockCopy(fullBytes, 0, data, 0, hmacStart);

        var receivedHmac = new byte[32];
        Buffer.BlockCopy(fullBytes, hmacStart, receivedHmac, 0, 32);

        var version = data[0];

        if (version != 1)
            throw new Exception($"Unsupported version: {version}");

        var salt = new byte[16];
        Buffer.BlockCopy(data, 1, salt, 0, 16);

        var fullKey = CryptoUtils.GenerateKey(request.Key, salt);

        var encKey = fullKey.Take(32).ToArray();
        var macKey = fullKey.Skip(32).Take(32).ToArray();

        try
        {
            var computedHmac = CryptoUtils.ComputeHmac(data, macKey);

            if (!CryptographicOperations.FixedTimeEquals(receivedHmac, computedHmac))
                throw new Exception("HMAC validation failed");

            var nonce = new byte[8];
            Buffer.BlockCopy(data, 17, nonce, 0, 8);

            var encryptedData = new byte[data.Length - 25];
            Buffer.BlockCopy(data, 25, encryptedData, 0, encryptedData.Length);

            var chachaDecrypted = _chacha20.Decrypt(encryptedData, encKey, nonce);

            var finalDecrypted = _custom.ReverseTransform(
                chachaDecrypted,
                Convert.ToBase64String(encKey)
            );

            return Encoding.UTF8.GetString(finalDecrypted);
        }
        finally
        {
            CryptographicOperations.ZeroMemory(fullKey);
            CryptographicOperations.ZeroMemory(encKey);
            CryptographicOperations.ZeroMemory(macKey);
        }
    }
}