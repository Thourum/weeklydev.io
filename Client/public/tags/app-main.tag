<app-main>

<app-navi links="{ links }"></app-navi>

<div class="row">
  <div class="large-12 columns text-center">
    <article>
      <h1>{ title }</h1>
      <p>{ body }</p>
      <ul if={ isFirst }>
        <li each={ data }><a href="#first/{ id }">{ title }</a></li>
      </ul>
    </article>
  </div>
</div>

<script>
  var self = this
  self.title = 'Now loading...'
  self.body = ''
  self.data = [
    { id: 'apple', title: 'Apple', body: "The world biggest fruit company." },
    { id: 'orange', title: 'Orange', body: "I don't have the word for it..." }
  ]
  self.links = [
    { name: "Home", url: "" },
    { name: "First", url: "first" },
    { name: "Second", url: "second" }
  ]

  var r = riot.route.create()
  r('/', home)
  r('first', first)
  r('first/*', firstDetail)
  r('second', second)
  r(home) // routes everything else to home.

  function home() {
    self.update({
      title:  "Home of the great app",
      body:  "Timeline or dashboard as you like!",
      isFirst: false
    })
  }
  function first() {
    self.update({
      title: "First feature of your app",
      body: "It could be a list of something for example.",
      isFirst: true
    })
  }
  function firstDetail(id) {
    var selected = self.data.filter(function(d) { return d.id == id })[0] || {}
    self.update({
      title: selected.title,
      body: selected.body,
      isFirst: false
    })
  }
  function second() {
    self.update({
      title: "Second feature of your app",
      body: "It could be a config page for example.",
      isFirst: false
    })
  }
</script>

</app-main>
