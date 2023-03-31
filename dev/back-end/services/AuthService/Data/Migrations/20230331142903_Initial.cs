using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthService.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "Name", "Password" },
                values: new object[] { 1L, "contato@vpl.com.br", "Contato", "D898LVAi78m3UDDxMwlo7rJQD7HIh9/W588CiBSTSozzddSs5PFEPb44hFEdbOyAQiNB1hk4LZe6LsO0N91nQXdFYddp7l3Uw754KniUfF+n7PjuQiEWA4PrGAmTzwCi6UCPF+IQdFvj45VGre4Yx97XnBaDdJmrW/9nNwib6zyY1Kq5H6XF7u13WSnhCidPrqCn5+fjQwWHxeWQNaPovjYLsmLnhDIsYe0wVv86L14h9zieVEfo0RTU3k0I/V+P34+Vo9Xry/dsMM9wqil+8OnNU99nqi8xKBEAPUDNJDbxy+/5+anMfFmVv4HG7+ZSmxg61/U/0nz3wl0jm+B+txDvAYH3fbs4MqEgFDebotvSlINXDaCKv9rZO9wxlxJn2jd21ahTDeRDhnogsg+3RoLs8cIdakjspVeElG6qtLQ=" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
