﻿using System.Web.Optimization;
using System.Web.Optimization.React;

namespace AddressBookJsTests
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
           bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                       "~/Scripts/jquery-{version}.js"));
           
           bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                       "~/Scripts/jquery.validate*"));
           
           // Use the development version of Modernizr to develop with and learn from. Then, when you're
           // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
           bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                       "~/Scripts/modernizr-*"));
           
           bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                     "~/Scripts/bootstrap.js",
                     "~/Scripts/respond.js"));
           
           bundles.Add(new StyleBundle("~/Content/css").Include(
                     "~/Content/bootstrap.css",
                     "~/Content/site.css"));

            bundles.Add(new BabelBundle("~/bundles/react").IncludeDirectory("~/Scripts/dependencies/jsx/","*jsx").Include("~/Scripts/tests/ContactBox-specs.js"));
                // Add your JSX files here
                //"~/app/*.jsx"
                //"~/app/ContactBox.jsx",
                //"~/app/ContactList.jsx",
                //"~/app/CommentForm.jsx",
                //"~/app/app.jsx"
                //));
        }
    }
}
