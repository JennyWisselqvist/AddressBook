using Addressbook.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace Addressbook.Models
{
    public class AddressBookContext : DbContext
    {
        public AddressBookContext(DbContextOptions<AddressBookContext> options)
        : base(options)
        { 
        }
        public DbSet<ContactEntity> Contacts { get; set; }
    }
    
}
