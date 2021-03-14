const inputTable = document.getElementById('input-table');
const result = document.getElementById('result');
const clipboard = document.getElementById('clipboard');
const [rows, columns] = [document.getElementById('rows-number'), document.getElementById('columns-number')];

function render() {
    inputTable.innerHTML = "";
    for (let x = 0; x < rows.value; x++) {
        const row = document.createElement('tr');
        for (let y = 0; y < columns.value; y++) {
            const column = document.createElement('td')
            
            const input = document.createElement('input')
            input.setAttribute('oninput', 'inputChange()')
            column.append(input);
            console.log("Hey world")
            row.append(column);
        }
        inputTable.append(row);
    }
}

function inputChange() {
    const row = [];
    const tableResults = [];
    for (let i = 0; i < inputTable.getElementsByTagName('input').length; i++) {
        const element = inputTable.getElementsByTagName('input')[i];
        row.push(element.value);

        if (row.length === 2) {
            tableResults.push([...row]);
            row.length = 0;
        }
    }

    let textResult = "";

    tableResults[0].map(column => textResult += ` ${column || 'x'} |`)
    textResult = textResult.substring(0, textResult.length - 1);
    textResult += '\n'
    tableResults[0].map(column => textResult += ` --- |`)
    textResult = textResult.substring(0, textResult.length - 1);
    textResult += '\n'
    tableResults.map((row, index) => {
        if (index === 0)
            return;
        row.map(column => textResult += ` ${column || 'x'} |`)
        textResult = textResult.substring(0, textResult.length - 1);
        textResult += '\n'
    });

    result.innerHTML = marked(textResult)
    clipboard.value = textResult;
}
inputChange();

function copyToClipboard() {
    var copyText = clipboard;
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
}