<template>
  <div class="w-full text-lg -mt-5">
    <div class="w-full px-2 md:w-[360px]">
      <div class="mt-9 relative text-3xl font-bold text-heading">{{ $t('signup.logged_in') }}</div>
      <div class="mt-9 relative">
        {{ $t('signup.no_new_messages') }}
      </div>

      <div class="mt-7">
        <Button to="/mailbox" class="!px-7">{{ $t('signup.mailbox') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
