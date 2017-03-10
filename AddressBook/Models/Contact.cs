#region licence

// =====================================================
// Under the MIT License (MIT)
// Originally Comment.cs
// Originally written by Jon Smith : GitHub JonPSmith, www.thereformedprogrammer.net
// Modified for personal use by Patrick Hanna 2017/3/4
// =====================================================

#endregion

using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Text.RegularExpressions;
using Microsoft.Ajax.Utilities;

namespace AddressBook.Models
{
    public class Contact
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }

        public bool IsValid
        {
            get
            {
                var firstNameIsValid = !FirstName.IsNullOrWhiteSpace();
                var lastNameIsValid = !LastName.IsNullOrWhiteSpace();
                var phoneIsValid = Phone.IsNullOrWhiteSpace() ||
                                   Regex.Match(Phone, @"\(?\d{3}\)?-? *\d{3}-? *-?\d{4}").Success;
                var emailIsValid = Email.IsNullOrWhiteSpace() || IsValidEmail(Email);

                return firstNameIsValid && lastNameIsValid && phoneIsValid && emailIsValid;
            }
        }

        private bool IsValidEmail(string emailaddress)
        {
            try
            {
                MailAddress m = new MailAddress(emailaddress);

                return true;
            }
            catch (FormatException)
            {
                return false;
            }
        }


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