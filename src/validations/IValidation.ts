/**
 * Implements basic validation for inputs.
 * 
 * @author PreussenKaiser
 */
export interface IValidation {
    /**
     * Validates the entered input.
     * 
     * @param input The input to validate.
     * @returns An error message if the input was invalid, none if valid.
     */
    validate(input: HTMLInputElement): string
}