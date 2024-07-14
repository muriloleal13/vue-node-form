<template>
  <div class="form">
    <label for="nome">
      Nome
      <input id="nome" v-model="nome" @blur="validate" :readonly="readonly" placeholder="Nome" />
      <span v-if="errors.nome" class="error">{{ errors.nome }}</span>
    </label>

    <label for="cpf">
      CPF
      <input
        id="cpf"
        v-model="cpf"
        @input="applyMask('cpf')"
        @blur="validate"
        :readonly="readonly"
        placeholder="CPF"
      />
      <span v-if="errors.cpf" class="error">{{ errors.cpf }}</span>
    </label>

    <label for="dataNascimento">
      Data de Nascimento
      <input
        id="dataNascimento"
        v-model="dataNascimento"
        @input="applyMask('dataNascimento')"
        @blur="validate"
        :readonly="readonly"
        placeholder="Data de Nascimento"
      />
      <span v-if="errors.dataNascimento" class="error">{{ errors.dataNascimento }}</span>
    </label>
    <TheTelefone
      :formData="formData"
      :readonly="readonly"
      :errors="errors"
      @update="updateData"
      @validate="validate"
    />
  </div>
</template>

<script>
import { defineComponent, toRefs, watch, reactive } from 'vue'
import TheTelefone from './TheTelefone.vue'

export default defineComponent({
  components: {
    TheTelefone
  },
  props: ['formData', 'errors', 'readonly'],
  setup(props, { emit }) {
    const localFormData = reactive({ ...props.formData })

    watch(
      localFormData,
      (newValue) => {
        emit('update', newValue)
      },
      { deep: true }
    )

    const applyMask = (field) => {
      if (field === 'cpf') {
        localFormData.cpf = localFormData.cpf
          .replace(/\D/g, '')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
      } else if (field === 'dataNascimento') {
        localFormData.dataNascimento = localFormData.dataNascimento
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\d{2})(\d{1,4})$/, '$1/$2')
      }
    }

    const updateData = ({ telefone }) => {
      localFormData.telefone = telefone
    }

    const validate = () => {
      emit('validate')
    }

    return {
      ...toRefs(localFormData),
      applyMask,
      updateData,
      validate
    }
  }
})
</script>

<style>
.error {
  color: red;
  font-size: 0.8em;
}
</style>
