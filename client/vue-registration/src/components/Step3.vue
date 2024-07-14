<template>
  <div>
    <h1 class="bold-h1">Senha de acesso</h1>
    <DadosCadastroSenha
      :formData="formData"
      :errors="errors"
      @update="updateData"
      @validate="validateData"
    ></DadosCadastroSenha>
  </div>
</template>

<script>
import DadosCadastroSenha from './DadosCadastroSenha.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepThree',
  components: { DadosCadastroSenha },
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
