<script setup>
import AuthAPI from '@/api/AuthAPI'
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const toast = inject('toast')
const router = useRouter()

const handleSubmit = async (formData) => {
  try {
    const { data: { token } } = await AuthAPI.login(formData)
    localStorage.setItem('AUTH_TOKEN', token)
    router.push({ name: 'my-appointments' })
  } catch (error) {
    console.log(error)
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Iniciar Sesión
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Si tienes una cuenta, inicia sesión
  </p>

  <FormKit
    id="login-form"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los mensajes"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Email de Usuario"
      validation="required|email"
      :validation-messages="{
        required: 'El Correo es obligatorio',
        email: 'Ingresa un correo válido'
      }"
    />

    <FormKit
      type="password"
      label="Contraseña"
      name="password"
      placeholder="Contraseña de Usuario"
      validation="required"
      :validation-messages="{
        required: 'La contraseña es obligatoria'
      }"
    />

    <FormKit type="submit">Iniciar Sesión</FormKit>
  </FormKit>
</template>
