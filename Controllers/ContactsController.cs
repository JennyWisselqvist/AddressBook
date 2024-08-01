using Addressbook.Models;
using Addressbook.Models.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Addressbook.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactsController : Controller
    {
        private readonly AddressBookContext _context;
        private readonly IMapper _mapper;
        public ContactsController(AddressBookContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            var contacts = await _context.Contacts.ToListAsync();
            return Ok(contacts);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }
            return Ok(contact);
        }

        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] ContactInformation contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var contactEntity = new ContactEntity
            {
                Id = 0, 
                Name = contact.Name,
                LastName = contact.LastName,
                Email = contact.Email,
                Phone = contact.Phone,
                Address = contact.Address,
                City = contact.City
            };

            _context.Contacts.Add(contactEntity);
            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] ContactInformation contact)
        {
            if (id != contact.Id)
            {
                return BadRequest();
            }

            var contactEntity = await _context.Contacts.FindAsync(id);
            if (contactEntity == null)
            {
                return NotFound();
            }

            _mapper.Map(contact, contactEntity);

            _context.Entry(contactEntity).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}