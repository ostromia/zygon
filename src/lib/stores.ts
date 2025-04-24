import { writable } from "svelte/store";

// stores boolean value representing whether to show pseudocode guide or not
export const showGuide = writable(false);
export const showPythonEditor = writable(true);

// stores string value representing which dropdown menu to display
export const showDropdown = writable("");
