<template>
  <div>
    <label for="telefone">
      Telefone
      <input
        id="telefone"
        v-model="telefone"
        :readonly="readonly"
        @input="applyPhoneMask"
        @blur="validate"
        placeholder="Telefone"
      />
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
        emit('update', { telefone: newValue.telefone })
      },
      { deep: true }
    )

    const applyPhoneMask = () => {
      localFormData.telefone = localFormData.telefone
        .replace(/\D/g, '')
        .replace(/^(\d{2})(\d)/g, '($1) $2')
      if (localFormData.telefone.length <= 13) {
        localFormData.telefone = localFormData.telefone.replace(/(\d{4})(\d)/, '$1-$2')
      } else {
        localFormData.telefone = localFormData.telefone.replace(/(\d{5})(\d)/, '$1-$2')
      }
    }

    const validate = () => {
      emit('validate')
    }

    return {
      ...toRefs(localFormData),
      applyPhoneMask,
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
