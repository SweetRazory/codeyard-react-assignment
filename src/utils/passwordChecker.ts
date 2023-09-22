export const passwordChecker = (password: string): number => {
  const lengthScore = password.length >= 8 ? 2 : 1

  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/.test(password)
  const characterMixScore =
    (hasUpperCase ? 1 : 0) +
    (hasLowerCase ? 1 : 0) +
    (hasNumber ? 1 : 0) +
    (hasSpecialChar ? 1 : 0)

  const totalScore = lengthScore + characterMixScore

  if (totalScore <= 3) {
    return 1
  } else if (totalScore <= 4) {
    return 2
  } else if (totalScore <= 5) {
    return 3
  } else {
    return 4
  }
}
