<template>
  <div class="form">
    <h1 class="bold-h1">Revise suas informações</h1>
    <DadosEmailTipo
      :formData="formData"
      :errors="errors"
      :readonly="true"
      @update="updateData"
      @validate="validateData"
    ></DadosEmailTipo>
    <div v-if="formData.cadastroTipo === 'PF'">
      <DadosCadastroPF
        :formData="formData"
        :errors="errors"
        :readonly="true"
        @update="updateData"
        @validate="validateData"
      ></DadosCadastroPF>
    </div>
    <div v-else-if="formData.cadastroTipo === 'PJ'">
      <DadosCadastroPJ
        :formData="formData"
        :errors="errors"
        :readonly="true"
        @update="updateData"
        @validate="validateData"
      ></DadosCadastroPJ>
    </div>
    <DadosCadastroSenha
      :formData="formData"
      :errors="errors"
      :readonly="true"
      @update="updateData"
      @validate="validateData"
    ></DadosCadastroSenha>
  </div>
</template>

<script>
import DadosEmailTipo from './DadosEmailTipo.vue'
import DadosCadastroPF from './DadosCadastroPF.vue'
import DadosCadastroPJ from './DadosCadastroPJ.vue'
import DadosCadastroSenha from './DadosCadastroSenha.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StepFour',
  components: {
    DadosEmailTipo,
    DadosCadastroPF,
    DadosCadastroPJ,
    DadosCadastroSenha
  },
  props: ['formData', 'errors'],
  setup(props, { emit }) {
    const updateData = (data) => {
      emit('update', data)
    }

    const validateData = (data) => {
      emit('validate', data)
    }

    return { updateData, validateData }
  }
})
</script>
