<template>
  <div class="bg-blue-100 dark:bg-gray-900 rounded-lg p-5.5 bg-opacity-40">
    <span class="font-medium text-gray-700 dark:text-gray-400 text-xl leading-relaxed">
      <slot></slot>
    </span>
    <p class="text-gray-600 dark:text-gray-500">
      <slot name="content"></slot>
    </p>
  </div>
</template>