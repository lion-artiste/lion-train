<script lang="ts">
    import type { Source } from "@prisma/client";
    import type { GAME_INFOS, PLAYLIST } from "$lib/games/helpers/types";
    import { page } from "$app/stores";
    import SFXPlayer from "$lib/games/helpers/classes/SFXSoundPlayer";
    import SourcePlayer from "$lib/games/helpers/classes/SourcePlayer";
    import DBunkNode from "./DBunkNode";
    import type DBunkNodeType from "./DBunkNode";
    import SfxVolumeButton from "$lib/games/helpers/components/buttons/SFXVolumeButton.svelte";
    import SquareButton from "$lib/games/helpers/components/buttons/SquareButton.svelte";
    import { Music, RotateCcw } from 'lucide-svelte';
    import GameShell from "$lib/games/helpers/components/GameShell.svelte";
    import GameCounter from "$lib/games/helpers/components/GameCounter.svelte";
    import PointsCount from "$lib/games/helpers/components/PointsCount.svelte";
    import ScoreDisplay from "$lib/games/helpers/components/ScoreDisplay.svelte";
    import SettingsButton from "$lib/games/helpers/components/buttons/SettingsButton.svelte";
    import type baseParameters from "./parameters";
    import { saveScore } from "$lib/games/helpers/functions";
    import type { SCORE_STATS } from "$lib/games/helpers/types";
    import { statsNull } from "$lib/games/helpers/functions";
    import GameFont from "$lib/games/helpers/components/text/GameFont.svelte";
    import Credits from "$lib/games/helpers/components/screens/Credits.svelte";
    import End from "$lib/games/helpers/components/screens/End.svelte";
    import Start from "$lib/games/helpers/components/screens/Start.svelte";
    import ToggleButton from "$lib/games/helpers/components/buttons/ToggleButton.svelte";
    import Pad from "$lib/games/helpers/components/screens/Pad.svelte";
    import PadRow from "$lib/games/helpers/components/screens/PadRow.svelte";
    import { saveSignal } from "$lib/common/signals";
    import { untrack } from "svelte";
    import GameTutorial from "$lib/games/helpers/components/tutorial/GameTutorial.svelte";
    import TutorialStep from "$lib/games/helpers/components/tutorial/TutorialStep.svelte";
    import CommonSteps from "$lib/games/helpers/components/tutorial/CommonSteps.svelte";

    interface Props {
        parameters: typeof baseParameters;
        infos: GAME_INFOS;
        gameNodeClass?: any;
        playlist: PLAYLIST;
        sfxVolume?: 0 | 1 | 2 | 3;
        loggedIn?: boolean;
    }
    
    let {
        parameters,
        infos,
        gameNodeClass = DBunkNode,
        playlist,
        sfxVolume = 2,
        loggedIn = false,
    }: Props = $props();

    let audioCtx: AudioContext;
    let gameNode = new gameNodeClass(infos, parameters) as DBunkNodeType;

    let nbGames = parameters.nb_games.value ?? parameters.nb_games.default;
    
    let score = $state(0);
    let points = $state(0);
    let step = $state(0);

    let stats: SCORE_STATS = $state(statsNull);

    let value1: number = $state(0);
    let value2: number = $state(0);
    let choice: 1 | 2 = $state(1);
    let rightState: 1 | 2 = $state(1);
    let etat: boolean = $state(false);

    type GAME_STATES = "start" | "play" | "result" | "end" | "error";
    let gameState: GAME_STATES = $state("start");
    let nextGameTimeout : NodeJS.Timeout | null = $state(null);

    let showCredits = $state(false);
    
    let sfxPlayer: SFXPlayer | undefined;
    let sourcePlayer: SourcePlayer | undefined = $state(undefined);
    let source: Source | null = $state(null);

    let showTutorial: boolean = $state(false);

    $effect(() => {
        sfxPlayer = new SFXPlayer(untrack(() => sfxVolume));
        if (!gameNode || !sfxPlayer) {
            console.log("GameNode is null");
            gameState = "error";
        }

        return async () => {
            if (nextGameTimeout) clearTimeout(nextGameTimeout);
            await sourcePlayer?.stop(0.3);
        }
    });
    
    function initializeAudio(): boolean {
        if (!gameNode) {
            gameState = "error";
            return false;
        }
        try {
            audioCtx = new AudioContext();
            
            gameNode.initialize(audioCtx);
            gameNode.connect(audioCtx.destination);
            
            sourcePlayer = new SourcePlayer(audioCtx, playlist.sources);
            if (gameNode.inputNode() === null) throw new Error('Input node not initialized');
            sourcePlayer.connect(gameNode.inputNode() as AudioNode);
            source = sourcePlayer.getSource();
            return true;
        } catch {
            gameState = "error";
            return false;
        }
    }

    async function restartGame() {
        await sourcePlayer?.stopAndSwitch();
        step = 1;
        score = 0;
        launchRound();
    }

    function launchRound() {
        // "step" already has the right value
        if (step == 0) {
            initializeAudio();
            step = 1;
        }
        if (step == 1) {
            saveSignal("game:started", infos.id);
        }
        if (step > nbGames) {
            step = nbGames;
            gameState = "end";
            sourcePlayer?.stop(0.3);
            return;
        }
        points = 0;
        [value1, value2] = gameNode?.getNewValueToFind();
        etat = true;
        gameNode?.switch(etat);
        gameState = 'play';
        sourcePlayer?.play(0.5);
    }

    function showResult() {
        if (gameState != "play") return;
        gameState = "result";
        nextGameTimeout = setTimeout(() => {nextGameTimeout = null; step++; launchRound()}, 2000);
        sourcePlayer?.stopAndSwitch(0.3);
        rightState = gameNode.getRightValue();
        points = gameNode.getWonPoints(choice);
        score = score + points;
        points > 0 ? sfxPlayer?.playWinSound() : sfxPlayer?.playLoseSound();
        if (step  == nbGames) {
            saveScore(infos, parameters, score).then((data) => stats = data);
        }
    }

    function toggleCredits() {
        let willShowCredits = ((gameState === "play") && !showCredits);
        if (willShowCredits) source = sourcePlayer ? sourcePlayer.getSource() : null;
        showCredits = willShowCredits;
    }
</script>

<GameShell>

    {#snippet topLeft()}
        <GameCounter {step} total={nbGames} />
    {/snippet}

    {#snippet topCenter()}
        <PointsCount show={gameState == "result"} win={points > 0}>
            {points}
        </PointsCount>
    {/snippet}

    {#snippet topRight()}
        <ScoreDisplay>{score}</ScoreDisplay>
    {/snippet}

    {#snippet mainWindow()}
        <div class="h-[200px] md:h-[250px] bg-white w-full flex flex-col items-center justify-center relative">

            
            {#if showCredits}
                <Credits {source}/>
    
            {:else if gameState == "play" || gameState == "result"}
                <PadRow>
                    <Pad classActive="bg-[#dd6f34]" onclick={() => {choice = 1; showResult()}} state={true} result={gameState == "result"} win={rightState == 1}>
                        <GameFont class="text-white text-4xl">{value1}dB</GameFont>
                    </Pad>
                    <Pad classActive="bg-[#cb632b]" onclick={() => {choice = 2; showResult()}} state={true} result={gameState == "result"} win={rightState == 2}>
                        <GameFont class="text-white text-4xl">{value2}dB</GameFont>
                    </Pad>
                </PadRow>
            
            {:else if gameState == "start"}
                <Start onstart={() => launchRound()}/>
    
            {:else if gameState == "end"}
            <End {loggedIn} stats={stats} onrestart={() => restartGame()}/>
    
            {:else if gameState == "error"}
                <GameFont class="cursor-pointer">An error occured</GameFont>
    
            {/if}
        </div>
    {/snippet}

    {#snippet bottomLeft()}
        
        <SettingsButton {infos} {parameters} />
        <div class="hidden sm:block">
            <SquareButton onclick={() => toggleCredits()}>
                <Music size=28/>
            </SquareButton>
        </div>
        <div class="hidden sm:block">
            <SquareButton onclick={() => showTutorial = true}>
                <div class="text-3xl">?</div>
            </SquareButton>
        </div>
        
    {/snippet}

    {#snippet bottomCenter()}
    
        <ToggleButton state={etat} name_on="Gain On" name_off="Gain Off" onclick={(s) => { etat = s; gameNode?.switch(etat); }}/>
        
    {/snippet}

    {#snippet bottomRight()}
    
        <div class="block sm:hidden">
            <SquareButton onclick={() => showTutorial = true}>
                <div class="text-3xl">?</div>
            </SquareButton>
        </div>
        <div class="hidden sm:block" >
            <SfxVolumeButton bind:sfxVolume={sfxVolume} {loggedIn} onclick={(volume) => sfxPlayer?.setVolumeLevel(volume)}/>
        </div>
        <div class="hidden sm:block">
            <SquareButton onclick={() => restartGame()}>
                <RotateCcw size=28/>
            </SquareButton>
        </div>
        
    {/snippet}

</GameShell>

<GameTutorial show={showTutorial} onclose={() => showTutorial = false}>
    <TutorialStep>
        Welcome to DBunk ! Here's how to play the game :
    </TutorialStep>
    <TutorialStep>
        1. Click on <GameFont class="inline text-xl">Start game</GameFont>, and a song will start playing, with a secret volume reduction.
    </TutorialStep>
    <TutorialStep>
        2. Click on the "Gain On" button to toggle between the original sound and the one with the volume reduction.
    </TutorialStep>
    <TutorialStep>
        3. You'll be presented with two different propositions for gain reduction, one true and one false. Click on the one you think corresponds to what you're hearing.
    </TutorialStep>
    <TutorialStep>
        4. The right answer will be displayed. If you guessed correctly, you'll win between 100 and 1000 points, depending on the gap between the two propositions (the closer the propositions, the more points you'll get) ! If you're logged in, your personal rank and your global rank will be displayed.
    </TutorialStep>
    <CommonSteps firstNumber={5}/>
</GameTutorial>