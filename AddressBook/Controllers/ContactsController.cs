using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Web.Http;
using AddressBook.Models;

namespace AddressBook.Controllers
{
    /// <summary>
    /// TODO: four methods, please place error checking on these
    /// </summary>
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

        // GET: api/Comments
        public IEnumerable<Contact> Get()
        {
            return _dataDict.Values;
        }

        // GET: api/Comments/5
        public IHttpActionResult Get(long id)
        {
            Contact value = null;
            return _dataDict.TryGetValue(id, out value) ? (IHttpActionResult) Ok(value) : NotFound();
        }

        // POST: api/Comments
        public IHttpActionResult Post([FromBody] Contact value)
        {
            //stupid I know, but works for demo purposes
            value.Id = _dataDict.IsEmpty ? 1 : _dataDict.Last().Key + 1;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (_dataDict.TryAdd(value.Id, value))
                return Ok(_dataDict.Values);

            return Conflict();
        }

        // PUT: api/Comments/5
        public IHttpActionResult Put(long id, [FromBody] Contact value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contact origValue = null;
            return _dataDict.TryGetValue(id, out origValue) && _dataDict.TryUpdate(value.Id, value, origValue)
                ? (IHttpActionResult) Ok(_dataDict.Values)
                : NotFound();
        }

        // DELETE: api/Comments/5
        public IHttpActionResult Delete(long id)
        {
            Contact value = null;
            return _dataDict.TryRemove(id, out value)
                ? (IHttpActionResult) Ok(_dataDict.Values)
                : NotFound();
        }
    }
}