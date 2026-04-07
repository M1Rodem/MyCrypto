using CryptoApi.Models;
using CryptoApi.Services;
using CryptoApi.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CryptoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CryptoController : ControllerBase
{
    private readonly ICryptoService _cryptoService;

    public CryptoController(ICryptoService cryptoService)
    {
        _cryptoService = cryptoService;
    }

    [HttpPost("encrypt")]
    public IActionResult Encrypt([FromBody] EncryptRequest request)
    {
        try
        {
            var key = request.Key;

            if (string.IsNullOrWhiteSpace(key))
            {
                if (!Request.Cookies.TryGetValue("crypto_key", out key))
                    return BadRequest(new { error = "Key is required" });
            }

            request.Key = key;

            var result = _cryptoService.Encrypt(request);

            Response.Cookies.Append("crypto_key", request.Key, new CookieOptions
            {
                HttpOnly = false,  // ← ИЗМЕНИТЕ НА false, чтобы JS мог читать
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddMinutes(30),
                Domain = "185.250.46.70",
                Path = "/"
            });

            return Ok(new
            {
                success = true,
                encrypted = result.Result
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }

    [HttpPost("decrypt")]
    public IActionResult Decrypt([FromBody] DecryptRequest request)
    {
        try
        {
            var key = request.Key;

            if (string.IsNullOrWhiteSpace(key))
            {
                if (!Request.Cookies.TryGetValue("crypto_key", out key))
                    return BadRequest(new { error = "Key is required" });
            }

            request.Key = key;

            var result = _cryptoService.Decrypt(request);

            Response.Cookies.Append("crypto_key", request.Key, new CookieOptions
            {
                HttpOnly = false,  // ← ИЗМЕНИТЕ НА false
                Secure = false,
                SameSite = SameSiteMode.Lax,
                Expires = DateTimeOffset.UtcNow.AddMinutes(30),
                Domain = "185.250.46.70",
                Path = "/"
            });

            return Ok(new
            {
                success = true,
                decrypted = result
            });
        }
        catch (Exception ex)
        {
            return BadRequest(new { error = ex.Message });
        }
    }
[HttpGet("generate-key")]
public IActionResult GenerateKey()
{
    var key = CryptoUtils.GenerateRandomKey();

    // ИСПРАВЛЕНО: crypto_session_key вместо crypto_key
    Response.Cookies.Append("crypto_session_key", key, new CookieOptions
    {
        HttpOnly = false,
        Secure = false,
        SameSite = SameSiteMode.Lax,
        Expires = DateTimeOffset.UtcNow.AddMinutes(30),
        Domain = "185.250.46.70",
        Path = "/"
    });

    return Ok(new { success = true, key = key });
}
}
