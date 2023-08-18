using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthService.Migrations
{
    /// <inheritdoc />
    public partial class Ajustarhashdasenha : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Password",
                value: "Wun5cxwA59NNaGw9+AwltBdKyAd5Zaqrq4bfSk12qquUbOoMLCFTKU2ApkHBhgEHhyREW8KVs8aDJRKMJDjMPychwJLSL+g6BT7CcCVCxgNn4JWoHauvM9z1M2k6dkE72gTHoUMbAKtRPGsMJnotH7KT0KZhCR8ZHzp+z7VxGpjatf5m934b1Haw3IYoetClUWkH3zH03GTHGblcoyyEKqfYO9x8acoteKQ85/l3Fymgd2UQ74RIMLrERIrY+bpiZHoC5yTThMkmyjHWpaYpnAqvSZZeNQVjAw/MS0/AcJaAwbr+0FwaPtQbS6fAVOHjzW35jQFurPUuTMF12nNUzna2T7KA7YCnPPYhWL7o7cLDRcwsXI5+X3ll9ENS1GATKCXkVimu4W7V22jUS7HRKe9HfAbLDSb2EmtD6VeWb1A=");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Password",
                value: "D898LVAi78m3UDDxMwlo7rJQD7HIh9/W588CiBSTSozzddSs5PFEPb44hFEdbOyAQiNB1hk4LZe6LsO0N91nQXdFYddp7l3Uw754KniUfF+n7PjuQiEWA4PrGAmTzwCi6UCPF+IQdFvj45VGre4Yx97XnBaDdJmrW/9nNwib6zyY1Kq5H6XF7u13WSnhCidPrqCn5+fjQwWHxeWQNaPovjYLsmLnhDIsYe0wVv86L14h9zieVEfo0RTU3k0I/V+P34+Vo9Xry/dsMM9wqil+8OnNU99nqi8xKBEAPUDNJDbxy+/5+anMfFmVv4HG7+ZSmxg61/U/0nz3wl0jm+B+txDvAYH3fbs4MqEgFDebotvSlINXDaCKv9rZO9wxlxJn2jd21ahTDeRDhnogsg+3RoLs8cIdakjspVeElG6qtLQ=");
        }
    }
}
