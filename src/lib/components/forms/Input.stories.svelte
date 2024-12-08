<script>
    import { Meta, Story, Template } from "@storybook/addon-svelte-csf"

    import Input from "./Input.svelte";
    import FormContainer from "./FormContainer.svelte";
</script>

<Meta title="Forms/Input" component={Input}/>

<Template >
    {#snippet children({ args })}
        <FormContainer>
            <Input {...args}/>
        </FormContainer>
    {/snippet}
</Template>

<Story name="Default" args={{}}/>

<Story name="With value" args={{
    value: "Initialized with text"
}}/>

<Story name="With placeholder" args={{
    placeholder: "Placeholder value"
}}/>

<Story name="Short Error" args={{
    value: "Falsy value",
    error: "A short error"
}}/>

<Story name="Long Error" args={{
    value: "Falsy value",
    error: "A very long error, with maybe too much details. Imagine the fear you would feel if receiving an error this long ! That would be horrible."
}}/>

<Story name="No Text Error" args={{
    value: "Falsy value",
    error: ""
}}/>