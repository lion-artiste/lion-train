<script lang="ts" generics="T">
    import type { HTMLInputAttributes } from 'svelte/elements';
    import FieldContainer from './FieldContainer.svelte';
    import { Circle } from 'lucide-svelte';
    import type { Snippet } from 'svelte';

    export interface Option {
        id: string,
        display: string
    }

    export interface Props extends HTMLInputAttributes {
        selected?: string[]; // List of ids
        options?: Option[];
        display?: string;
        option?: Snippet<[Option]>;
    }

    let {
        selected = [],
        options = [],
        display,
        option,
        ...rest
    }: Props = $props();

    let Selected = $state(structuredClone(selected));

    function toggleSelected(optionId: string) {
        const index = Selected.indexOf(optionId);
        if (index > -1) { // If option in Selected
            Selected.splice(index, 1);
        } else {
            Selected.push(optionId);
        }
    }

</script>

<FieldContainer>
    {#snippet title()}{display ?? ""}{#if rest.required} *{/if}{/snippet}
    {#snippet content()}
        <input {...rest} type="text" value={Selected.join(";")} hidden />
        <div class="flex flex-row items-center gap-2 w-full text-black">
            {#each options as opt, i}
            <button onclick={() => toggleSelected(opt.id)} type="button" class:bg-green-500={Selected.includes(opt.id)} class:bg-gray-200={!Selected.includes(opt.id)} class="flex flex-row items-center justify-center gap-2 p-2 w-full cursor-pointer rounded-md">
                {#if option}
                    {@render option(opt)}
                {:else}
                    <div>{opt.display}</div>
                {/if}
            </button>
            {/each}
        </div>
    {/snippet}
</FieldContainer>