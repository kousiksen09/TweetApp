using Microsoft.EntityFrameworkCore.Migrations;

namespace TweetView_ReplyMicroservice.Migrations
{
    public partial class IntialCatalog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TweetReplies",
                columns: table => new
                {
                    ReplyTweetId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ReplyTweetBody = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Likes = table.Column<int>(type: "int", nullable: false),
                    ReplyPostedOn = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ReplyUserId = table.Column<int>(type: "int", nullable: false),
                    TweetId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TweetReplies", x => x.ReplyTweetId);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TweetReplies");
        }
    }
}
