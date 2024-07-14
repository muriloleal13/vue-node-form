export function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(String(email).toLowerCase())
}

export function validateCPF(cpf) {
  const re = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
  return re.test(cpf)
}

export function validateCNPJ(cnpj) {
  const re = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/
  return re.test(cnpj)
}

export function validateDate(date) {
  const re = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
  if (!re.test(date)) return false

  const [day, month, year] = date.split('/').map(Number)
  const dateObj = new Date(year, month - 1, day)

  return (
    dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day
  )
}

export function validatePhoneNumber(phone) {
  const re = /^\(\d{2}\) \d{4,5}-\d{4}$/
  return re.test(phone)
}

export function validateNotEmpty(value) {
  return value.trim() !== ''
}
