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



}