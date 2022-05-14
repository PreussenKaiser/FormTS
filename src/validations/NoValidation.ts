import {IValidation} from "./IValidation.js";

/**
 * Validation for null cases.
 * 
 * @author PreussenKaiser
 */
export class NoValidation implements IValidation {
    /**
     * Automatically validates the input.
     * 
     * Checks for:
     * - nothing
     * 
     * @param input The input to validate.
     * @returns An empty string signifying it's valid.
     */
    public validate = (input: HTMLInputElement) => ""
}