<script setup>
import AuthAPI from '@/api/AuthAPI'
import { reset } from '@formkit/vue'
import { inject } from 'vue'

const toast = inject('toast')

// eslint-disable-next-line no-unused-vars
const handleSubmit = async ({ password_confirm, ...formData }) => {
  try {
    const { data } = await AuthAPI.register(formData)
    reset('register-form')
    toast.open({
      message: data.msg,
      type: 'success'
    })
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
    Crea una cuenta
  </h1>
  <p class="text-2xl text-white text-center my-5">
    Crea una cuenta en AppSalon
  </p>

  <FormKit
    id="register-form"
    type="form"
    :actions="false"
    incomplete-message="No se pudo enviar, revisa los mensajes"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Nombre"
      name="name"
      placeholder="Tu nombre"
      validation="required|length:3"
      :validation-messages="{
        required: 'El Nombre es obligatorio',
        length: 'El Nombre es muy corto'
      }"
    />

    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Correo electrónico de registro"
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
      placeholder="Contraseña de Usuario - Mínimo 8 Carácteres"
      validation="required|length:8"
      :validation-messages="{
        required: 'La contraseña es obligatoria',
        length: 'La contraseña debe contener al menos 8 carácteres'
      }"
    />

    <FormKit
      type="password"
      label="Confirma tu Contraseña"
      name="password_confirm"
      placeholder="Repite tu Contraseña"
      validation="required|confirm"
      :validation-messages="{
        required: 'La contraseña es obligatoria',
        confirm: 'Las contraseñas no son iguales'
      }"
    />

    <FormKit type="submit">Crear cuenta</FormKit>
  </FormKit>
</template>
