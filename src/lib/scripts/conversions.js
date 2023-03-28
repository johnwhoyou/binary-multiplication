/**
 * Converts a number to its 32-bit two's complement.
 *
 * This method does not place a leading zero on positive integers. For example, 6 is converted to 110.
 * As a form of differentiation, negative integers are represented using exactly 32 bits.
 * For example, -6 is converted to 11111111111111111111111111111010.
 *
 * @param {number} number Number to be converted to its 32-bit two's complement.
 * @returns {string} 32-bit two's complement of the given number.
 */
function toBinaryRaw(number) {
	/* Perform an arithmetic shift first to force two's complement. */
	return (number >>> 0).toString(2);
}

/**
 * Converts a number to its two's complement using the fewest number of bits.
 *
 * This method places a leading zero on positive integers. A special case is the smallest representable
 * n-bit signed number, that is, -2^(n-1), which is represented as 1 followed by (n-1) zeroes.
 *
 * @param {number} number Number to be converted to its two's complement using the fewest number of bits.
 * @returns {string} Two's complement of the given number using the fewest number of bits.
 */
export function toBinary(number) {
	/* Designate the smallest representable signed number, i.e., -2^(16-1) = -32768, as a special case. */
	if (number == -1 * Math.pow(2, 16 - 1)) {
		let minBinary = '1';
		for (let i = 0; i < 16 - 1; i++) {
			minBinary = `${minBinary}0`;
		}

		return minBinary;
	}

	const binary = toBinaryRaw(number);
    
	/* Place a leading zero on positive integers. */
	if (number > 0) {
		return `0${binary}`;
	}

	/* Express negative numbers using the fewest number of bits. */
	const invBinary = toBinaryRaw(-1 * number);

	/* Subtract 1 since toBinaryRaw() does not place a leading zero */
	return binary.substring(binary.length - invBinary.length - 1);
}
