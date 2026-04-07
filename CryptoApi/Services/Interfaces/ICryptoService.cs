using CryptoApi.Models;

namespace CryptoApi.Services.Interfaces;

public interface ICryptoService
{
    EncryptResponse Encrypt(EncryptRequest request);
    string Decrypt(DecryptRequest request);
}