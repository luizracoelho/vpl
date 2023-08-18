using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthService.Migrations
{
    /// <inheritdoc />
    public partial class Changedefaultuserpassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1L,
                column: "Password",
                value: "CTUsd8zLybZuAyNWBTLEa6EKM4XpZtRPH77DscmRhOYcui9+fbdf/pu3pZJA1bbKiMn1r+SxLorPh24+LxtLVKcNyTFGtsypvR27SJE6sDJrVXTMLcc8rqe7eZwvQLDwlrLRTsS6UV3C33HLv6jd5FSDc+xQPno/aHUtOQdlit2UXF82o1nKitVQ7Uzm5IcECqdZTWTj0CyZLs9xIgJZO1Jipesj+LhaTk7G3MMFjg6JIs0mmuI2BSrqtxg5BUDdY+l8zRqqu4ECsuP57G1VR1HF2U1x7MiRmo4f2q3aBd1P9NaVHF21+JehDGQCRIjOAu+SY0Q7sl42q71TWpDbndEpqVE/MMqciDefbbyDqfub4QfrykjQqib6RezwTyIGUQrRV9c/+j2xlPZ5Yu+tiBbTmk0fJuxUNjiRX90dINo=");
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
