<script lang="ts">
    import { onMount } from "svelte";

    // codemirror general
    import { EditorView } from "codemirror";
    import { EditorState, Compartment } from "@codemirror/state";
    import { oneDark } from "@codemirror/theme-one-dark";

    // codemirror keyboard related imports
    import { keymap } from "@codemirror/view";
    import { defaultKeymap } from "@codemirror/commands";
    import { indentUnit } from "@codemirror/language";

    // codemirror extensions
    import { history } from "@codemirror/commands";
    import { indentOnInput } from "@codemirror/language";
    import { lineNumbers } from "@codemirror/view";

    // codemirror state commands
    import { indentMore, indentLess, undo as _undo, redo as _redo } from "@codemirror/commands";

    // codemirror types
    import type { LanguageSupport } from "@codemirror/language";

    interface Props {
        doc?: string;
        filetype?: LanguageSupport[];
        linenumbers?: boolean;
        editable?: boolean;
        display?: boolean;
    }

    let {
        doc = "",
        filetype = [],
        linenumbers = true,
        editable = true,
        display = true,

    }: Props = $props();

    let view: EditorView;
    let dom = $state() as HTMLDivElement;

    const tabSize = new Compartment();
    const language = new Compartment();

    let extensions = [
        oneDark,

        indentUnit.of("    "),
        tabSize.of(EditorState.tabSize.of(4)),

        language.of(filetype),

        keymap.of(defaultKeymap),
        keymap.of([
            { key: "Tab", run: indentMore, preventDefault: true },
            { key: "Shift-Tab", run: indentLess, preventDefault: true }
        ]),

        history(),
        indentOnInput()
    ];

    if (linenumbers) {
        extensions.push(lineNumbers());
    }

    if (!editable) {
        extensions.push(EditorState.readOnly.of(true));
    }

    export function focus(): void {
        view.focus();
    }

    export function undo(): void {
        _undo(view);
    }

    export function redo(): void {
        _redo(view);
    }

    // there are four values within view.state.selection.main relating to cursor positioning: from, to, anchor, head
    // anchor and head are affected by the direction of the range (which way the cursor is dragged when selecting text)

    export function getCursor(): number {
        return view.state.selection.main.head;
    }

    export function setCursor(position: number): void {
        view.dispatch({ selection: { anchor: position, head: position } });
    }

    export function getEnd(): number {
        return view.state.doc.length;
    }

    export function isRange(): boolean {
        return !view.state.selection.main.empty;
    }

    export function getRange(): [number, number] {
        return [view.state.selection.main.from, view.state.selection.main.to];
    }

    export function setText(text: string, _from = 0, _to = view.state.doc.length): void {
        view.dispatch({
            changes: { from: _from, to: _to, insert: text }
        });
    }

    export function getText(from_ = 0, to_ = view.state.doc.length): string {
        if (from_ === 0) {
            return view.state.doc.toString();
        } else {
            return view.state.sliceDoc(from_, to_);
        }
    }

    export function setSyntax(filetype: LanguageSupport[]): void {
        view.dispatch({
            effects: language.reconfigure(filetype)
        });
    }

    onMount(() => {
        view = new EditorView({
            doc: doc,
            parent: dom,
            extensions: extensions
        });
        return;
    });
</script>

<div style:display={display ? "grid" : "none"} bind:this={dom}></div>

<style lang="scss">
    div {
        display: grid;
    }
</style>
