using System.ComponentModel.DataAnnotations;

namespace CryptoApi.Models;

public class DecryptRequest
{
    [Required(ErrorMessage = "Encrypted text is required")]
    public string EncryptedText { get; set; } = string.Empty;

    [Required(ErrorMessage = "Key is required")]
    public string Key { get; set; } = string.Empty;
}