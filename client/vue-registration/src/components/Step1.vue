<template>
  <div>
    <h1 class="bold-h1">Seja bem vindo(a)</h1>
    <DadosEmailTipo
      :formData="formData"
      :errors="errors"
      @update="updateData"
      @validate="validateData"
    ></DadosEmailTipo>
  </div>
</template>

<script>
import DadosEmailTipo from './DadosEmailTipo.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepOne',
  components: { DadosEmailTipo },
  props: ['formData', 'errors'],
  setup(props, { emit }) {
    const updateData = (data) => {
      emit('update', data)
    }

    const validateData = (data) => {
      emit('validate', data)
    }

    return {
      updateData,
      validateData
    }
  }
})
</script>
