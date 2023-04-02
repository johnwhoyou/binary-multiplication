export function generateTextContent(answers, algorithm) {
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
    content += `\tDecimal:\n`;
    content += `\tBinary: ${answers.multiplicand}\n\n`;
    content += `Multiplier\n`;
    content += `\tDecimal:\n`;
    content += `\tBinary: ${answers.multiplier}\n\n`;

    content += `----------------------------------------------------------------\n\n`;
   
    content += `\t`;
    content += " ".repeat(answers.steps.length)
    content += `${answers.multiplicand}\n`;

    content += ` x\t`;
    content += " ".repeat(answers.steps.length)
    content += `${answers.multiplier}\n`;

    content += `----------------------------------------\n`;

    for (let i = 0; i < answers.steps.length; i++) {
        if (i === answers.steps.length-1) {
            content += ` +\t${answers.steps[i].value}\n`;
        } else {
            content += `\t${answers.steps[i].value}\n`;
        }
    }
    content += `----------------------------------------\n`;
    content += `\t${answers.answer}`;

    return content;
}