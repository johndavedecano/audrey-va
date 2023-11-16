<script>
  // @ts-nocheck
  import axios from "axios";
  import { auth } from "$lib/firebase";
  import { sendEmailVerification, signInWithCustomToken } from "firebase/auth";
  import { goto } from "$app/navigation";

  let loading = false;

  let fields = {
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    password: "",
    password_confirmation: "",
    organization: "",
  };

  const onSubmit = async () => {
    try {
      loading = true;

      const response = await axios
        .post("/auth/register", {
          email: fields.email,
          mobile: fields.mobile,
          firstName: fields.firstName,
          lastName: fields.lastName,
          organization: fields.organization,
          password: fields.password,
          password_confirmation: fields.password_confirmation,
        })
        .then((response) => response.data);

      const token = response.data;

      const userCredential = await signInWithCustomToken(auth, token);

      const user = userCredential.user;

      await sendEmailVerification(user);

      alert(
        "registration successful. please check your email " +
          fields.email +
          " to activate your account."
      );

      loading = false;

      auth.signOut();

      goto("/auth/login");
    } catch (error) {
      loading = false;
      console.log(error.message);
      if (error.response & error.response.data) {
        alert(error.response.data.message);
        return;
      }
      alert(error.message);
    }
  };
</script>

<svelte:head>
  <title>Audrey VA - Registration</title>
</svelte:head>

<div class="login">
  <div class="card shadow-none lg:shadow-xl w-full">
    <div class="card-body">
      <div class="mb-4">
        <h2 class="card-title">Welcome to Audrey VA</h2>
        <p class="text-gray-400">
          Please use the form below to create a new account
        </p>
      </div>
      <form method="POST" on:submit|preventDefault={onSubmit}>
        <div class="flex gap-2 w-full mb-4">
          <div class="flex-1">
            <label for="name">
              <span class="label-text">First Name:</span>
            </label>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              class="input input-bordered w-full"
              bind:value={fields.firstName}
              required
            />
          </div>
          <div class="flex-1">
            <label for="name">
              <span class="label-text">Last Name:</span>
            </label>
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              class="input input-bordered w-full"
              bind:value={fields.lastName}
              required
            />
          </div>
        </div>

        <div class="flex flex-col gap-2 w-full mb-4">
          <label for="mobile_number">
            <span class="label-text">Organization:</span>
          </label>
          <input
            type="text"
            name="organization"
            class="input input-bordered w-full"
            required
            bind:value={fields.organization}
          />
        </div>

        <div class="flex flex-col gap-2 w-full mb-4">
          <label for="mobile_number">
            <span class="label-text">Mobile Number:</span>
          </label>
          <input
            type="tel"
            name="mobile"
            class="input input-bordered w-full"
            bind:value={fields.mobile}
            placeholder="09204206656"
            minlength="11"
            maxlength="11"
          />
        </div>

        <div class="flex flex-col gap-2 w-full mb-4">
          <label for="email">
            <span class="label-text">Email Address:</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            class="input input-bordered w-full"
            required
            bind:value={fields.email}
          />
        </div>

        <div class="flex flex-col gap-2 w-full mb-4">
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

        <div class="flex flex-col gap-2 w-full mb-4">
          <label for="email">
            <span class="label-text">Password Confirmation:</span>
          </label>
          <input
            name="password_confirmation"
            type="password"
            class="input input-bordered w-full"
            bind:value={fields.password_confirmation}
          />
        </div>
        <button class="btn btn-primary w-full" type="submit" disabled={loading}>
          Register</button
        >
      </form>

      <div class="card-actions">
        <p class="text-center">
          Already have an account? <a href="/auth/login" class="text-primary"
            >Sign in</a
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
