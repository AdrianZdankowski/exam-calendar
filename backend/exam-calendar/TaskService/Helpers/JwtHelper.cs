using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace TaskService.Helpers
{
    public class JwtHelper
    {
        public static int? ExtractUserIdFromJwt(string jwtToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var decodedToken = handler.ReadJwtToken(jwtToken);

            var userId = decodedToken.Claims
                .FirstOrDefault(claim => claim.Type == ClaimTypes.NameIdentifier)?.Value;

            if (userId == null) return null;

            return int.Parse(userId);
        }
    }
}
