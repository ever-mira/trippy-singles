<template>
  <div>
    <div class="mt-9 relative text-3xl font-bold text-heading">{{ $t('signup.logged_in') }}</div>
    <div class="mt-9 relative">
      {{ $t('signup.no_new_messages') }}
    </div>

    <div class="mt-7">
      <Button to="/conversations" class="!px-7">{{ $t('signup.mailbox') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
