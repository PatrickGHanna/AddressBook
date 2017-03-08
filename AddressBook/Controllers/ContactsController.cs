using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
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
        private static readonly ConcurrentDictionary<long, Contact> DataDict =
            new ConcurrentDictionary<long, Contact>(Contact.SeedData().ToDictionary(x => x.Id));

        //obviously not a scalable solution, but since new id generation would usually be handled by the db I will use this as a filler
        private long _newId = DataDict.IsEmpty ? 1 : DataDict.Last().Key;


        // GET: api/Comments
        public IEnumerable<Contact> Get()
        {
            return DataDict.Values;
        }

        // GET: api/Comments/5
        public IHttpActionResult Get(long id)
        {
            Contact value = null;
            return DataDict.TryGetValue(id, out value) ? (IHttpActionResult) Ok(value) : NotFound();
        }

        // POST: api/Comments
        public IHttpActionResult Post([FromBody] Contact value)
        {
            //stupid I know, but works for demo purposes
            value.Id = ++_newId;

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (DataDict.TryAdd(value.Id, value))
                return Ok(DataDict.Values);

            return Conflict();
        }

        // PUT: api/Comments/5
        public IHttpActionResult Put(int id, [FromBody] Contact value)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Contact origValue = null;
            return DataDict.TryGetValue(id, out origValue) && DataDict.TryUpdate(value.Id, value, origValue)
                ? (IHttpActionResult) Ok(DataDict.Values)
                : NotFound();
        }

        // DELETE: api/Comments/5
        public IHttpActionResult Delete(int id)
        {
            Contact value = null;
            return DataDict.TryRemove(id, out value)
                ? (IHttpActionResult) Ok(DataDict.Values)
                : NotFound();
        }
    }
}