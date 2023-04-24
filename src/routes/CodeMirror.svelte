<script context="module">
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	import { EditorView, minimalSetup } from 'codemirror';
	import { EditorState, Compartment } from "@codemirror/state";

	import { oneDark } from '@codemirror/theme-one-dark';
	import type { LanguageSupport } from '@codemirror/language';
	import { indentOnInput, indentUnit } from '@codemirror/language';
	import { keymap, lineNumbers } from '@codemirror/view';
	import { indentMore, indentLess } from "@codemirror/commands";


	export let doc = '';
	export let filetype: LanguageSupport | [] = [];

	let view: EditorView;
	let dom: HTMLDivElement;

	const tabSize = new Compartment;
	const language = new Compartment;

	export function setText(text: string): void {
		view.dispatch({
			changes: { from: 0, to: view.state.doc.length, insert: text },
		});
	}

	export function getText(): string {
		return view.state.doc.toString();
	}

	export function setSyntax(filetype: LanguageSupport | []): void {
		view.dispatch({
			effects: language.reconfigure(filetype)
		});
	}

	onMount(() => {
		view = new EditorView({
			doc: doc,
			parent: dom,
			extensions: [
				oneDark,
				minimalSetup,

				indentUnit.of('    '),
				tabSize.of(EditorState.tabSize.of(4)),

				language.of(filetype),

				keymap.of([
					{ key: 'Tab', run: indentMore, preventDefault: true },
					{ key: 'Shift-Tab', preventDefault: true, run: indentLess },
				]),

				lineNumbers(),
				indentOnInput()
			]
		});
		return;
	});
</script>

<div bind:this={dom}></div>

<style lang="scss">
	div {
		display: grid;
		overflow: auto;
	}
</style>
