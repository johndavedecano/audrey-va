<script>
  import { IconStar, IconStarFilled } from "@tabler/icons-svelte";
</script>

<div class="flex flex-col gap-2 px-4">
  <div class="font-bold text-sm text-gray-500">Survey</div>
  <div class="text-sm border p-2">
    Your service sucks. Fuck yall. Well never do business with yall again!
  </div>
  <div class="flex gap-2 mb-2">
    <div class="flex flex-1 flex-col">
      <div class="text-gray-500 text-sm">Created At</div>
      <div class="text-purple-500 text-sm">Dec 12, 2023 12:00 AM</div>
    </div>
    <div class="flex flex-1 flex-col">
      <div class="text-gray-500 text-sm">Rating</div>
      <div class="text-yellow-500 flex gap-1">
        <IconStarFilled size={16} />
        <IconStarFilled size={16} />
        <IconStarFilled size={16} />
        <IconStar size={16} />
        <IconStar size={16} />
      </div>
    </div>
  </div>
</div>
