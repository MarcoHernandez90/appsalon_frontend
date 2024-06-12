<script setup>
import { ref } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
import SelectedServiceVue from '../../components/SelectedService.vue'
import { formatCurrency } from '../../helpers'
import { useAppointmentsStore } from '../../stores/appointments'

const appointments = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM'
})

/* Función para deshabilitar fechas anteriores, posteriores a 2 meses y fines
  de semana */
const disableDate = (date) => {
  const today = new Date()
  const DIA_SABADO = 6
  const DIA_DOMINGO = 0
  const MES_POSTERIOR = today.getMonth() + 1
  return date < today || date.getMonth() > MES_POSTERIOR || [DIA_SABADO, DIA_DOMINGO].includes(date.getDay())
}
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white">Cita y Resumen</h2>
  <p class="text-white text-lg">
    A continuación verifica la información y verifica tu cita
  </p>

  <h3 class="text-3xl font-extrabold text-white">Servicios</h3>

  <p
    v-if="appointments.noServicesSelected"
    class="text-white text-2xl text-center"
  >
    No hay servicios seleccionados
  </p>

  <div v-else class="grid gap-5">
    <SelectedServiceVue
      v-for="service in appointments.services"
      :key="service.id"
      :service="service"
    />

    <p class="text-right text-white text-2xl">
      Total a pagar:
      <span class="font-black">{{
        formatCurrency(appointments.totalAmount)
      }}</span>
    </p>
  </div>

  <div class="space-y-8" v-if="!appointments.noServicesSelected">
    <h3 class="text-3xl font-extrabold text-white">Fecha y Hora</h3>
    <div class="lg:flex gap-5 items-start">
      <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
        <VueTailwindDatepicker
          :disable-date="disableDate"
          i18n="es-mx"
          as-single
          no-input
          :formatter="formatter"
          v-model="appointments.date"
        />
      </div>
      <div v-if="appointments.isDateSelected" class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5 lg:mt-0">
        <button
          v-for="hour in appointments.hours"
          :key="hour"
          class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
          :class="
            appointments.time === hour ? 'bg-blue-500 text-white' : 'bg-white'
          "
          @click="appointments.time = hour"
          :disabled="appointments.disableTime(hour) ? true : false"
        >
          {{ hour }}
        </button>
      </div>
    </div>

    <div class="flex justify-end">
      <button
        class="w-full md:w-auto bg-blue-500 p-3 rounded-lg uppercase font-black text-white disabled:opacity-10"
        @click="appointments.saveAppointment()"
        :disabled="!appointments.isValidReservation"
      >
        Confirmar Reservación
      </button>
    </div>
  </div>
</template>
