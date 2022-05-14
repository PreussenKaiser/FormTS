import {FormValidator} from "./validators/FormValidator.js";

// selects the form to attack validation to
const form = document.querySelector('.form') as HTMLInputElement

if (form != null) {
    // wraps the form in the validator
    const validator = new FormValidator(form)
}