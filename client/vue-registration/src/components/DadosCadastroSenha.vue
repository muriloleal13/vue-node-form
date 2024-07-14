<template>
  <div class="form">
    <label for="senha">
      Senha
      <input
        id="senha"
        v-model="senha"
        :type="readonly ? 'text' : 'password'"
        :readonly="readonly"
        @blur="validate"
        placeholder="Senha"
      />
      <span v-if="errors.senha" class="error">{{ errors.senha }}</span>
    </label>
  </div>
</template>

<script>
import { defineComponent, toRefs, watch, reactive } from 'vue'

export default defineComponent({
  props: ['formData', 'readonly', 'errors'],
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

    const validate = () => {
      emit('validate')
    }

    return {
      ...toRefs(localFormData),
      validate
    }
  }
})
</script>
