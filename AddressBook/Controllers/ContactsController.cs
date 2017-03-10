using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Results;
using AddressBook.Models;
using Microsoft.Ajax.Utilities;

namespace AddressBook.Controllers
{
    [RoutePrefix("api/contacts")]
    public class ContactsController : ApiController
    {
        //static to keep its state between requests. we use a concurrent dictionary in case we have multiple instances of the app working on the data at a time
        internal static ConcurrentDictionary<long, Contact> _dataDict =
            new ConcurrentDictionary<long, Contact>(Contact.SeedData().ToDictionary(c => c.Id));

        internal static void SetData(ConcurrentDictionary<long, Contact> newData)
        {
            _dataDict = newData;
        }

        private OkNegotiatedContentResult<List<Contact>> GetOkOrderedResult()
        {
            return Ok(_dataDict.Values.OrderBy(c => c.FirstName).ToList());
        }

        // GET: api/Comments
        public List<Contact> Get()
        {
            return _dataDict.OrderBy(c => c.Value.FirstName).Select(c => c.Value).ToList();
        }

        // POST: api/Comments
        public IHttpActionResult Post([FromBody] Contact value)
        {
            //stupid I know, but works for demo purposes
            value.Id = _dataDict.IsEmpty ? 1 : _dataDict.Last().Key + 1;

            if (!value.IsValid)
            {
                return BadRequest("Contact was invalid");
            }

            if (_dataDict.TryAdd(value.Id, value))
                return GetOkOrderedResult();

            return Conflict();
        }

        // PUT: api/Comments/5
        public IHttpActionResult Put(long id, [FromBody] Contact value)
        {
            if (!value.IsValid)
            {
                return BadRequest("Contact was invalid");
            }

            Contact origValue = null;
            return _dataDict.TryGetValue(id, out origValue) && _dataDict.TryUpdate(value.Id, value, origValue)
                ? (IHttpActionResult) GetOkOrderedResult()
                : NotFound();
        }

        // DELETE: api/Comments/5
        public IHttpActionResult Delete(long id)
        {
            Contact value = null;
            return _dataDict.TryRemove(id, out value)
                ? (IHttpActionResult) GetOkOrderedResult()
                : NotFound();
        }
    }
}