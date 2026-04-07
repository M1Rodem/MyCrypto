using System.ComponentModel.DataAnnotations;

namespace CryptoApi.Models;

public class EncryptRequest
{
    [Required(ErrorMessage = "Text is required")]
    public string Text { get; set; } = string.Empty;

    [Required(ErrorMessage = "Key is required")]
    public string Key { get; set; } = string.Empty;
}