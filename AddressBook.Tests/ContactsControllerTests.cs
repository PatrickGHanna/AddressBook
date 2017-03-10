﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using AddressBook.Controllers;
using AddressBook.Models;
using NUnit.Framework;

namespace AddressBook.Tests
{
    [TestFixture]
    public class ContactsControllerTests
    {
        private ContactsController _controller;
        private ConcurrentDictionary<long, Contact> _data;

        public ContactsControllerTests()
        {
            _controller = new ContactsController();
            _data = new ConcurrentDictionary<long, Contact>();
        }

        [SetUp]
        public void Init()
        {
            var list = new List<Contact>
            {
                new Contact
                {
                    Id = 1,
                    FirstName = "Patrick",
                    LastName = "Hanna",
                    Phone = "952-334-9342",
                    Email = "Patrick.Gene.Hanna@gmail.com"
                },
                new Contact
                {
                    Id = 2,
                    FirstName = "Matt",
                    LastName = "Smith",
                    Phone = "801-555-0077",
                    Email = "Matt.Smith@gmail.com"
                }
            };
            _data =
                new ConcurrentDictionary<long, Contact>(list.ToDictionary(x => x.Id));
            _controller = new ContactsController(_data)
            {
                Request = new HttpRequestMessage(),
                Configuration = new HttpConfiguration()
            };
        }

        [Test]
        public void GetReturnsExpectedDataDict()
        {
            var response = _controller.Get().ToArray();

            Assert.IsTrue(response.Count() == _data.Count);

            for (var i = 0; i < response.Count(); i++)
            {
                Assert.AreEqual(_data.Values.ToArray()[i], response[i]);
            }
        }

        [Test]
        public void PostAddsAndReturnsExpectedDataDict()
        {
            var newContact = new Contact
            {
                Id = 0,
                FirstName = "NEW",
                LastName = "CONTACT",
                Phone = "123-456-7890",
                Email = "TEST@Gmail.com"
            };
            var expectedData = _data.Values.Concat(new[] {newContact}).ToArray()
                ;
            var response = _controller.Post(newContact);

            Assert.IsInstanceOf<OkNegotiatedContentResult<ICollection<Contact>>>(response);

            var okResponse = response as OkNegotiatedContentResult<ICollection<Contact>>;

            // ReSharper disable once PossibleNullReferenceException
            var responseData = okResponse.Content.ToArray();

            Assert.IsTrue(responseData.Length == expectedData.Length);

            for (var i = 0; i < responseData.Length; i++)
            {
                Assert.AreEqual(expectedData[i], responseData[i]);
            }
        }

        [Test]
        public void PutUpdatesContactAndReturnsExpectedDataDict()
        {
            var updatedContact = new Contact
            {
                FirstName = "NEW",
                LastName = "CONTACT",
                Phone = "123-456-7890",
                Email = "TEST@Gmail.com"
            };
            var keyToUpdate = _data.Keys.Last();
            Contact origValue = null;
            Assert.IsTrue(_data.TryGetValue(keyToUpdate, out origValue));
            updatedContact.Id = origValue.Id;
            Assert.IsTrue(_data.TryUpdate(keyToUpdate, updatedContact, origValue));

            var response = _controller.Put(keyToUpdate, updatedContact);
            Assert.IsInstanceOf<OkNegotiatedContentResult<ICollection<Contact>>>(response);
            var okResponse = response as OkNegotiatedContentResult<ICollection<Contact>>;

            // ReSharper disable once PossibleNullReferenceException
            var responseData = okResponse.Content.ToArray();

            Assert.IsTrue(responseData.Length == _data.Count);

            for (var i = 0; i < responseData.Length; i++)
            {
                Assert.AreEqual(_data.Values.ToArray()[i], responseData[i]);
            }
        }

        [Test]
        public void DeleteRemovesContactAndReturnsExpectedDataDict()
        {
            
            var keyToRemove = _data.Keys.Last();
            Contact origValue = null;
            var expectedData = _data.Where(c => c.Key != keyToRemove).Select(k => k.Value).ToArray();

            var response = _controller.Delete(keyToRemove);
            Assert.IsInstanceOf<OkNegotiatedContentResult<ICollection<Contact>>>(response);
            var okResponse = response as OkNegotiatedContentResult<ICollection<Contact>>;

            // ReSharper disable once PossibleNullReferenceException
            var responseData = okResponse.Content.ToArray();

            Assert.IsTrue(responseData.Length == expectedData.Length);

            for (var i = 0; i < responseData.Length; i++)
            {
                Assert.AreEqual(expectedData.ToArray()[i], responseData[i]);
            }
        }
    }
}