namespace authService.DTO
{
    public class RefreshTokenRequest
    {
        public int Id { get; set; }
        public required string RefreshToken { get; set; }
    }
}
