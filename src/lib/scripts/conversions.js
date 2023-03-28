/**
 * Performs sign extension on a binary number.
 *
 * If the binary number has more bits than the specified number of bits, this method returns the number
 * without any modification.
 *
 * @param {string} number Binary number to be sign-extended.
 * @param {number} numBits Number of bits after performing sign extension.
 * @returns {string} Sign-extended equivalent of the given binary number.
 */
function signExtend(number, numBits) {
	const numRemainingBits = numBits - number.length;

	let signExtended = number;
	let msb = number[0];

	for (let i = 0; i < numRemainingBits; i++) {
		signExtended = `${msb}${signExtended}`;
	}

	return signExtended;
}

/**
 * Checks if a binary number is of the form 10...0. The only exception is 1 followed by (NUM_BITS - 1) zeroes,
 * which represents the smallest signed integer representable using `NUM_BITS` bits (`NUM_BITS` is the maximum
 * number of bits supported by this calculator).
 *
 * @param {string} number Binary number to be checked against the pattern 10...0.
 * @returns {boolean} `true` if the binary number is of the form 10...0; `false`, otherwise. If the binary number is
 * 1 followed by (`NUM_BITS` - 1) zeroes, where `NUM_BITS` is the maximum number of bits supported by this
 * calculator, `false` is returned instead.
 */
function isAmbiguousCase(number) {
	let negativeBias = '1';
	for (let i = 0; i < 16 - 1; i++) {
		negativeBias = `${negativeBias}0`;
	}

	/* Regex for 1 followed by zero or more 0s */
	const pattern = /^10*$/;
	return pattern.test(number) && number != negativeBias;
}

/**
 * Converts a binary number to its signed decimal equivalent.
 *
 * This method converts the binary number 10...0 to -2^n, where n is the number of terminal zeroes.
 *
 * Precondition:
 * - The binary number should have less than or equal to 16 bits.
 *
 * @param {string} number Binary number to be converted to its signed decimal equivalent.
 * @returns {number} Decimal equivalent of the binary number.
 */
function toDecimalRaw(number) {
	const [decimal] = new Int16Array([`0b${number}`]);
	return decimal;
}

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

/**
 * Converts a binary number to its signed decimal equivalent.
 *
 * This method converts binary numbers of the form 10...0 to an empty string to prevent ambiguity.
 * The only exception is 1 followed by (`NUM_BITS` - 1) zeroes, which represents the smallest signed integer
 * representable using NUM_BITS bits (`NUM_BITS` is the maximum number of bits supported by this calculator).
 *
 * Precondition:
 * - The binary number should have less than or equal to 16 bits.
 *
 * @param {string} number Binary number to be converted to its signed decimal equivalent.
 * @returns {number} Decimal equivalent of the binary number, or empty string if the binary number is 1.
 */
export function toDecimal(number) {
	if (isAmbiguousCase(number)) {
		return '';
	}

	return toDecimalRaw(signExtend(number, 16));
}