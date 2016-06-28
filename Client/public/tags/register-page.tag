<register-page>

<div class="row padded">
  <div class="medium-8 medium-centered large-6 large-centered columns">

    <form name="registration_form" onsubmit="{ register }" id="register-user">
      <div class="row column register-form">
        <h4 class="text-center">Create an account</h4>
        <label>Email
          <input name="email" type="text" placeholder="somebody@example.com">
        </label>
        <label>Username
          <input name="username" type="test" placeholder="Username">
        </label>
        <label>Password
          <input name="password" type="password" placeholder="Password">
        </label>
        <!--
        <label>Confirm Password
          <input name="password-confirm" type="password" placeholder="Password">
        </label>
        -->
        <p><button class="button expanded">Register</button></p>
        <p class="text-center"><a href="/login">Already have an account? Log in.</a></p>   
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


  register(e)
  {
    validate();

    console.log("Registering user with the email " + self.email.value + " and the password " + self.password.value);
  }


</script>

<style scoped>
.register-form
{
  padding: 2em 0;
}
</style>


</register-page>