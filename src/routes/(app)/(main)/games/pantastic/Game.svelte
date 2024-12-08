<script lang="ts">
    import CommonSteps from "$lib/games/helpers/components/tutorial/CommonSteps.svelte";
    import TutorialStep from "$lib/games/helpers/components/tutorial/TutorialStep.svelte";
    import GameTutorial from "$lib/games/helpers/components/tutorial/GameTutorial.svelte";
    import { untrack } from "svelte";
    import type { Source } from "@prisma/client";
    import type { GAME_INFOS, PLAYLIST } from "$lib/games/helpers/types";
    import SFXPlayer from "$lib/games/helpers/classes/SFXSoundPlayer";
    import SourcePlayer from "$lib/games/helpers/classes/SourcePlayer";
    import PantasticNode from "./PantasticNode";
    import SfxVolumeButton from "$lib/games/helpers/components/buttons/SFXVolumeButton.svelte";
    import SquareButton from "$lib/games/helpers/components/buttons/SquareButton.svelte";
    import GlidingWindow from "$lib/games/helpers/components/screens/GlidingWindow.svelte";
    import { Music, RotateCcw } from 'lucide-svelte';
    import GameShell from "$lib/games/helpers/components/GameShell.svelte";
    import ToggleButton from "$lib/games/helpers/components/buttons/ToggleButton.svelte";
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
    import { saveSignal } from "$lib/common/signals"
    
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
        gameNodeClass = PantasticNode,
        playlist,
        sfxVolume = 2,
        loggedIn = false
    }: Props = $props();

    let audioCtx: AudioContext;
    let gameNode = new gameNodeClass(infos, parameters);

    let nbGames = parameters.nb_games.value ?? parameters.nb_games.default;
    
    let score = $state(0);
    let points = $state(0);
    let step = $state(0);

    let stats: SCORE_STATS = $state(statsNull);


    type GAME_STATES = "start" | "play" | "result" | "end" | "error";
    let gameState: GAME_STATES = $state("start");
    let nextGameTimeout : NodeJS.Timeout | null = $state(null);

    let showCredits = $state(false);
    
    let sfxPlayer: SFXPlayer | undefined = undefined;
    let sourcePlayer: SourcePlayer | undefined = $state(undefined);
    let source: Source | null = $state(null);

    let processingActivated = $state(false);
    let rightValue = $state(0);

    let rightPosition = $derived(gameNode.ValueToPosition(rightValue));

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
        launchGame();
    }

    function launchGame() {
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
        rightValue = gameNode?.getNewValueToFind();
        processingActivated = true;
        gameNode?.switch(processingActivated);
        gameState = 'play';
        sourcePlayer?.play(0.5);
    }

    function showResult() {
        if (gameState != "play") return;
        gameState = "result";
        score = score + points
        nextGameTimeout = setTimeout(() => {nextGameTimeout = null; step++; launchGame()}, 2000);
        points > 0 ? sfxPlayer?.playWinSound() : sfxPlayer?.playLoseSound();
        sourcePlayer?.stopAndSwitch(0.3);
        if (step  == nbGames) {
            saveScore(infos, parameters, score).then((data) => stats = data);
        }
    }

    function toggleCredits() {
        let willShowCredits = ((gameState === "play") && !showCredits);
        if (willShowCredits) source = sourcePlayer ? sourcePlayer.getSource() : null;
        showCredits = willShowCredits;
    }

    function toggleProcessing(activated: boolean) {
        processingActivated = activated;
        gameNode?.switch(activated);
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
                    <GlidingWindow onclick={(position, left, right) => {points = gameNode.getWonPoints({ position, left, right}); showResult()}} textDown="Pan Off" textUp="Pan On" ontop={() => toggleProcessing(true)} onbottom={() => toggleProcessing(false)} {processingActivated} showResult={gameState == "result"} win={points>0} {rightPosition} {rightValue} positionToValue={(p) => gameNode.PositionToValue(p, parameters.min_pan.value ?? parameters.min_pan.default, parameters.max_pan.value ?? parameters.max_pan.default)} percentGame={(step > 0) ? (100 * (step - 1) / (nbGames - 1)) : 0} widthBegin={parameters.w_begin.value ?? parameters.w_begin.default} widthEnd={parameters.w_end.value ?? parameters.w_end.default} unit={""} pMin={gameNode.ValueToPosition(parameters.min_pan.value ?? parameters.min_pan.default)} pMax={gameNode.ValueToPosition(parameters.max_pan.value ?? parameters.max_pan.default)} topRowValues={[-90, -70, -50, -30, -10, 10, 30, 50, 70, 90]} bottomRowValues={[-80, -60, -40, -20, 0, 20, 40, 60, 80]} />
                
                {:else if gameState == "start"}
                    <Start onstart={() => launchGame()}/>
        
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
    
            <ToggleButton state={processingActivated} name_on="Pan On" name_off="Pan Off" onclick={(state) => { toggleProcessing(state) }} />
        
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
        <SquareButton onclick={() => restartGame()} >
            <RotateCcw size=28/>
        </SquareButton>
    </div>
        
    {/snippet}

</GameShell>

<GameTutorial show={showTutorial} onclose={() => showTutorial = false}>
    <TutorialStep>
        Welcome to Pantastic ! Here's how to play the game :
    </TutorialStep>
    <TutorialStep>
        1. Click <GameFont class="inline text-xl">Start game</GameFont>, and a song will start playing, but it will be panned somewhere between full left (-100) and full right (100).
    </TutorialStep>
    <TutorialStep>
        2. Move your mouse over the top part of the game window to hear the sound with the pan applied, or over the bottom part to hear the original sound. You can also toggle between the two with the button at the bottom of the game.
    </TutorialStep>
    <TutorialStep>
        3. Once you have a guess, move your mouse left or right to select the correct pan, and click to validate your answer (on mobile, just lift your finger).
    </TutorialStep>
    <TutorialStep>
        4. The right answer will be displayed. If it is inside the gray window, you'll win between 100 and 1000 points, depending on the precision of your answer ! If you're logged in, your personal rank and your global rank will be displayed.
    </TutorialStep>
    <TutorialStep>
        5. Each round, the size of the gray window will diminish, so you'll have to be more and more precise to win.
    </TutorialStep>
    <CommonSteps firstNumber={6}/>
</GameTutorial>