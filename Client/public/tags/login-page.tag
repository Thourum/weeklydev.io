<login-page>

<div class="row padded">
  <div class="medium-8 medium-centered large-6 large-centered columns">

    <form name="login_form" onsubmit={ login }>
      <div class="row column log-in-form">
        <h4 class="text-center">Log in with your email account</h4>
        <label>Email
          <input name="email" type="text" placeholder="somebody@example.com">
        </label>
        <label>Password
          <input name="password" type="password" placeholder="Password">
        </label>
        <p><button type="submit" class="button expanded">Log In</button></p>
        <p class="text-center"><a href="#register">Don't have an account? Register.</a></p>   
      </div>
    </form>

  </div>
</div>

<script>
  var self = this;

  function validate()
  {
    // validate form inputs here.
  }

  // event listeners

  login(e)
  {
    validate();

    console.log("Logging in with the email " + self.email.value + " and the password " + self.password.value);
  }
</script>

<style scoped>
.log-in-form
{
  padding: 2em 0;
}
</style>

</login-page>