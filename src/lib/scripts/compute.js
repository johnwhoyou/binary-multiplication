function binaryAddition(a,b){
    let result = "", carry = 0
  
    while(a || b || carry){
        let sum = +a.slice(-1) + +b.slice(-1) + carry // get last digit from each number and sum 
        if( sum > 1 ){  
            result = sum%2 + result
            carry = 1
        }
        else{
            result = sum + result
            carry = 0
        }
        // trim last digit (110 -> 11)
        a = a.slice(0, -1)
        b = b.slice(0, -1)
    }
    
    return result
}

/**
 * This function implements the pencil and paper approach to binary multiplication.
 * 
 * @param {string} multiplicand binary string
 * @param {string} multiplier binary string
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function pencil_and_paper(multiplicand, multiplier){
    const ans_length = multiplicand.length + multiplier.length;
    let ans = "";
    let steps = [];
    
    for(let i = multiplier.length - 1; i >= 0; i--){
        if(multiplier[i] == "1"){
            let val = multiplicand[0].repeat(ans_length - multiplicand.length) + multiplicand + "0".repeat(multiplier.length - 1 - i);
            val = val.slice(val.length - ans_length);
            ans = binaryAddition(ans, val);
            val = val.slice(0, val.length - (multiplier.length - 1 - i))
            steps.push(val);
        }else{
            let val = "0".repeat(ans_length - (multiplier.length - 1 - i));
            ans = binaryAddition(ans, val);
            steps.push(val);
        }
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

// Test Cases
console.log('Test 1:\n', pencil_and_paper("01010", "101"));
console.log('Test 2:\n', pencil_and_paper("01111", "0111"));
console.log('Test 3:\n', pencil_and_paper("011", "01001"));