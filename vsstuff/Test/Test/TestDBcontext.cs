using Microsoft.EntityFrameworkCore;

namespace Test
{
    public class TestDBcontext : DbContext
    {
        public TestDBcontext()
        {
        }

        public TestDBcontext(DbContextOptions<TestDBcontext> options)
            : base(options)
        {
        }

        public DbSet<Image> Images { get; set; }
    }
}
