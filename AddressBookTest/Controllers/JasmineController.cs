using System;
using System.Web.Mvc;

namespace AddressBookTest.Controllers
{
    public class JasmineController : Controller
    {
        public ViewResult Run()
        {
            return View("SpecRunner");
        }
    }
}
