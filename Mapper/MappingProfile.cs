using Addressbook.Models.Entities;
using Addressbook.Models;
using AutoMapper;

namespace Addressbook.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ContactInformation, ContactEntity>();
            CreateMap<ContactEntity, ContactInformation>();
        }
    }
}
