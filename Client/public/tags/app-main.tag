<app-main>

<app-navi links="{ pages }"></app-navi>

<!-- this div is the mount point for our pages -->
<div id="content">Loading...</div>

<script>
  var self = this;

  // This holds all the pages that we'll use for navigation. It hooks into the navigation menu
  // and powers the routing as well.
  self.pages = [
    { name: 'Home', url: '', page: 'home-page' },
    { name: 'Register', url: 'register', page: 'register-page' },
    { name: 'My Profile', url: 'login', page: 'login-page' }
  ];

  // hold our current page
  var currentPage = null;

  function goTo(path)
  {
    // unmount the current page if it exists
    if (currentPage)
    {
      currentPage.unmount(true);
      currentPage = null;
    }

    // loop through pages and route to them if the url matches
    for (var i=0; i<self.pages.length; i++)
    {
      var page = self.pages[i];

      if (path === page.url)
      {
        currentPage = riot.mount('div#content', page.page)[0];
        break;
      }
    }

    // if no page was found, render the home page again
    if (!currentPage)
    {
      currentPage = riot.mount('div#content', 'home-page')[0];
    }
  } // end goTo

  // actually hook in our routing
  riot.route(goTo);
  riot.route.exec(goTo);
</script>

</app-main>
