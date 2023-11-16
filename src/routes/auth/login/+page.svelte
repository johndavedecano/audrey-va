<script>
  // @ts-nocheck

  import { goto } from "$app/navigation";
  import { auth } from "$lib/firebase";

  import { isValidEmail, isValidPassword } from "$lib/string";

  import {
    sendEmailVerification,
    signInWithEmailAndPassword,
  } from "firebase/auth";

  import axios from "axios";

  let loading = false;

  let fields = {
    email: "",
    password: "",
  };

  let verify = false;

  let currentUser;

  const onVerify = async () => {
    try {
      if (currentUser) {
        await sendEmailVerification(auth, currentUser);
        alert("email verification has been sent");
      }
    } catch (error) {
      alert(error.message);
    }
    auth.signOut();
    currentUser = null;
    verify = false;
  };

  const onSubmit = async () => {
    try {
      if (!isValidEmail(fields.email)) return alert("invalid email address");

      if (!isValidPassword(fields.password)) return alert("invalid password");

      loading = true;

      const userCredential = await signInWithEmailAndPassword(
        auth,
        fields.email,
        fields.password
      );

      currentUser = userCredential.user;

      if (!currentUser.emailVerified) {
        alert("Your account yet is not yet verified");
        verify = true;
        return;
      }

      const idToken = await currentUser.getIdToken();

      await axios.post("/auth/login", {
        idToken,
      });

      loading = false;

      goto("/dashboard");
    } catch (error) {
      console.error(error);
      loading = false;
      auth.signOut();
      console.log(error.message);
      if (error.response & error.response.data) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };
</script>

<div class="login">
  <div class="card shadow-none lg:shadow-xl w-full">
    <div class="card-body">
      <div class="mb-4">
        <h2 class="card-title">Welcome to Audrey VA</h2>
        <p class="text-gray-400">Please use the form below to get started</p>
      </div>
      <form action="" on:submit|preventDefault={onSubmit}>
        <div class="flex flex-col gap-2 w-full mb-4">
          <label for="email">
            <span class="label-text">Email Address:</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            class="input input-bordered w-full"
            bind:value={fields.email}
          />
        </div>

        <div class="flex flex-col gap-2 w-full mb-2">
          <label for="email">
            <span class="label-text">Password:</span>
          </label>
          <input
            name="password"
            type="password"
            class="input input-bordered w-full"
            bind:value={fields.password}
          />
        </div>

        <div class="text-right mb-4">
          <a href="/auth/forgot" class="text-primary">Forgot Password</a>
        </div>

        <button class="btn btn-primary w-full" type="submit" disabled={loading}
          >Login</button
        >

        {#if verify}
          <button
            on:click={onVerify}
            class="btn btn-success text-white mt-4 w-full"
            disabled={loading}>Send Verification</button
          >
        {/if}
      </form>

      <div class="card-actions">
        <p class="text-center">
          Dont have an account yet? <a
            href="/auth/register"
            class="text-primary">Sign up</a
          >
        </p>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  .login {
    @apply mx-4;
    width: 500px;
    max-width: 100%;
  }
</style>
