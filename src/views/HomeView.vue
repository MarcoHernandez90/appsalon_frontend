<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
  router.push({ name: 'login' })
})
</script>

<template>
  <main>
    <h1 class="text-3xl">AppSalon</h1>
  </main>
</template>
