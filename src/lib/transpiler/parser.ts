export function toArray(pseudocode: string): [boolean, number, string][] {
	return pseudocode
		.split(/\n/)
		.map((i) => [false, i.search(/\S|$/), i.trim()]);
}

export function toString(pythonarray: [boolean, number, string][]): string{
	return pythonarray
		.filter((i) => i[2] != 'REMOVED')
		.map((i) => ' '.repeat(i[1]) + i[2])
		.join('\n');
}
