<script setup>
import AuthAPI from '@/api/AuthAPI'
import { reset } from '@formkit/vue'
import { inject } from 'vue'

const toast = inject('toast')

const handleSubmit = async ({ email }) => {
  try {
    const { data } = await AuthAPI.forgotPassword({ email })
    toast.open({
      message: data.msg,
      type: 'success'
    })
    reset('login-form')
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error'
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Olvidé mi contraseña
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Recupera el acceso a tu cuenta
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

    <FormKit type="submit">Enviar Instrucciones</FormKit>
  </FormKit>
</template>
