<template>
  <div class="form">
    <label for="email">
      Endereço de e-mail
      <input id="email" v-model="email" @input="validate" :readonly="readonly" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>
    </label>
    <div class="radio-group" v-if="!readonly">
      <label class="radio-label" for="pf">
        <input
          class="radio-input"
          type="radio"
          name="tipo"
          id="pf"
          value="PF"
          v-model="cadastroTipo"
        />
        Pessoa física
      </label>
      <label class="radio-label" for="pj">
        <input
          class="radio-input"
          type="radio"
          name="tipo"
          id="pj"
          value="PJ"
          v-model="cadastroTipo"
        />
        Pessoa jurídica
      </label>
    </div>
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
<style scope="css">
.radio-group {
  display: flex;
  justify-content: flex-start;
  gap: 30px;
}
.radio-label {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.radio-input {
  margin: 0 0.5em 0;
}
</style>
