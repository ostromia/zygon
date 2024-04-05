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

    import { history } from "@codemirror/commands";

    import { undo as _undo } from "@codemirror/commands";
    import { redo as _redo } from "@codemirror/commands";

    import {defaultKeymap} from "@codemirror/commands"


    export let doc = '';
    export let filetype: LanguageSupport | [] = [];

    let view: EditorView;
    let dom: HTMLDivElement;

    const tabSize = new Compartment;
    const language = new Compartment;

    export function focus(): void {
        view.focus();
    }

    // there are four values within view.state.selection.main relating to cursor positioning: from, to, anchor, head
    // anchor and head are affected by the direction of the range (which way the cursor is dragged when selecting text)

    export function getCursor(): number {
        return view.state.selection.main.head;
    }

    export function setCursor(position: number): void {
        view.dispatch({ selection: {anchor: position, head: position} });
    }

    export function isRange(): boolean {
        return !view.state.selection.main.empty;
    }

    export function getRange(): [number, number] {
        return [view.state.selection.main.from, view.state.selection.main.to];
    }

    export function getSelection() {
        return [view.state.selection.main.from, view.state.selection.main.to];
    }

    export function getSelectionText(): string {
        return view.state.sliceDoc(view.state.selection.main.from, view.state.selection.main.to);
    }

    export function setSelection(text: string, from_: number, to_: number): void {
        view.dispatch({
            changes: { from: from_, to: to_, insert: text }
        });
    }

    export function setText(text: string, _from = 0, _to = view.state.doc.length): void {
        view.dispatch({
            changes: { from: _from, to: _to, insert: text },
        });
    }

    export function getText(from_ = 0, to_ = view.state.doc.length): string {
        if (from_ === 0) {
            return view.state.doc.toString();
        }
        else {
            return view.state.sliceDoc(from_, to_);
        }
    }

    export function undo(): void {
        _undo(view);
    }

    export function redo(): void {
        _redo(view);
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

            // keymap.of(defaultKeymap),

            keymap.of([
            { key: 'Tab', run: indentMore, preventDefault: true },
            { key: 'Shift-Tab', preventDefault: true, run: indentLess },
            ]),

            history(),
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
