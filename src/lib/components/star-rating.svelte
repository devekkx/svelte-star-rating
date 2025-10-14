<script lang="ts">
    import type {ConfigI} from "../types.js";
    import Star from "./star.svelte";

    let {config, value = $bindable(4.54)}: { config: ConfigI, value: number } = $props();


</script>
<section class="stars-container">
    <div class="range-stars">
        <div class="stars">
            {#each Array(config.numOfStars) as _, idx}
                {#if Math.floor(value) === idx}
                    <Star id={idx} readonly={config.readonly} starConfig={config.starConfig}
                          fillPercent={value - Math.floor(value)}/>
                {:else if (value) > idx}
                    <Star id={idx} readonly={config.readonly} starConfig={config.starConfig}
                          fillPercent={1}/>
                {:else}
                    <Star id={idx} readonly={config.readonly} starConfig={config.starConfig}
                          fillPercent={0}/>
                {/if}
            {/each}
        </div>

        <!--Star trigger-->
        <input bind:value={value}
               class="slider"
               max={config.readonly ? value : config.maxVal}
               min={config.readonly ? value : config.minVal}
               step={config.step}
               type="range"
        >

    </div>
</section>

<style>
    .stars-container {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
    }

    .range-stars {
        position: relative;
    }

    .stars {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: .5rem;
    }

    .slider {
        opacity: 0;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 100%;
    }
</style>