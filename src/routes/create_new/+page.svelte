<script lang="ts">
    import { saveFile, store } from "$lib/api";
    import { Alert } from 'flowbite-svelte';
    import { Close } from "carbon-icons-svelte";
    import { goto } from "$app/navigation";
    
    let textName = "";
    let result: "success" | "failure" | void;

    function addNew() {
        if (textName.length) {
            $store = [...$store, { name: textName, done: false }];
            saveFile();
            result = "success";
        }
        else {
            result = "failure"
        }
    }

    function elementAlertSpawn(node: HTMLDivElement) {
        setTimeout(() => {
            node.remove();
            result = void result;
        }, 10_000);
        
        return {};
    }
</script>

<button class="w-14 h-14 fixed top-2 right-0 flex items-center justify-center" on:click={async _ => await goto("/")}>
    <Close size={24} fill="white"/>
</button>

{#if result == "success"}
    <div class="fixed top-2 left-0 w-fit h-fit" use:elementAlertSpawn>
        <Alert color="green" class="bg-lime-200">
            <span class="font-medium">Success!</span>
            You did attached new point.
        </Alert>
    </div>
{:else if result == "failure"}
    <div class="fixed top-2 left-0 w-fit h-fit" use:elementAlertSpawn>
        <Alert color="red" class="bg-red-300">
            <span class="font-medium">Failure!</span>
            You didn't attached new point.
        </Alert>
    </div>
{/if}

<div class="h-screen w-screen flex justify-center items-center">
    <div class="rounded border-2 border-solid border-primary-500 w-3/4 h-fit p-4 flex flex-col">
        <h1 class="h1">Create new</h1>
        <input type="text" class="input mt-3" placeholder="Name" bind:value={textName}>
        <button class="btn mt-5 bg-secondary-500 rounded" on:click={addNew}>Add</button>
    </div>
</div>
