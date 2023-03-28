/**
 * Checks if the decimal operand is valid and supported by the calculator.
 *
 * Note that this methods recognizes '+' or '-' as valid strings. However, they are properly handled
 * in the method canMultiply().
 *
 * @param {string} value Decimal operand.
 * @returns {boolean} `true` if the decimal operand is valid and supported by the calculator (or if `value`
 * is either a positive or a negative sign); `false`, otherwise. It also returns the sliced value if the pattern is
 * found after slicing the last character.
 */
export function isValidDec(value) {
	/* Regex that zero or one positive or negative sign, followed by zero or more digits */
	const pattern = /^(-|\+)?(\d+)?$/;
	if (!pattern.test(value)) {
		const slicedVal = value.slice(0, -1);
		if (pattern.test(slicedVal)) {
			return slicedVal;
		}
		return false;
	}

	/* Check if the value is within the range of 16-bit signed integers. */
	if (parseInt(value) > Math.pow(2, 16 - 1) - 1) {
		return false;
	}

	if (parseInt(value) < -1 * Math.pow(2, 16 - 1)) {
		return false;
	}

	/* Check if value is null */
	if (value.length == 0) {
		return false;
	}

	/* No error found */
	return true;
}

/**
 * Checks if the binary operand is valid and supported by the calculator.
 *
 * @param {string} value Binary operand.
 * @returns {boolean} `true` if the binary operand is valid and supported by the calculator; `false`,
 * otherwise.
 */
export function isValidBin(value) {
	/* Regex that only accepts zero or more 0s or 1s */
	const pattern = /^[0-1]*$/;
	if (!pattern.test(value)) {
		const slicedVal = value.slice(0, -1);
		if (pattern.test(slicedVal)) {
			return slicedVal;
		}
		return false;
	}

	/* Check if the value is within the range of supported signed integers. */
	if (value.length > 16) {
		return false;
	}

	/* Check if value is null */
	if (value.length == 0) {
		return false;
	}

	/* No error found */
	return true;
}
