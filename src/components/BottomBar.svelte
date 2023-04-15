<script>
    import { 
        penPaper,
        booths,
        boothsExt,
        seqCircuit,
        stepCounter,
        decMultiplicand,
        binMultiplicand,
        decMultiplier,
        binMultiplier,
        multiplyDisabled,
        decMultiplicandValid,
        decMultiplierValid,
        binMultiplicandValid,
        binMultiplierValid,
        solvingMode,
        algorithm,
    } from '../lib/store/Store';
    import { generateTextContent } from '../lib/scripts/downloadUtils';

    let answersCopy = {};
    $: {
        if ($algorithm === 'Pencil and Paper') {
            answersCopy = $penPaper;
        } else if ($algorithm === "Booth's") {
            answersCopy = $booths;
        } else if ($algorithm === "Extended Booth's") {
            answersCopy = $boothsExt;
        } else if ($algorithm === "Sequential Circuit") {
            answersCopy = $seqCircuit;
        }
    }

    function handleNext() {
        if ($stepCounter !== (answersCopy.steps.length - 1)) {
            stepCounter.set($stepCounter + 1);
        }
    }

    function handlePrev() {
        if ($stepCounter !== -1){
            stepCounter.set($stepCounter - 1);
        }
    }

    function handleReset() {
        stepCounter.set(-1);
        decMultiplicandValid.set(false);
        decMultiplierValid.set(false);
        binMultiplicandValid.set(false);
        binMultiplierValid.set(false);
        decMultiplicand.set('');
        binMultiplicand.set('');
        decMultiplier.set('');
        binMultiplier.set('');
        multiplyDisabled.set(true);
        stepCounter.set(-1);
        solvingMode.set('Solving Mode');
        algorithm.set('Algorithm');
        penPaper.set({});
        booths.set({});
        boothsExt.set({});
        seqCircuit.set({});
    }

    function handleDownload() {
        const fileContent = generateTextContent(answersCopy, $algorithm, $decMultiplicand, $decMultiplier);
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'binary-multiplication-answers.txt';
        link.click();

        // Clean up the URL object after download
        URL.revokeObjectURL(url);
    }
</script>

<div class="navbar bg-base-300 fixed bottom-0 w-full z-10">
    <div class="navbar-start">
        <button class="btn btn-ghost gap-2 btn-xs sm:btn-sm md:btn-md" on:click={handleReset}>
            <img src="https://cdn-icons-png.flaticon.com/512/54/54529.png" class="h-6 w-6" alt="download" />
            {#if $solvingMode === 'Step by Step'}
            <p class="hidden sm:inline">Reset</p>
                {:else}
                <p>Reset</p>
            {/if}
        </button>
    </div>
    {#if $solvingMode === 'Step by Step'}
    <div class="navbar-center">
        <div class="btn-group grid grid-cols-3">
            <button class="btn btn-outline btn-xs sm:btn-sm md:btn-md" on:click={handlePrev}>Previous</button>
            <button class="btn btn-outline btn-xs sm:btn-sm md:btn-md">Step {$stepCounter+1}</button>
            <button class="btn btn-outline btn-xs sm:btn-sm md:btn-md" on:click={handleNext}>Next</button>
        </div>
    </div>
    {/if}
    <div class="navbar-end">
        <button class="btn btn-ghost gap-2 btn-xs sm:btn-sm md:btn-md" on:click={handleDownload}>
            <img src="https://cdn-icons-png.flaticon.com/512/724/724933.png" class="h-6 w-6" alt="download" />
            {#if $solvingMode === 'Step by Step'}
            <p class="hidden sm:inline">Download</p>
                {:else}
                <p>Download</p>
            {/if}
        </button>   
    </div>
</div>