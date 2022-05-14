import { NumRange } from "../data/NumRange.js";
import {IValidation} from "./IValidation.js";

/**
 * Validation suitable for text inputs.
 * 
 * @author PreussenKaiser
 */
export class TextValidation implements IValidation {
    /**
     * The regular expression to validate the input with.
     */
    protected regex: RegExp

    /**
     * The character count range for the input value.
     */
    protected range: NumRange

    /**
     * Initializes a new instance of the {@linkcode StringValidation} class.
     * 
     * @param range The acceptable length range.
     * @param regex The regular expression to use.
     */
    public constructor(range: NumRange, regex?: RegExp) {
        const allowAll = /[\s\S]*/

        this.regex = regex ?? allowAll
        this.range = range
    }

    /**
     * Validates a text input.
     * 
     * Checks for:
     * - Value matches range requirements
     * - Value only contains text
     * 
     * @param input The text input to validate.
     * @returns An error message if invalid, empty string if valid.
     */
    public validate(input: HTMLInputElement): string {
        let errorMsg = ''

        if (!this.range.isWithinRange(input.value.length)) {
            errorMsg = `Text length must be between ${this.range.minValue} and ${this.range.maxValue}`
        }
        else if (!this.regex.test(input.value)) {
            errorMsg = 'Input failed regex (not descriptive ik)'
        }

        return errorMsg
    }
}