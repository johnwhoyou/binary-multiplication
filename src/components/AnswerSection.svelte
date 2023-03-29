<script>
    // TO DO: For Every Step, If it's already at the bottom, the screen should auto scroll down
    import { stepCounter, answers, solvingMode } from '../lib/store/Store';
    
    let answersCopy = {};
    $: {
        answersCopy = $answers;
    }
</script>

<div class="pt-10">
    <div class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10">
        <div class="mx-auto max-w-lg">
          <div class="divide-y divide-gray-300/50">
            <div class="space-y-6 text-base leading-7 text-gray-600">
                {#if answersCopy.steps && $solvingMode === 'Step by Step'}
                    <p>Multiplicand: {answersCopy.multiplicand}</p>
                    <p>Multiplier: {answersCopy.multiplier}</p>
                  {#each answersCopy.steps.slice(0, $stepCounter + 1) as step}
                    <p>{step.value}</p>
                  {/each}
                  {#if $stepCounter === (answersCopy.steps.length - 1)}
                    <p>Product: {answersCopy.answer}</p>
                  {/if}
                {:else}
                    <p>Multiplicand: {answersCopy.multiplicand}</p>
                    <p>Multiplier: {answersCopy.multiplier}</p>
                    {#each answersCopy.steps as step}
                        <p>{step.value}</p>
                    {/each}
                    <p>Product: {answersCopy.answer}</p>
                {/if}
            </div>
          </div>
        </div>
    </div>
</div>



  