<template>
  <div>
    <h4>
      <span>Etapa&nbsp;</span>
      <span class="highlighted-text">{{ currentStep + 1 }}</span>
      <span>&nbsp;de 4</span>
    </h4>
    <div class="form">
      <component
        :is="currentStepComponent"
        :formData="formData"
        :errors="errors"
        @update="updateFormData"
        @validate="validateFields"
      ></component>
      <div class="navigation-buttons">
        <button class="button outlined" @click="prevStep" v-if="currentStep > 0">Voltar</button>
        <button
          class="button filled"
          @click="nextStep"
          :class="{ disabled: !isStepValid }"
          v-if="currentStep < steps.length - 1"
        >
          Continuar
        </button>
        <button class="button filled" @click="submitForm" v-else>Cadastrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import Step1 from './components/Step1.vue'
import Step2 from './components/Step2.vue'
import Step3 from './components/Step3.vue'
import Step4 from './components/Step4.vue'
import {
  validateEmail,
  validateCPF,
  validateCNPJ,
  validateDate,
  validatePhoneNumber,
  validateNotEmpty
} from './utils/validators.js'

export default {
  name: 'App',
  components: { Step1, Step2, Step3, Step4 },
  setup() {
    const currentStep = ref(0)
    const formData = ref({
      email: '',
      cadastroTipo: 'PF',
      nome: '',
      cpf: '',
      dataNascimento: '',
      telefone: '',
      razaoSocial: '',
      cnpj: '',
      dataAbertura: '',
      senha: ''
    })
    const errors = ref({})

    const steps = [Step1, Step2, Step3, Step4]

    const currentStepComponent = computed(() => steps[currentStep.value])

    const isStepValid = computed(() => {
      return validateFields()
    })

    const validateFields = () => {
      errors.value = {}
      if (currentStep.value === 0) {
        if (!validateEmail(formData.value.email)) {
          errors.value.email = 'Email inválido'
        }
      } else if (currentStep.value === 1) {
        if (formData.value.cadastroTipo === 'PF') {
          if (!validateNotEmpty(formData.value.nome)) {
            errors.value.nome = 'Nome não pode estar vazio'
          }
          if (!validateCPF(formData.value.cpf)) {
            errors.value.cpf = 'CPF inválido'
          }
          if (!validateDate(formData.value.dataNascimento)) {
            errors.value.dataNascimento = 'Data de nascimento inválida'
          }
          if (!validatePhoneNumber(formData.value.telefone)) {
            errors.value.telefone = 'Telefone inválido'
          }
        } else if (formData.value.cadastroTipo === 'PJ') {
          if (!validateNotEmpty(formData.value.razaoSocial)) {
            errors.value.razaoSocial = 'Razão social não pode estar vazia'
          }
          if (!validateCNPJ(formData.value.cnpj)) {
            errors.value.cnpj = 'CNPJ inválido'
          }
          if (!validateDate(formData.value.dataAbertura)) {
            errors.value.dataAbertura = 'Data de abertura inválida'
          }
          if (!validatePhoneNumber(formData.value.telefone)) {
            errors.value.telefone = 'Telefone inválido'
          }
        } else if (currentStep.value === 2) {
          if (!validateNotEmpty(formData.value.senha)) {
            errors.value.senha = 'Senha não pode estar vazia'
          }
        }
      }
      return Object.keys(errors.value).length === 0
    }

    const nextStep = () => {
      if (validateFields() && currentStep.value < steps.length - 1) {
        currentStep.value++
      }
    }

    const prevStep = () => {
      if (currentStep.value > 0) {
        currentStep.value--
      }
    }

    const updateFormData = (data) => {
      formData.value = { ...formData.value, ...data }
    }

    const submitForm = async () => {
      try {
        const dataToSend = {
          step1: {
            email: formData.value.email,
            cadastroTipo: formData.value.cadastroTipo
          },
          step2:
            formData.value.cadastroTipo === 'PF'
              ? {
                  nome: formData.value.nome,
                  cpf: formData.value.cpf,
                  dataNascimento: formData.value.dataNascimento,
                  telefone: formData.value.telefone
                }
              : {
                  razaoSocial: formData.value.razaoSocial,
                  cnpj: formData.value.cnpj,
                  dataAbertura: formData.value.dataAbertura,
                  telefone: formData.value.telefone
                },
          step3: {
            senha: formData.value.senha
          }
        }

        const response = await fetch('/registration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSend)
        })

        if (!response.ok) {
          throw new Error('Failed to submit')
        }

        const result = await response.json()
        alert(result.message)
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      currentStep,
      formData,
      errors,
      steps,
      currentStepComponent,
      isStepValid,
      validateFields,
      nextStep,
      prevStep,
      updateFormData,
      submitForm
    }
  }
}
</script>
