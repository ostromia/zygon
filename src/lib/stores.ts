import { writable } from "svelte/store";

// stores the active left and right pane
export const activeLeftTab = writable("pseudocodeEditor");
export const activeRightTab = writable("pythonEditor");

// stores string value representing which dropdown menu to display
export const showDropdown = writable("");
