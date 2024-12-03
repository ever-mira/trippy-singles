<template>
  <div>
    <div>Nachricht an <span class="font-bold">@{{ username }}</span></div>
    <div class="md:flex gap-x-2 mt-4">
      <Textarea type="text" placeholder="Nachricht"
        class="!w-full xl:min-w-140 max-w-170 resize-none dark:bg-black dark:!border-0" @keydown.enter="sendMessage" />
      <Button class="self-start !px-7.5" @click="sendMessage">senden</Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const username = route.params.username

const sendMessage = async () => {
  const message = { receiver_id, content }
  const response = await $fetch('/api/messages', {
    method: 'POST',
    body: message,
  });
}
</script>