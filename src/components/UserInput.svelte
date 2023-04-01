<script>
  import { 
    multiplyDisabled, 
    decMultiplicand, 
    binMultiplicand, 
    decMultiplier, 
    binMultiplier, 
    solvingMode, 
    algorithm,
    stepCounter,
    penPaper,
    booths,
    boothsExt,
    seqCircuit,
  } from '../lib/store/Store';
  import { isValidBin, isValidDec } from "../lib/scripts/inputUtils";
  import { toBinary, toDecimal } from '../lib/scripts/conversions';
  import { pencil_and_paper, booths_algorithm, extended_booths_algorithm, sequential_circuit } from '../lib/scripts/compute.js';

  /* Housekeeping */
  let decMultiplicandValid = false;
  let decMultiplierValid = false;
  let binMultiplicandValid = false;
  let binMultiplierValid = false;

  /* Logic to Check if Multiplication is Allowed */
  function updateMultiplyDisabled() {
    const disabled = !((decMultiplicandValid && decMultiplierValid && $solvingMode !== 'Solving Mode' && $algorithm !== 'Algorithm') 
                        || (binMultiplicandValid && binMultiplierValid && $solvingMode !== 'Solving Mode' && $algorithm !== 'Algorithm')
                        || (decMultiplicandValid && binMultiplierValid && $solvingMode !== 'Solving Mode' && $algorithm !== 'Algorithm')
                        || (binMultiplicandValid && decMultiplierValid && $solvingMode !== 'Solving Mode' && $algorithm !== 'Algorithm'));
    multiplyDisabled.set(disabled);
  }
                        
  /* Decimal Input Validation */
  function validateDec(decimal, target) {
    let value = isValidDec(decimal);
    if (value === true) {
      if (target === 'multiplicand') {
        decMultiplicand.set(decimal);
        decMultiplicandValid = true;
      } else {
        decMultiplier.set(decimal);
        decMultiplierValid = true;
      }
      decimalToBinary(decimal, target);
    } else if (value === false) {
        if (target === 'multiplicand') {
          binMultiplicand.set('');
          decMultiplicandValid = false;
        } else {
          binMultiplier.set('');
          decMultiplierValid = false;
        }
    } else {
      validateDec(value, target);
    }
    updateMultiplyDisabled();
  }

  /* Binary Input Validation */
  function validateBin(binary, target) {
    let value = isValidBin(binary);
    if (value === true) {
      if (target === 'multiplicand') {
        binMultiplicand.set(binary);
        binMultiplicandValid = true;
      } else {
        binMultiplier.set(binary);
        binMultiplierValid = true;
      }
      binaryToDecimal(binary,target);
    } else if (value === false) {
        if (target === 'multiplicand') {
          decMultiplicand.set('');
          binMultiplicandValid = false;
        } else {
          decMultiplier.set('');
          binMultiplierValid = false;
        }
    } else {
      validateBin(value, target);
    }
    updateMultiplyDisabled();
  }

  /* Converts a Decimal to Binary */
  function decimalToBinary(decimal, target) {
    if (decimal === '' || decimal === '+' || decimal === '-') {
      target === 'multiplicand' ? binMultiplicand.set('') : binMultiplier.set('');
    } else {
      target === 'multiplicand' ? binMultiplicand.set(toBinary(decimal)) : binMultiplier.set(toBinary(decimal))
    }
  }

  /* Converts a Binary to Decimal */
  function binaryToDecimal(binary, target) {
      target === 'multiplicand' ? decMultiplicand.set(toDecimal(binary)) : decMultiplier.set(toDecimal(binary))
  }
  
  /* Calls the Corresponding Algorithms and Stores the Answer in the Store */
  function handleMultiply() {
    stepCounter.set(-1);
    penPaper.set(pencil_and_paper($binMultiplicand, $binMultiplier));
    booths.set(booths_algorithm($binMultiplicand, $binMultiplier));
    boothsExt.set(extended_booths_algorithm($binMultiplicand, $binMultiplier));
    seqCircuit.set(sequential_circuit($binMultiplicand, $binMultiplier));
  }

  /* Event Handler for Changing Solving Mode Options */
  function handleSolvingMode(event) {
    solvingMode.set(event.target.value);
    stepCounter.set(-1);
    updateMultiplyDisabled();
  }

  /* Event Handler for Changing Algorithm Options */
  function handleAlgorithm(event) {
    algorithm.set(event.target.value)
    updateMultiplyDisabled();
  }
</script>

<div class="flex flex-col w-full sm:flex-row justify-center items-center space-x-0 lg:space-x-4">
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Multiplicand</span>
        </label>
        <div class="flex flex-col space-y-1">
          <input type="text" placeholder="Decimal" class="input input-bordered input-primary w-full max-w-xs rounded-full" bind:value={$decMultiplicand} on:input={() => validateDec($decMultiplicand,'multiplicand')} />
          <input type="text" placeholder="Binary" class="input input-bordered input-primary w-full max-w-xs mb-4 rounded-full" bind:value={$binMultiplicand} on:input={() => validateBin($binMultiplicand,'multiplicand')} />
        </div>
      </div>
    <div class="divider sm:divider-horizontal pt-9"></div>
      <div class="form-control w-full max-w-xs">
        <label class="label">
          <span class="label-text">Multiplier</span>
        </label>
        <div class="flex flex-col space-y-1">
          <input type="text" placeholder="Decimal" class="input input-bordered input-primary w-full max-w-xs rounded-full" bind:value={$decMultiplier} on:input={() => validateDec($decMultiplier,'multiplier')} />
          <input type="text" placeholder="Binary" class="input input-bordered input-primary w-full max-w-xs mb-4 rounded-full" bind:value={$binMultiplier} on:input={() => validateBin($binMultiplier,'multiplier')} />
        </div>
      </div>
</div>

<div class="flex flex-col w-full sm:flex-row justify-center items-center space-x-0 lg:space-x-4">
  <div class="pt-10">
    <select class="select select-ghost w-full max-w-xs select-bordered w-50" on:change={handleAlgorithm} bind:value={$algorithm}>
      <option disabled selected>Algorithm</option>
      <option>Pencil and Paper</option>
      <option>Booth's</option>
      <option>Extended Booth's</option>
      <option>Sequential Circuit</option>
    </select>
  </div>
  <div class="pt-10">
    <select class="select select-ghost w-full max-w-xs select-bordered" on:change={handleSolvingMode} bind:value={$solvingMode}>
      <option disabled selected>Solving Mode</option>
      <option>Step by Step</option>
      <option>Show All</option>
    </select> 
  </div>
  <div class="pt-10">
    <button class="btn btn-primary" disabled={$multiplyDisabled} on:click={handleMultiply}>Multiply</button>
  </div>
</div>



  