<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  import { SidebarStore } from "$lib/stores/sidebar.store";

  import {
    IconCode,
    IconHelp,
    IconHome,
    IconLock,
    IconLogout,
    IconMessage,
    IconTicket,
    IconUser,
    IconUsersGroup,
    IconWallpaper,
  } from "@tabler/icons-svelte";

  import MenuLogo from "./MenuLogo.svelte";

  $: isActive = (p) => {
    if ($page.url.pathname === p) return true;

    return p !== "/" && String($page.url.pathname).startsWith(p);
  };

  const onClick = () => {
    SidebarStore.update((v) => {
      return {
        open: !v.open,
      };
    });
  };
</script>

<MenuLogo />

<ul class="nav">
  <li>
    <a
      on:click={onClick}
      href="/dashboard"
      class:active={isActive("/dashboard")}
    >
      <IconHome size={16} />
      Dashboard</a
    >
  </li>
  <li>
    <a on:click={onClick} href="/widgets" class:active={isActive("/widgets")}>
      <IconWallpaper size={16} />
      Widgets</a
    >
  </li>
  <!-- <li>
    <a on:click={onClick} href="/chats" class:active={isActive("/chats")}>
      <IconMessage size={16} />
      <div class="flex-1">Live Chats</div>
      <div class="badge badge-error badge-sm text-white">5</div>
    </a>
  </li>
  <li>
    <a on:click={onClick} href="/tickets" class:active={isActive("/tickets")}>
      <IconHelp size={16} />
      Tickets</a
    >
  </li> -->
  <!-- <li>
    <a on:click={onClick} href="/widgets" class:active={isActive("/widgets")}>
      <IconWallpaper size={16} />
      Widgets</a
    >
  </li> -->
  <!-- <li>
    <a on:click={onClick} href="/groups" class:active={isActive("/groups")}>
      <IconUsersGroup size={16} />
      Groups</a
    >
  </li>
  <li>
    <a on:click={onClick} href="/users" class:active={isActive("/users")}>
      <IconUser size={16} />
      Users</a
    >
  </li>
  <li>
    <a on:click={onClick} href="/account" class:active={isActive("/account")}>
      <IconLock size={16} />
      Account</a
    >
  </li> -->
  <li>
    <a
      on:click={onClick}
      href="/auth/logout"
      class:active={isActive("/auth/logout")}
    >
      <IconLogout size={16} />
      Logout</a
    >
  </li>
</ul>

<style lang="postcss">
  .nav {
    @apply list-none flex flex-col;
  }
  .nav li {
    @apply flex items-center justify-start w-full;
  }
  .nav li a {
    @apply flex items-center justify-start gap-2 text-sm w-full px-4 py-2.5 text-gray-200;
  }

  .nav li a.active {
    @apply bg-primary text-white;
  }

  .nav li a:not(.active):hover {
    @apply bg-gray-800 text-white;
  }
  .nav li.title {
    @apply uppercase text-gray-400 px-4 py-1 bg-gray-800;
    font-size: 0.65rem;
    letter-spacing: 2px;
  }
</style>
