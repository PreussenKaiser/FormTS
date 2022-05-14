import {IValidation} from '../validations/IValidation.js'
import {TextValidation} from '../validations/TextValidation.js'
import {NumRange} from "../data/NumRange.js";
import {NoValidation} from "../validations/NoValidation.js";
import {DateValidation} from "../validations/DateValidation.js";

/**
 * The class that handles form validation.
 * 
 * @author PreussenKaiser
 */
export class FormValidator {
    /**
     * Contains a key-value pair of inputs and their validations.
     */
    private readonly validatableInputs: Map<HTMLInputElement, IValidation>

    /**
     * Initializes a new instance of the {@linkcode FormValidator} class.
     * 
     * Attaches the validator to a form instance.
     * 
     * @param instance The form instance to validate.
     * @event HTMLInputElement Attaches an onblur event to all form inputs.
     */
    public constructor(instance: HTMLInputElement) {
        this.validatableInputs = new Map()

        // finds and sets validation for all form inputs
        Array.prototype.slice.call(instance.getElementsByClassName('form-control'))
            .forEach((i: HTMLInputElement) => {
                this.validatableInputs.set(i, this.validationFactory(i))

                i.onblur = () => this.validateInput(i)
            })

        instance.onsubmit = (ev) => this.validateForm(ev)
    }

    /**
     * Validates the entire form instance.
     * 
     * @param ev The form submit event.
     */
    public validateForm(ev: SubmitEvent): void {
        this.validatableInputs.forEach((v, i) => {
            const errorMsg = v.validate(i)

            if (errorMsg.length != 0) {
                this.setErrorFor(i, errorMsg)
                ev.preventDefault()
            }
            else {
                this.setSuccessFor(i)
            }
        })
    }

    /**
     * Validates an individual input.
     * 
     * @param input The input to validate.
     */
    private validateInput(input: HTMLInputElement): void {
        const errorMsg = this.validatableInputs.get(input)?.validate(input)

        console.log(errorMsg)

        if (errorMsg && errorMsg.length != 0) {
            this.setErrorFor(input, errorMsg)
        }
        else {
            this.setSuccessFor(input)
        }
    }

    /**
     * Marks an input as having an error.
     * A message is then displayed which details the error.
     * 
     * @param input The input to output an error for.
     * @param msg The potential message to display.
     */
    private setErrorFor(input: HTMLInputElement, msg?: string): void {
        const errorMsg = this.selectInputError(input)

        if (msg !== undefined) {
            errorMsg.textContent = msg
        }

        errorMsg.style.visibility = 'visible'
        input.style.setProperty('outline', 'orange solid 4px')
    }

    /**
     * Marks an input as having a valid value.
     * 
     * @param input The input to set success for.
     */
    private setSuccessFor(input: HTMLInputElement): void {
        const errorMsg = this.selectInputError(input)

        errorMsg.style.visibility = 'hidden'
        input.style.setProperty('outline', 'cornflowerblue solid 4px')
    }

    /**
     * Selects the element which displays an error message for the specified input.
     * 
     * @param input The input to get the error element of.
     */
    private selectInputError(input: HTMLInputElement): HTMLElement {
        return input.parentElement?.querySelector('.invalid-input') as HTMLElement
    }

    /**
     * Creates an appropriate validation class for an input.
     * 
     * @param input The input ot create validation for.
     * @returns The appropriate validation.
     */
    private validationFactory(input: HTMLInputElement): IValidation {
        let validation: IValidation

        // matches the last css class
        switch (input.classList[input.classList.length - 1]) {
            case 'text':
                validation = new TextValidation(new NumRange(0, 32))

                break

            case 'name':
                const onlyText = /^[a-zA-Z\s]+$/
                validation = new TextValidation(new NumRange(0, 32), onlyText)

                break

            case 'password':
                validation = new TextValidation(new NumRange(0, 64))

                break

            default:
                validation = new NoValidation()
        }

        return validation
    }
}