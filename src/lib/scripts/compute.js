/**
 * This function implements the pencil and paper approach to binary multiplication.
 * 
 * @param {string} multiplicand 
 * @param {string} multiplier 
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function pencil_and_paper(multiplicand, multiplier){
    const ans_length = multiplicand.length + multiplier.length;
    let ans = "";
    let steps = [];
    
    for(let i = multiplier.length - 1; i >= 0; i--){
        if(multiplier[i] == "1"){ val = multiplicand[0].repeat(ans_length - multiplicand.length) + multiplicand }
        else{ val = "0".repeat(ans_length) }
        steps.push(val);
        // TODO Add the 'val' to the answer
    }

    return {answer: ans, steps: steps}
}

/**
 * This function implements the Booth's algorithm for binary multiplication.
 * 
 * @param {string} multiplicand 
 * @param {string} multiplier 
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function booths_algorithm(multiplicand, multiplier){

}

/**
 * This function implements the extended Booth's algorithm for binary multiplication.
 * 
 * @param {string} multiplicand 
 * @param {string} multiplier 
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function extended_booths_algorithm(multiplicand, multiplier){

}

/**
 * This function implements the sequential circuit approach to binary multiplication.
 * 
 * @param {string} multiplicand 
 * @param {string} multiplier 
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function sequential_circuit(multiplicand, multiplier){

}

console.log(pencil_and_paper("1010", "1010"));