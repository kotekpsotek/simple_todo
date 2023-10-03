import { fs, invoke } from "@tauri-apps/api";
import { writable } from "svelte/store";

interface Point {
    name: string,
    done: boolean
}

export const store = writable<Point[]>([])

/** Save file with basic JSON content */
export async function saveFile() {
    store.update((v) => {
        (async () => {
            // await fs.writeTextFile("data.json", JSON.stringify(d));
            await invoke("save_json", { cnt: [...v] });
        })()
        return v;
    })
}