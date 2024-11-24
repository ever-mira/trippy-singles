<template>
  <h1 class="text-[2.4rem] md:text-[2.5rem] font-medium tracking-tight">
    <slot></slot>
  </h1>

  <p class="mt-5 text-lg leading-8 text-sub dark:text-sub-dark">
    <slot name="subtitle"></slot>
  </p>
</template>
