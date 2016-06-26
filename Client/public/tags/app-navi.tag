<app-navi>
<nav class="main">
  <div class="row">
    <div class="medium-6 columns text-center medium-text-left">
      <a href="/#{ links[0].url }">Logo</a>
    </div>
    <div class="medium-6 columns text-center medium-text-right">
    <ul>
      <li each={ links }>
        <a href="/{ url }" class={ selected: parent.selectedId === url }>{ name }</a>
      </li>
    </div>
  </div>
</nav>
  
<script>
  var self = this
  self.links = opts.links;

  var r = riot.route.create()
  r(highlightCurrent)

  function highlightCurrent(id) 
  {      
    self.selectedId = id
    self.update()
  }
</script>

<style scoped>
</style>

</app-navi>