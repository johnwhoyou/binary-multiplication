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

// Binary Addition That Does Not Return Overflow
function addBinary(a, b) {
    let result = "";
    let carry = 0;
  
    for (let i = a.length - 1; i >= 0; i--) {
      let sum = parseInt(a[i], 2) + parseInt(b[i], 2) + carry;
      result = (sum % 2).toString() + result;
      carry = Math.floor(sum / 2);
    }
  
    // Discard the overflow if any
    if (result.length > a.length) {
      result = result.substring(1);
    }
  
    return result;
  }  

function twos_complement(binary){
    let complement = "";
    let one_found = false;
    for(let i = binary.length - 1; i >= 0; i--){
        if(!one_found){
            if(binary[i] == "1"){
                one_found = true;
                complement = "1" + complement;
            } 
            else{
                complement = "0" + complement;
            }
        } else{
            complement = binary[i] == "1" ? "0" + complement : "1" + complement;
        }
    }
    return complement;
}

/**
 * This function implements the pencil and paper approach to binary multiplication.
 * 
 * @param {string} multiplicand binary string
 * @param {string} multiplier binary string
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function pencil_and_paper(multiplicand, multiplier){
    multiplicand = multiplicand.length >= multiplier.length ? multiplicand : multiplicand[0].repeat(multiplier.length - multiplicand.length) + multiplicand;
    multiplier = multiplier.length >= multiplicand.length ? multiplier : multiplier[0].repeat(multiplicand.length - multiplier.length) + multiplier;
    const ans_length = multiplicand.length + multiplier.length;
    let ans = "";
    let steps = [];
    
    for(let i = multiplier.length - 1; i >= 0; i--){
        if(multiplier[i] == "1"){
            let val = multiplicand[0].repeat(ans_length - multiplicand.length) + multiplicand + "0".repeat(multiplier.length - 1 - i);
            val = val.slice(val.length - ans_length);
            ans = binaryAddition(ans, val);
            val = val.slice(0, val.length - (multiplier.length - 1 - i))
            steps.push({"value": val, "multiplied_to": "1"});
        }else{
            let val = "0".repeat(ans_length - (multiplier.length - 1 - i));
            ans = binaryAddition(ans, val);
            steps.push({"value": val, "multiplied_to": "0"});
        }
    }

    if(multiplier[0] == "1"){
        let val = twos_complement(multiplicand) + "0".repeat(multiplier.length);
        ans = binaryAddition(ans, val);
        val = val.slice(0, val.length - multiplier.length);
        steps.push({"value": val, "multiplied_to": "2\'s Complement"}); // insert at beginning
    }

    ans = ans.slice(ans.length - ans_length);
    return {answer: ans, steps: steps, multiplicand: multiplicand, multiplier: multiplier}
}

/**
 * This function converts the binary multiplier to the Booth's algorithm format.
 * 
 * @param {string} multiplier binary string
 * @returns {Array} strings of +1, -1, or 0
 */
function convert_multiplier_to_booths(multiplier){
    const multipliers = [];
    let temp = multiplier.length % 2 ? multiplier : multiplier + "0" ;
    for(let i = 0; i < temp.length - 1; i++){
        let val = temp[i] + temp[i+1];
        if(val === "01"){
            multipliers.push("+1");
        } else if(val === "10"){
            multipliers.push("-1");
        } else{
            multipliers.push("0");
        }
    }
    return multipliers;
}

/**
 * This function implements the Booth's algorithm for binary multiplication.
 * 
 * @param {string} multiplicand 
 * @param {string} multiplier 
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function booths_algorithm(multiplicand, multiplier){
    //multiplicand = multiplicand.length >= multiplier.length ? multiplicand : multiplicand[0].repeat(multiplier.length - multiplicand.length) + multiplicand;
    //multiplier = multiplier.length >= multiplicand.length ? multiplier : multiplier[0].repeat(multiplicand.length - multiplier.length) + multiplier;
    const ans_length = multiplicand.length + multiplier.length;
    let ans = "";
    let steps = [];
    const old_multiplier = multiplier;
    multiplier = convert_multiplier_to_booths(multiplier);
    for(let i = multiplier.length - 1; i >= 0; i--){
        if(multiplier[i] == "+1"){
            let val = multiplicand[0].repeat(ans_length - multiplicand.length) + multiplicand + "0".repeat(multiplier.length - 1 - i);
            val = val.slice(val.length - ans_length);
            ans = binaryAddition(ans, val);
            val = val.slice(0, val.length - (multiplier.length - 1 - i))
            steps.push({"value": val, "multiplied_to": "+1"});
        }else if(multiplier[i] == "-1"){
            let temp = twos_complement(multiplicand)
            let val = temp[0].repeat(ans_length - multiplicand.length) + temp + "0".repeat(multiplier.length - 1 - i);
            val = val.slice(val.length - ans_length);
            ans = binaryAddition(ans, val);
            val = val.slice(0, val.length - (multiplier.length - 1 - i))
            steps.push({"value": val, "multiplied_to": "-1"});
        }
        else{
            let val = "0".repeat(ans_length - (multiplier.length - 1 - i));
            ans = binaryAddition(ans, val);
            steps.push({"value": val, "multiplied_to": "0"});
        }
    }

    ans = ans.slice(ans.length - ans_length);
    return {answer: ans, steps: steps, multiplicand: multiplicand, multiplier: old_multiplier, booth_multiplier: multiplier}
}

function convert_multiplier_to_extended_booths(multiplier){
    const lookup = {'000': '0', '001': '+1', '010': '+1', '011': '+2', '100': '-2', '101': '-1', '110': '-1', '111': '0'};
    const multipliers = [];

    // If odd number of bits, sign extend
    multiplier = multiplier.length % 2 ? multiplier[0] + multiplier : multiplier;
    // Append 0 to LSb side
    multiplier = multiplier + "0";

    for(let i = 0; i < multiplier.length - 1; i += 2){
        let val = multiplier[i] + multiplier[i+1] + multiplier[i+2];
        multipliers.push(lookup[val]);
    }

    return multipliers;
}

/**
 * This function implements the extended Booth's algorithm for binary multiplication.
 * 
 * @param {string} multiplicand 
 * @param {string} multiplier 
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function extended_booths_algorithm(multiplicand, multiplier){
    const ans_length = multiplicand.length + multiplier.length;
    let ans = "";
    let steps = [];
    const old_multiplier = multiplier;
    multiplier = convert_multiplier_to_extended_booths(multiplier);

    for(let i = multiplier.length - 1; i >= 0; i--){
        if(multiplier[i] == "+1"){
            let val = multiplicand[0].repeat(ans_length - multiplicand.length) + multiplicand + "0".repeat((multiplier.length - 1 - i) * 2);
            
            steps.push({"value": val, "multiplied_to": "+1"});
        }
        else if(multiplier[i] == "-1"){
            let temp = twos_complement(multiplicand)
            let val = temp[0].repeat(ans_length - multiplicand.length) + temp + "0".repeat((multiplier.length - 1 - i) * 2);

            steps.push({"value": val, "multiplied_to": "-1"});
        }
        else if(multiplier[i] == "+2"){
            let val = multiplicand[0].repeat(ans_length - multiplicand.length) + multiplicand + "0".repeat(1 + (multiplier.length - 1 - i) * 2);
            val = val.slice(val.length - ans_length);
            ans = binaryAddition(ans, val);

            val = val.slice(0, val.length - ( (multiplier.length - i - 1) * 2 ) );
            steps.push({"value": val, "multiplied_to": "+2"});
        }
        else if(multiplier[i] == "-2"){
            let temp = twos_complement(multiplicand)
            let val = temp[0].repeat(ans_length - multiplicand.length) + temp + "0".repeat(1 + (multiplier.length - 1 - i) * 2);
            val = val.slice(val.length - ans_length);
            ans = binaryAddition(ans, val);

            val = val.slice(0, val.length - ( (multiplier.length - i - 1) * 2 ) );
            steps.push({"value": val, "multiplied_to": "-2"});
        }
        else{
            let val = "0".repeat(ans_length - ((multiplier.length - i - 1) * 2));
            ans = binaryAddition(ans, val);
            steps.push({"value": val, "multiplied_to": "0"});
        }
    }

    ans = ans.slice(ans.length - ans_length)
    return {answer: ans, steps: steps, multiplicand: multiplicand, multiplier: old_multiplier, booth_multiplier: multiplier};
}

/**
 * This function implements the sequential circuit approach to binary multiplication.
 * 
 * @param {string} multiplicand 
 * @param {string} multiplier 
 * @returns {Object} with params answer in binary, steps in array of strings
 */
export function sequential_circuit(multiplicand, multiplier){
    // Equalize the length of the multiplicand and multiplier
    //multiplicand = multiplicand.length >= multiplier.length ? multiplicand : multiplicand[0].repeat(multiplier.length - multiplicand.length) + multiplicand;
    //multiplier = multiplier.length >= multiplicand.length ? multiplier : multiplier[0].repeat(multiplicand.length - multiplier.length) + multiplier;

    // Initialize
    let varA = "0".repeat(multiplicand.length);
    let varM = multiplicand; // For A+M Case
    let varNegM = twos_complement(multiplicand); // For A-M Case
    let varQ = multiplier;
    let varQneg1 = "0";
    let results = "";
    let steps = [];
    let initial = {
        'A': varA,
        'M': varM,
        '-M': varNegM,
        'Q': varQ,
        'Q-1': varQneg1,
    }

    // To Determine if A+M or A-M or Copy
    function determineOperation() {
        let varQ0Qneg1 = varQ.charAt(varQ.length - 1) + varQneg1;
        if (varQ0Qneg1 === '01') {
            return "A+M";
        } else if (varQ0Qneg1 === '10') {
            return "A-M";
        }
        return;
    }

    for (let i = 0; i < multiplier.length; i++) {
        if (determineOperation() === 'A+M') {
            varA = addBinary(varA, varM)
        } else if (determineOperation() === 'A-M') {
            varA = addBinary(varA, varNegM)
        }

        let combined = varA + varQ + varQneg1;
        let shifted = combined.charAt(0) + combined.slice(0,-1);
        varA = shifted.slice(0, varA.length);
        varQ = shifted.slice(varA.length, varA.length + varQ.length);
        varQneg1 = shifted.slice(varA.length + varQ.length);
        steps.push({"Loop": i+1, "A": varA, "Q": varQ, "Q-1": varQneg1});
        
        if (i === multiplier.length - 1) {
            results = varA + varQ;
        }
    }

    return {"multiplicand": multiplicand, "multiplier": multiplier, "answer": results, "initial": initial, "steps": steps}
}

// Test Cases
function pencil_and_paper_tests(){
    console.log('Pencil and Paper Tests')
    console.log('Test 1: ', pencil_and_paper("01010", "0101").answer == "0000110010" ? 'Passed' : 'Failed');
    console.log('Test 2: ', pencil_and_paper("01111", "0111").answer == "0001101001" ? 'Passed' : 'Failed');
    console.log('Test 3: ', pencil_and_paper("011", "011").answer == "001001" ? 'Passed' : 'Failed');
    console.log('Test 4: ', pencil_and_paper("0100", "1011").answer == "11101100" ? 'Passed' : 'Failed');
    console.log('Test 5: ', pencil_and_paper("1100", "1011").answer == "00010100" ? 'Passed' : 'Failed');
    console.log('Test 6: ', pencil_and_paper("010", "01010").answer == "0000010100" ? 'Passed' : 'Failed')
}

function twos_complement_tests(){
    console.log('2\'s Complement Tests')
    console.log('Test 1: ', twos_complement("01010") == "10110");
    console.log('Test 2: ', twos_complement("01111") == "10001");
    console.log('Test 3: ', twos_complement("011") == "101");
    console.log('Test 4: ', twos_complement("0100") == "1100");
    console.log('Test 5: ', twos_complement("0000000000") == "0000000000");
    console.log('Test 6: ', twos_complement("1111111111") == "0000000001");
    console.log('Test 7: ', twos_complement("1111111110") == "0000000010");
    console.log('Test 8: ', twos_complement("0000000001") == "1111111111");
}

function convert_multiplier_to_booths_tests(){
    console.log('Convert Multiplier to Booths Tests')
    console.log('Test 1: ', convert_multiplier_to_booths("1011"));
    console.log('Test 2: ', convert_multiplier_to_booths("0111"));
}

function booths_tests(){
    console.log('\nBooth\'s Algorithm Tests')
    console.log('Test 1: ', booths_algorithm("0100", "1011").answer === "11101100" ? 'Passed' : 'Failed');
    console.log('Test 2: ', booths_algorithm("0100", "0101").answer === "00010100" ? 'Passed' : 'Failed');
}

function convert_multiplier_to_extended_booth_tests(){
    console.log('Convert Multiplier to Extended Booth Tests')
    console.log('Test 1: ', convert_multiplier_to_extended_booths("00110"));
    console.log('Test 2: ', convert_multiplier_to_extended_booths("0101"));
    console.log('Test 3: ', convert_multiplier_to_extended_booths("10101"));
    console.log('Test 4: ', convert_multiplier_to_extended_booths("10110"));
    console.log('Test 5: ', convert_multiplier_to_extended_booths("10001"));
}

function extended_booths_tests(){
    console.log('\nExtended Booth\'s Algorithm Tests')
    console.log('Test 1: ', extended_booths_algorithm("01101", "00110").answer === "0001001110" ? 'Passed' : 'Failed');
}

function sequential_circuit_tests(){
    console.log('\nSequential Circuit Tests');
    console.log('Test 1: ', sequential_circuit("0100", "0101").answer === '00010100' ? 'Passed' : 'Failed');
    console.log('Test 2: ', sequential_circuit("0111111111111111", "1000000000000000").answer === '11000000000000001000000000000000' ? 'Passed' : 'Failed');
    console.log('Test 3: ', sequential_circuit("0101101", "1001").answer === '11011000101' ? 'Passed' : 'Failed');
    console.log('Test 4: ', sequential_circuit("010111101", "101110").answer === '111001010110110' ? 'Passed' : 'Failed');
    console.log('Test 5: ', sequential_circuit("0000000000000001", "1111111111111111").answer === '11111111111111111111111111111111' ? 'Passed' : 'Failed');
}

//pencil_and_paper_tests();
//booths_tests();
//extended_booths_tests();
//sequential_circuit_tests();