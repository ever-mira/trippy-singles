<template>
  <h1 class="text-[2.2rem] md:text-[2.4rem] font-medium tracking-tight">
    <slot></slot>
  </h1>

  <p class="mt-2 text-[1.13rem] leading-8 text-gray-800 dark:text-gray-200">
    <slot name="subtitle"></slot>
  </p>
</template>
