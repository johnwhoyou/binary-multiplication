export function generateTextContent(answers, algorithm, decMultiplicand, decMultiplier) {
    let content = '';

    if (algorithm === "Pencil and Paper") {
        content += `PENCIL AND PAPER ALGORITHM\n\n`;
    } else if (algorithm === "Booth's") {
        content += `BOOTH'S ALGORITHM\n\n`;
    } else if (algorithm === "Extended Booth's") {
        content += `EXTENDED BOOTH'S ALGORITHM\n\n`;
    } else if (algorithm === "Sequential Circuit") {
        content += `SEQUENTIAL CIRCUIT ALGORITHM\n\n`;
    }

    content += `Multiplicand\n`;
    content += `\tDecimal:\t${decMultiplicand}\n`;
    content += `\tBinary:\t\t${answers.multiplicand}\n\n`;
    content += `Multiplier\n`;
    content += `\tDecimal:\t${decMultiplier}\n`;
    content += `\tBinary:\t\t${answers.multiplier}\n\n`;

    content += `----------------------------------------------------------------\n\n`;
   
    if (algorithm === "Booth's") {
        content += `\t`;
        content += " ".repeat(answers.multiplicand.length)
        content += `${answers.multiplicand}\n`;
    } else if (algorithm === 'Sequential Circuit') {
        content += `Initial:\n`;
        content += `\tM=${answers.initial.M}\t-M=${answers.initial['-M']}\n`;
        content += `\tA=${answers.initial.A}\tQ=${answers.initial.Q}\tQ-1=${answers.initial['Q-1']}\n\n`;
    } else {
        content += `\t`;
		content += ' '.repeat(answers.multiplicand.length);
        content += `${answers.multiplicand}\n`;
    }

    if (algorithm !== 'Sequential Circuit') {
        content += ` x\t`;
    }
    if (algorithm === 'Pencil and Paper') {
        content += ' '.repeat(answers.multiplicand.length);
        content += `${answers.multiplier}\n`;
    } else if (algorithm === "Booth's" ) {
        content += `${answers.booth_multiplier.join(' ')}\n`;
    } else if (algorithm === "Extended Booth's") {
        content += ' '.repeat(answers.steps.length);
        content += `\t${answers.booth_multiplier.join(' ')}\n`;
    }

     if (algorithm !== 'Sequential Circuit') {
        content += `----------------------------------------------------------\n`;
    }

    if (algorithm === "Sequential Circuit") {
        for (let i = 0; i < answers.steps.length; i++) {
            content += `Loop ${i+1}:\n`;
            content += `\tA=${answers.steps[i].A}\tQ=${answers.steps[i].Q}\tQ-1=${answers.steps[i]['Q-1']}\n\n`;
        }
    } else {
        for (let i = 0; i < answers.steps.length; i++) {
            if (i === answers.steps.length - 1) {
                content += ` +\t${answers.steps[i].value}\n`;
            } else {
                content += `\t${answers.steps[i].value}\n`;
            }
        }
    }

    content += `----------------------------------------------------------\n`;
    content += `Result:\t${answers.answer}`;

    return content;
}