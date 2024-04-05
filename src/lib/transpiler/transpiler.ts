String.prototype.replaceBetween = function(start, stop, substring) {
    const left = this.slice(0, start);
    const right = this.slice(stop + 1, this.length);
    return `${left}${substring}${right}`
};

String.prototype.blockify = function(r1, r2) {
    let opening = [];
    let closing = [];
    let brackets = [];

    for (let i = 0; i < this.length; i++) {
        if (r1.test(this[i])) {
            opening.push(i);
        }
        else if (r2.test(this[i])) {
            closing.push(i);
        }
    }

    for (let i = 0; i < opening.length; i++) {
        let count = 0;
        for (let j = opening[i] + 1; j < this.length; j++) {
            if (r1.test(this[j])) {
                count += 1;
            }
            else if (r2.test(this[j]) && count != 0) {
                count -= 1;
            }
            else if (r2.test(this[j]) && count == 0) {
                let start = opening[i];
                let stop = j;
                brackets.push([ start, stop, this.slice(start + 1, stop) ]);
                break
            }
        }
    }
    return brackets
}

const operators_keywords: [string, string][] = [
    ['AND', 'and'],
    ['OR', 'or'],
    ['NOT', 'not'],
    ['^', '**'],
    ['MOD', '%'],
    ['DIV', '//']
];

function Operators(line: string): string {
    for (const i of operators_keywords) {
        line = line.replaceAll(i[0], i[1]);
    }
    return line;
}

function Commenting(line)
{
    if (line.includes('//')) {
    return Commenting( line.replace('//', '#') );
}
return line;
}

function Variables(line)
{
    const regex = /^(?:const|let|var)\s(.*?)$/;
    if (regex.test(line)) {
        return line.match(regex)[1];
    }
    return line;
}

// function InputOutput(line)
// {
//   return line;
// }

function Casting(line)
{
    // if (/str\((.*?)\)/.test(line)) {
    // }
    // if (/int\((.*?)\)/.test(line)) {
    // }
    // if (/float\((.*?)\)/.test(line)) {
    // }

    line = line.replaceAll('real(', 'float(');

    if (/bool\s*\((.*?)\)/.test(line)) {
        const parts = /bool\s*\((.*?)\)/.exec(line);
        const param = parts[1].replace(/'|"/g, '').trim();
        if (['True', 'true'].includes(param)) {
            return Casting( line.replaceAll(parts[0], 'True') );
        }
        else if (['False', 'false'].includes(param)) {
            return Casting( line.replaceAll(parts[0], 'False') );
        }
    }

    return line;
}

function StringHandlingOperations(line)
{
    if (/\)\.length/.test(line)) {
        let start = 0;
        let stop = line.indexOf(').length');

        let blocks = line.blockify(/\(/, /\)/);
        for (let i = 0; i < blocks.length; i++) {
            if (blocks[i][1] == stop) {
                start = blocks[i][0];
                break;
            }
        }

        let beforeBracket = null;
        for (let i = start - 1; i >= 0; i--) {
            if (/\w/.test(line[i])) {
                beforeBracket = i;
            }
            else {
                break;
            }
        }

        if (beforeBracket != null) {
            const ss = [beforeBracket, stop  + '.length'.length];
            const parts = /(.*?)\((.*?)\)\.length/.exec(line.slice(ss[0], ss[1] + 1));
            const py = `len(${parts[1]}(${parts[2]}))`;
            return StringHandlingOperations(line.replaceBetween(...ss, py));
        }
        else {
            const ss = [start, stop  + '.length'.length];
            const parts = /\((.*?)\)\.length/.exec(line.slice(ss[0], ss[1] + 1));
            const py = `len(${parts[1]})`;
            return StringHandlingOperations(line.replaceBetween(...ss, py));
        }
    }
    else if (/\.length/.test(line)) {
        const parts = /([\w'"]+)\.length/.exec(line);
        const ss = [parts.index, parts.index - 1 + parts[0].length];
        const py = `len(${parts[1]})`;
        return StringHandlingOperations(line.replaceBetween(...ss, py));
    }

    else if (/\.substring\((.*?),(.*?)\)/.test(line)) {
        const parts = /\.substring\((.*?),(.*?)\)/.exec(line);
        const ss = [parts.index, parts.index - 1 + parts[0].length];
        const py = `[${parts[1]},${parts[2]}]`;
        return StringHandlingOperations(line.replaceBetween(...ss, py));
    }

    else if (/\.left/.test(line)) {
        const parts = /\.left\((.*?)\)/.exec(line);
        const ss = [parts.index, parts.index - 1 + parts[0].length];
        const py = `[:${parts[1]}]`
        return StringHandlingOperations(line.replaceBetween(...ss, py));
    }
    else if (/\.right/.test(line)) {
        const parts = /\.right\((.*?)\)/.exec(line);
        const ss = [parts.index, parts.index - 1 + parts[0].length];
        const py = `[-${parts[1]}:]`
        return StringHandlingOperations(line.replaceBetween(...ss, py));
    }

    const psKW = ['.upper', '.lower', 'ASC', 'CHR'];
    const pyKW = ['.upper()', '.lower()', 'ord', 'chr'];
    for (let i = 0; i < psKW.length; i++) {
        line = line.replaceAll(psKW[i], pyKW[i]);
    }

    return line;
}

// function FileHandling(line)
// {
//   return line;
// }

function Arrays(line)
{
    if (/^array\s*(\w+)\[(.*?),(.*?)\](?!=)/.test(line)) {
        const parts = /^array\s*(\w+)\[(.*?),(.*?)\](?!=)/.exec(line);
        const py = `${parts[1]} = [[0 for i in range(${parts[2]})] for j in range(${parts[3]})]`;
        return line.replace(parts[0], py);
    }
    else if (/^array\s*(\w+)\[(.*?)\](?!=)/.test(line)) {
        const parts = /^array\s*(\w+)\[(.*?)\](?!=)/.exec(line);
        const py = `${parts[1]} = [0 for i in range(${parts[2]})]`;
        return line.replace(parts[0], py);
    }
    else if (/(\w+)\[(.*?),(.*?)\]/.test(line)) {
        const parts = /(\w+)\[(.*?),(.*?)\]/.exec(line);
        const py = `${parts[1]}[${parts[2].trim()}][${parts[3].trim()}]`;
        return line.replace(parts[0], py);
    }
    return line;
}

function RandomNumbers(line)
{
    if (/random\((.*?),(.*?)\)/.test(line)) {
        randomImport = true;
        const parts = line.match(/random\((.*?),(.*?)\)/);
        const py = `randint(${parts[1].trim()}, ${parts[2].trim()})`;
        return RandomNumbers( line.replace(parts[0], py) );
    }
    return line;
}

function Other(line)
{
    if (line.includes('console.writeline')) {
        return line.replaceAll('console.writeline', 'print');
    }
    if (line.includes('console.log')) {
        return line.replaceAll('console.log', 'print');
    }
    if (/^print\s*\((.*?)\)$/.test(line)) {
        const part = /^print\s*\((.*?)\)$/.exec(line)[1];
        return `print(${part})`;
    }
    return line;
}



function isPseudo(type, indent1, indent2) {
    if (!type && indent1 == indent2) {
        return true;
    }
    else {
        return false;
    }
}



function IterationCountControlled(INDENT, INDEX)
{
    // REMOVE UNNECESSARY PSEUDOCODE BOILERPLATE
    for (let i = INDEX; i < python.length; i++) {
        let [type, indent, line] = [...python[i]];
        if (isPseudo(type, indent, INDENT) && line.includes('next')) {
            python[i] = [true, INDENT, 'REMOVED'];
            break;
        }
    }

    // CONVERT NECESSARY PSEUDOCODE INTO PYTHON
    const iccRegex1 = /^for\s+(.*?)\s*=\s*(.*?)\s+to\s+(.*?)\s*:?$/;
    const iccRegex2 = /^for\s+(.*?)\s*=\s*(.*?)\s+to\s+(.*?)\s+step\s+(.*?)\s*:?$/;

    let line = python[INDEX][2];

    // for a = b to c step d
    if (iccRegex2.test(line)) {
        let [a, b, c, d] = iccRegex2.exec(line).slice(-4);
        line = `for ${a} in range(${b}, ${c}, ${d}):`;
    }

    // for a = b to c
    else if (iccRegex1.test(line)) {
        let [a, b, c] = iccRegex1.exec(line).slice(-3);
        line = `for ${a} in range(${b}, ${c}):`;
    }

    python[INDEX] = [true, INDENT, line];
}

function IterationConditionControlled1(INDENT, INDEX)
{
    // while answer != "Correct"
    //   answer = input("New answer")
    // endwhile

    // REMOVE UNNECESSARY PSEUDOCODE BOILERPLATE
    for (let i = INDEX; i < python.length; i++) {
        let [type, indent, line] = [...python[i]];
        if (isPseudo(type, indent, INDENT) && line == 'endwhile') {
            python[i] = [true, INDENT, 'REMOVED'];
            break;
        }
    }

    // CONVERT NECESSARY PSEUDOCODE INTO PYTHON
    let line = python[INDEX][2];
    let part = line.match(/^while(.*?):?$/)[1].trim();
    python[INDEX] = [true, INDENT, `while ${part}:`];
}

function IterationConditionControlled2(INDENT, INDEX)
{
    // do
    //   answer = input("New answer")
    // until answer == "Correct"

    // REMOVE UNNECESSARY PSEUDOCODE BOILERPLATE
    for (let i = INDEX; i < python.length; i++) {
        let [type, indent, line] = [...python[i]];

        if (isPseudo(type, indent, INDENT) && /^until(.*?)$/.test(line)) {
            python[i] = [true, INDENT, 'REMOVED'];

            // CONVERT NECESSARY PSEUDOCODE INTO PYTHON
            python[INDEX] = [true, INDENT, 'while True:'];

            let part = line.match(/^until(.*?)$/)[1].trim();
            python.splice(i, 0, [true, INDENT + 4, `break`]);
            python.splice(i, 0, [true, INDENT + 2, `if ${part}:`]);
            python.splice(i, 0, [true, INDENT + 2, ``]);
            break;
        }
    }
}

const rgx = {
    selection: {
        if: /^if\s+(.*?)\s*(?:then)?:?$/,
        elif: /^(?:else\s*if|elif)\s*(.*?)\s*(?:then)?:?$/,
        else: /^else:?/,
        end: /^end\s*if$/
    }
};

function Selection(INDENT: number, INDEX: number): void {
    for (let i = INDEX; i < python.length; i++) {
        const type = python[i][0];
        const indent = python[i][1];
        const line = python[i][2];

        if (isPseudo(type, indent, INDENT)) {
            if (rgx.selection.elif.test(line)) {
                python[i][0] = true;
                python[i][2] = `elif ${line.match(rgx.selection.elif)?.[1].trim()}:`;
            }
            else if (rgx.selection.else.test(line)) {
                python[i][0] = true;
                python[i][2] = 'else:';
            }
            else if (rgx.selection.end.test(line)) {
                python[i][0] = true;
                python[i][2] = 'REMOVED';
                break;
            }
        }
    }

    const part = python[INDEX][2].match(rgx.selection.if);
    if (part !== null) {
        python[INDEX][0] = true;
        python[INDEX][2] = `if ${part[1].trim()}:`;
    }
}

function Subroutines(INDENT, INDEX)
{
    // function name(...)
    //   return ...
    // endfunction

    // REMOVE UNNECESSARY PSEUDOCODE BOILERPLATE
    for (let i = INDEX; i < python.length; i++) {
        let [type, indent, line] = [...python[i]];
        if (isPseudo(type, indent, INDENT) && /^end(procedure|function)$/.test(line)) {
            python[i] = [true, INDENT, 'REMOVED'];
            break;
        }
    }

    // CONVERT NECESSARY PSEUDOCODE INTO PYTHON
    let part = /^(?:procedure|function)\s(.*?)\s*:?$/.exec(python[INDEX][2]);
    python[INDEX][0] = true;
    python[INDEX][2] = `def ${part[1]}:`;
}

export default function transpiler(pseudoArrayInput)
{
    python = pseudoArrayInput;

    for (let i = 0; i < python.length; i++) {
        const [type, indent, line] = [...python[i]];
        if (!type && line != '' && line != 'REMOVED') {
            python[i][2] = Commenting(python[i][2]);
            python[i][2] = Operators(python[i][2]);
            python[i][2] = Variables(python[i][2]);
            // python[i][2] = InputOutput(python[i][2]);
            python[i][2] = Casting(python[i][2]);
            python[i][2] = StringHandlingOperations(python[i][2]);
            // // python[i][2] = FileHandling(python[i][2]);
            python[i][2] = Arrays(python[i][2]);
            python[i][2] = RandomNumbers(python[i][2]);
            python[i][2] = Other(python[i][2]);

            if (/^for(.*?)$/.test(python[i][2])) {
                IterationCountControlled(indent, i);
            }

            else if (/^while(.*?)$/.test(python[i][2])) {
                IterationConditionControlled1(indent, i);
            }
            else if (/^do(.*?)$/.test(python[i][2])) {
                IterationConditionControlled2(indent, i);
            }

            else if (/^if(.*?)$/.test(python[i][2])) {
                Selection(indent, i);
            }

            else if (/^(?:procedure|function)(.*?)$/.test(line)) {
                Subroutines(indent, i);
            }
        }
    }

    if (randomImport) {
        python.unshift([true, 0, '']);
        python.unshift([true, 0, 'from random import randint']);
    }
    return python;
}


var python: [boolean, number, string][] = [];
let randomImport = false;
