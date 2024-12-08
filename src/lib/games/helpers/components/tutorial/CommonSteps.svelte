<script lang="ts">
    import { Cog, Music, RotateCcw, Volume2 } from "lucide-svelte";
    import TutorialStep from "./TutorialStep.svelte";

    interface Props {
        firstNumber?: number;
    }

    let { firstNumber = 1 }: Props = $props();
</script>

<TutorialStep>
    {firstNumber}. To customize the game parameters, such as the number of rounds, click on the <Cog class="inline-block" size={20}/> icon in the bottom left corner. All your settings will be stored in the url, so you can just copy it and share it with your friends to challenge them !
</TutorialStep>
<TutorialStep>
    {firstNumber+1}. All songs used are copyright-free. If you want more information about the song currently playing, click the <Music class="inline-block" size={20}/> icon in the bottom left corner to show the credits.
</TutorialStep>
<TutorialStep>
    {firstNumber+2}. To change the volume of the sound effects, click on the <Volume2 class="inline-block" size={20}/> icon in the right left corner. Click multiple times to select between four different volumes. Your choice will be stored and applied to all your games.
</TutorialStep>
<TutorialStep>
    {firstNumber+3}. Click the <RotateCcw class="inline-block" size={20}/> icon to restart the game and go back to round 1.
</TutorialStep>
<TutorialStep>
    {firstNumber+4}. If you encounter a bug or have ideas to improve the website, feel free to contact me by clicking on the "Contact" link at the bottom of the page. You can also support the development of this website with the "Buy me a coffee" link !
</TutorialStep>
<TutorialStep>
    Thank you for trying this game, I hope you'll have fun and improve your listening skills.
</TutorialStep>