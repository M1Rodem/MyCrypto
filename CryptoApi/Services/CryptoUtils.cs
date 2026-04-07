using System.Security.Cryptography;

namespace CryptoApi.Services;

public static class CryptoUtils
{
    public static byte[] GenerateKey(string password, byte[] salt)
    {
        if (string.IsNullOrWhiteSpace(password))
            throw new ArgumentException("Password cannot be empty");

        if (salt == null || salt.Length < 16)
            throw new ArgumentException("Salt must be at least 16 bytes");

        return Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            1_000_000,
            HashAlgorithmName.SHA512,
            64
        );
    }

    public static byte[] GenerateSalt()
    {
        return RandomNumberGenerator.GetBytes(16);
    }

    public static byte[] GenerateNonce()
    {
        return RandomNumberGenerator.GetBytes(8); 
    }

    public static string GenerateRandomKey()
    {
        var key = RandomNumberGenerator.GetBytes(32);
        return Convert.ToBase64String(key);
    }

    public static byte[] ComputeHmac(byte[] data, byte[] key)
    {
        using var hmac = new HMACSHA256(key);
        return hmac.ComputeHash(data);
    }
}