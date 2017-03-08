#region licence

// =====================================================
// Under the MIT License (MIT)
// Originally written by Jon Smith : GitHub JonPSmith, www.thereformedprogrammer.net
// Modified for personal use by Patrick Hanna 2017/3/4
// =====================================================

#endregion

using System.Collections.Generic;

namespace AddressBook.Models
{
    public class Contact
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public string FullName => FirstName + " " + LastName;


        public static IEnumerable<Contact> SeedData()
        {
            long i = 0;
            return new List<Contact>
            {
                new Contact
                {
                    Id = ++i,
                    FirstName = "Patrick",
                    LastName = "Hanna",
                    Phone = "952-334-9342",
                    Email = "Patrick.Gene.Hanna@gmail.com"
                },
                new Contact
                {
                    Id = ++i,
                    FirstName = "Matt",
                    LastName = "Smith",
                    Phone = "801-555-0077",
                    Email = "Matt.Smith@gmail.com"
                }
                
            };
        }
    }
}