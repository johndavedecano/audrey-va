<script>
  // @ts-nocheck

  import { page } from "$app/stores";
  import { SidebarStore } from "$lib/stores/sidebar.store";

  import {
    IconApi,
    IconCalendar,
    IconCalendarCheck,
    IconChartBubble,
    IconCode,
    IconHome,
    IconLock,
    IconLogout,
    IconMessage,
    IconNews,
    IconPaint,
    IconSettings,
    IconSitemap,
    IconUser,
    IconUsersGroup,
    IconWallpaper,
  } from "@tabler/icons-svelte";
  import MenuLogo from "./MenuLogo.svelte";

  $: isActive = (p) => {
    if ($page.url.pathname === p) return true;

    return p !== "/admin" && String($page.url.pathname).startsWith(p);
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
    <a on:click={onClick} href="/admin" class:active={isActive("/admin")}>
      <IconHome size={16} />
      Dashboard</a
    >
  </li>
  <li>
    <a
      on:click={onClick}
      href="/admin/chats"
      class:active={isActive("/admin/chats")}
    >
      <IconMessage size={16} />
      Chats</a
    >
  </li>
  <li>
    <a
      on:click={onClick}
      href="/admin/widgets"
      class:active={isActive("/admin/widgets")}
    >
      <IconWallpaper size={16} />
      Widgets</a
    >
  </li>
  <li>
    <a
      on:click={onClick}
      href="/admin/groups"
      class:active={isActive("/admin/groups")}
    >
      <IconUsersGroup size={16} />
      Groups</a
    >
  </li>
  <li>
    <a
      on:click={onClick}
      href="/admin/users"
      class:active={isActive("/admin/users")}
    >
      <IconUser size={16} />
      Users</a
    >
  </li>
  <li>
    <a
      on:click={onClick}
      href="/admin/settings"
      class:active={isActive("/admin/settings")}
    >
      <IconCode size={16} />
      Integration</a
    >
  </li>
  <li>
    <a
      on:click={onClick}
      href="/admin/account"
      class:active={isActive("/admin/account")}
    >
      <IconLock size={16} />
      Account</a
    >
  </li>
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
