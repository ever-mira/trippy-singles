<template>
  <div class="bg-blue-100 rounded-lg p-5.5 bg-opacity-30">
    <span class="font-medium text-gray-700 text-lg leading-relaxed">
      <slot></slot>
    </span>
    <p class="text-gray-600">
      <slot name="content"></slot>
    </p>
  </div>
</template>