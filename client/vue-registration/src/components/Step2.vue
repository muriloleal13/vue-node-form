<template>
  <div>
    <h1 class="bold-h1">
      {{ `Pessoa ${formData.cadastroTipo === 'PF' ? 'Física' : 'Jurídica'}` }}
    </h1>
    <div v-if="formData.cadastroTipo === 'PF'">
      <DadosCadastroPF
        :formData="formData"
        :errors="errors"
        @update="updateData"
        @validate="validateData"
      ></DadosCadastroPF>
    </div>
    <div v-else-if="formData.cadastroTipo === 'PJ'">
      <DadosCadastroPJ
        :formData="formData"
        :errors="errors"
        @update="updateData"
        @validate="validateData"
      ></DadosCadastroPJ>
    </div>
  </div>
</template>

<script>
import DadosCadastroPF from './DadosCadastroPF.vue'
import DadosCadastroPJ from './DadosCadastroPJ.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepTwo',
  components: { DadosCadastroPF, DadosCadastroPJ },
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
