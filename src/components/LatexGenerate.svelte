<script>
	import MathJax from './MathJax.svelte';

	export let algorithm;
	export let solvingMode;
	export let multiplicand;
	export let multiplier;
	export let boothMultiplier;
	export let initial;
	export let steps;
	export let stepCounter;
	export let answer;

	const latexBegin = '$$\\begin{align}';
	const latexEnd = '\\end{align}$$';
	let latexBody;

	$: {
		latexBody = '';

		if (algorithm === 'Pencil and Paper') {
			latexBody += `&${multiplicand}&&\\text{Multiplicand}\\\\
            \\times\\space&${multiplier}&&\\text{Multiplier}\\\\ \\hline`;

			steps.map((step, index) => {
				if (solvingMode === 'Step by Step' && index > stepCounter) return;
				index === 0
					? (latexBody += `&${step.value}\\\\`)
					: (latexBody += `+\\space&${step.value}\\\\`);
			});

			if (solvingMode === 'Show All' || stepCounter === steps.length - 1)
				latexBody += `\\hline=\\space&${answer}&&\\text{Product}`;
		} else if (algorithm === "Booth's" || algorithm === "Extended Booth's") {
			let boothMultiplierToLatex = '';
			boothMultiplier.map((multiplier) => {
				boothMultiplierToLatex += `${multiplier}\\space`;
			});

			latexBody += `&\\text{Multiplicand:}\\space${multiplicand} \\\\
            &\\text{Multiplier:}\\space${multiplier} \\\\
            &\\text{Booth's Equivalent:}\\space${boothMultiplierToLatex}\\\\ \\\\ \\\\`;

			latexBody += `&${multiplicand}&&\\text{Multiplicand}\\\\
            \\times\\space&${boothMultiplierToLatex}&&\\text{Booth's Equivalent}\\\\ \\hline`;

			steps.map((step, index) => {
				if (solvingMode === 'Step by Step' && index > stepCounter) return;
				index === 0
					? (latexBody += `&${step.value}\\\\`)
					: (latexBody += `+\\space&${step.value}\\\\`);
			});

			if (solvingMode === 'Show All' || stepCounter === steps.length - 1)
				latexBody += `\\hline=\\space&${answer}&&\\text{Product}`;
		} else {
			latexBody += `&\\text{Multiplicand:}\\space${multiplicand}\\\\
            &\\text{Multiplier:}\\space${multiplier}\\\\
            \\\\ \\hline \\\\
            \\mathbf{Initial:}&\\\\
            -M:&\\space\\boxed{${initial['-M']}} \\\\ 
            M:&\\space\\boxed{${initial.M}} \\\\ 
            A:&\\space\\boxed{${initial.A}}\\space\\space\\space\\space
            Q:\\boxed{${initial.Q}}\\space\\space\\space\\space
            Q_{-1}:\\boxed{${initial['Q-1']}}\\\\`;

			steps.map((step, index) => {
				if (solvingMode === 'Step by Step' && index > stepCounter) return;

				latexBody += `\\\\ \\\\
                \\mathbf{Loop\\space${step.Loop}:}&\\space\\\\
                A:&\\space\\boxed{${step.A}}\\space\\space\\space\\space
                Q:\\boxed{${step.Q}}\\space\\space\\space\\space
                Q_{-1}:\\boxed{${step['Q-1']}}\\\\`;
			});

			if (solvingMode === 'Show All' || stepCounter === steps.length - 1)
				latexBody += `\\\\ \\hline \\\\
                \\mathbf{Product:}\\\\ &AQ=${answer}`;
		}
	}
</script>

{#key latexBody}
	<MathJax math={latexBegin + latexBody + latexEnd} />
{/key}
