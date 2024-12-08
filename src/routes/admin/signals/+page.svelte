<script lang="ts">
    import DataTable from '$lib/components/admin/table/DataTable.svelte';
    import Th from "$lib/components/admin/table/Th.svelte";
    import ThFilter from '$lib/components/admin/table/ThFilter.svelte';
    import type { PageData } from './$types';
    import DateTimeBlock from '$lib/components/admin/blocks/DateTimeBlock.svelte';
    import UserBlock from '$lib/components/admin/blocks/UserBlock.svelte';
    import ReturnButton from '$lib/components/admin/ReturnButton.svelte';
    import { TableHandler } from '@vincjo/datatables';

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();

    const table = new TableHandler(data.signals, { rowsPerPage: 10 });
</script>

<ReturnButton href="/admin" display="Admin"/>

<DataTable {table} class="text-black">
    <div class="table-container">

        <table class="table table-hover max-w-full text-black">
            <thead>
                <tr>
                    <Th>Id</Th>
                    <Th>Code</Th>
                    <Th>Value</Th>
                    <Th>User</Th>
                    <Th>Date</Th>
                </tr>
                <tr>
                    <ThFilter {table} field="id"/>
                    <ThFilter {table} field="code"/>
                    <ThFilter {table} field="value"/>
                    <ThFilter {table} field="user" />
                    <ThFilter {table} field="date" />
                </tr>
            </thead>
            <tbody>
                {#each table.rows as signal}
                    <tr>
                        <td style="vertical-align:middle">{signal.id}</td>
                        <td style="vertical-align:middle">{signal.code}</td>
                        <td style="vertical-align:middle">{signal.value ?? ""}</td>
                        <td style="vertical-align:middle"><UserBlock user={signal.user} /></td>
                        <td style="vertical-align:middle"><DateTimeBlock value={signal.date}/></td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</DataTable>