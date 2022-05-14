/** Holds a range, default is 0 - 64. */
export class NumRange {
    /** Minimum allowed value, must be above 0. */
    public minValue: number

    /** Maximum allowed value, default is 64. */
    public maxValue: number

    /**
     * @param minValue Minimum allowed value, must be above 0.
     * @param maxValue Maximum allowed value, default is 64.
     */
    public constructor(minValue: number, maxValue?: number) {
        this.minValue = minValue < 0 ? 0 : minValue
        this.maxValue = maxValue ?? 64
    }

    /**
     * Determines if a length meets range requirements.
     * @param length The length to check.
     * @returns An error if the length satisfied the range.
     */
    public isWithinRange(length: number): boolean {
        return !(length <= this.minValue || length > this.maxValue);
    }
}