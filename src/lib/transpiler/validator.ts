//@ts-nocheck

// method to check if string is valid python identifier
String.prototype.isIdentifier = function() {
	return /^[a-zA-Z_]\w*$/.test(this);
}

// method to check if a string contains a valid integer
String.prototype.isStringInteger = function() {
	return Number.isInteger(Number(this));
}

function IterationCountControlled(INDENT, INDEX, LINE)
{
	const iccRegex1 = /^for\s+(.*?)\s*=\s*(.*?)\s+to\s+(.*?)\s*:?$/;
	const iccRegex2 = /^for\s+(.*?)\s*=\s*(.*?)\s+to\s+(.*?)\s+step\s+(.*?)\s*:?$/;

	if (iccRegex2.test(LINE)) {
		let [a, b, c, d] = iccRegex2.exec(LINE).slice(-4);

		if (!a.isIdentifier()) {
			message = `Error on line ${INDEX}\n    ${a} isn't a valid identifier`;
			return false;
		}
		if (!b.isIdentifier() && !b.isStringInteger()) {
			message = `Error on line ${INDEX}\n    ${b} isn't a valid identifier/number`;
			return false;
		}
		if (!c.isIdentifier() && !c.isStringInteger()) {
			message = `Error on line ${INDEX}\n    ${c} isn't a valid identifier/number`;
			return false;
		}
		if (!d.isIdentifier() && !d.isStringInteger()) {
			message = `Error on line ${INDEX}\n    ${d} isn't a valid identifier/number`;
			return false;
		}
		return true;
	}

	else if (iccRegex1.test(LINE)) {
		let [a, b, c] = iccRegex1.exec(LINE).slice(-3);
		if (!a.isIdentifier()) {
			message = `Error on line ${INDEX}\n    ${a} isn't a valid identifier`;
			return false;
		}
		if (!b.isIdentifier() && !Number.isInteger(Number(b))) {
			message = `Error on line ${INDEX}\n    ${b} isn't a valid identifier/number`;
			return false;
		}
		if (!c.isIdentifier() && !Number.isInteger(Number(c))) {
			message = `Error on line ${INDEX}\n    ${c} isn't a valid identifier/number`;
			return false;
		}
		return true;
	}

	else {
		message = `Error on line ${INDEX}\n    ${LINE}\n
		Please declare for loops as specified by the OCR guide:
		for i=0 to 9
		...
		next i`;
		return false;
	}
}

export default function validator(pseudoArrayInput)
{
	python = pseudoArrayInput;

	for (let i = 0; i < python.length; i++) {
		const [type, indent, line] = [...python[i]];

		if (/^for(.*?)$/.test(python[i][2])) {
			if (!IterationCountControlled(indent, i, line)) {
				return message;
			}
		}
	}
	return message;
}

let python = [];
let message = '';
