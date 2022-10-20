import Validations from "./Validations"

export default class SignupValidations {

  constructor(email, password){
    this.email = email
    this.password = password
  }

  checkValidations(){
    let errors = []

    if (!Validations.checkEmail(this.email)) {
      errors['email'] = 'mail invalide'
    }


    if (!Validations.minLength(this.password, 4)){
      errors['password'] = 'la longueur du mot de passe doit être > à 4 caractères!'
    }

    return errors

  }

  static getErrorMessageFromCode(errorCode){

    switch(errorCode){

      case 'EMAIL_EXISTS':
        return 'Ce mail existe déjà!'

      case 'EMAIL_NOT_FOUND':
        return "Ce mail n'existe pas!"

      case 'INVALID_PASSWORD':
        return 'mot de passe incorrect!'

      default:
        return 'erreur bizarre, réessaie stp!'

    }
  }



}