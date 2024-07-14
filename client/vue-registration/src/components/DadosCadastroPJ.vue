<template>
  <div class="form">
    <label for="razaoSocial">
      Razão Social
      <input
        id="razaoSocial"
        v-model="razaoSocial"
        :readonly="readonly"
        placeholder="Razão Social"
      />
      <span v-if="errors.razaoSocial" class="error">{{ errors.razaoSocial }}</span>
    </label>

    <label for="cnpj" v-if="cadastroTipo === 'PJ'">
      CNPJ
      <input
        id="cnpj"
        v-model="cnpj"
        @input="applyMask('cnpj')"
        @blur="validate"
        :readonly="readonly"
        placeholder="CNPJ"
      />
      <span v-if="errors.cnpj" class="error">{{ errors.cnpj }}</span>
    </label>

    <label for="dataAbertura" v-if="cadastroTipo === 'PJ'">
      Data de Abertura
      <input
        id="dataAbertura"
        v-model="dataAbertura"
        @input="applyMask('dataAbertura')"
        @blur="validate"
        :readonly="readonly"
        placeholder="Data de Abertura"
      />
      <span v-if="errors.dataAbertura" class="error">{{ errors.dataAbertura }}</span>
    </label>

    <label for="telefone">
      Telefone
      <input id="telefone" v-model="telefone" :readonly="readonly" placeholder="Telefone" />
      <span v-if="errors.telefone" class="error">{{ errors.telefone }}</span>
    </label>
  </div>
</template>

<script>
import { defineComponent, toRefs, watch, reactive } from 'vue'

export default defineComponent({
  props: ['formData', 'errors', 'readonly'],
  setup(props, { emit }) {
    const localFormData = reactive({ ...props.formData })

    watch(
      localFormData,
      (newValue) => {
        emit('update', newValue)
        emit('validate')
      },
      { deep: true }
    )

    const applyMask = (field) => {
      if (field === 'cnpj') {
        localFormData.cnpj = localFormData.cnpj
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
      } else if (field === 'dataAbertura') {
        localFormData.dataNascimento = localFormData.dataNascimento
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\d{2})(\d{1,4})$/, '$1/$2')
      }
    }

    const validate = () => {
      emit('validate')
    }

    return {
      ...toRefs(localFormData),
      applyMask,
      validate
    }
  }
})
</script>
