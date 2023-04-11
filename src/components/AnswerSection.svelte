<script>
	// TO DO: For Every Step, If it's already at the bottom, the screen should auto scroll down
	import {
		stepCounter,
		solvingMode,
		algorithm,
		penPaper,
		booths,
		boothsExt,
		seqCircuit
	} from '../lib/store/Store';
	import LatexGenerate from './LatexGenerate.svelte';

	let answersCopy = {};
	$: {
		if ($algorithm === 'Pencil and Paper') {
			answersCopy = $penPaper;
		} else if ($algorithm === "Booth's") {
			answersCopy = $booths;
			console.log(answersCopy);
		} else if ($algorithm === "Extended Booth's") {
			answersCopy = $boothsExt;
		} else if ($algorithm === 'Sequential Circuit') {
			answersCopy = $seqCircuit;
		}
	}
</script>

<div class="pt-10">
	<div
		class="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10"
	>
		<div class="mx-auto max-w-lg">
			<div class="divide-y divide-gray-300/50">
				<div class="space-y-6 text-base leading-7 text-gray-600">
					<LatexGenerate
						algorithm={$algorithm}
						solvingMode={$solvingMode}
						multiplicand={answersCopy.multiplicand}
						multiplier={answersCopy.multiplier}
						boothMultiplier={answersCopy.booth_multiplier}
						initial={answersCopy.initial}
						steps={answersCopy.steps}
						stepCounter={$stepCounter}
						answer={answersCopy.answer}
					/>
				</div>
			</div>
		</div>
	</div>
</div>
