<script lang="ts">
    import { onMount } from "svelte";
    import * as fs from "@tauri-apps/api/fs";
    import { goto } from "$app/navigation"
    import { saveFile, store } from "$lib/api";
    import { TrashCan } from "carbon-icons-svelte";

    // Load data to list 
    onMount(async () => {
        if (!await fs.exists("data.json")) {
            saveFile();
        } else {
            const cnt = await fs.readTextFile("./data.json");
            const cntP = JSON.parse(cnt) as { data: unknown[] };
            $store = cntP.data as any[];
        }
    });

    // Reactivity handle
    $: if ($store.length) {
        saveFile();
    }

    /**
     * @description Delete point from TODO list
     * @param i Index of point to delete
    */
    function deletePoint(i: number) {
        return () => {
            $store.splice(i, 1);
            $store = $store; // Register deletion action
            saveFile(); // Save file with took into account deleted item
        }
    }
</script>

<div class="flex justify-between items-center">
    <h1 class="h1 font-bold">Todo list:</h1>
    <button class="btn bg-primary-500 rounded uppercase font-mono" on:click={async _ => await goto("/create_new")}>
        Add new
    </button>
</div>
<div class="list mt-4">
    {#each $store as point, i (i)}
        <label class="w-full flex items-center space-x-2 relative">
            <input class="checkbox" type="checkbox" checked={point.done} on:change={v => {
                console.log(v.currentTarget.value)
                $store[i].done = Boolean(v.currentTarget.checked);
            }}/>
            <p>{point.name}</p>
            <button class="p-2 absolute right-0" on:click={deletePoint(i)}>
                <TrashCan size={20} fill="white"/>
            </button>
        </label>
    {/each}
</div>
