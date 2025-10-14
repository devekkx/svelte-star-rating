<script lang="ts">
    import StarRating from "./lib/components/star-rating.svelte";
    import type {ConfigI} from "./lib/types";

    const config = $state<ConfigI>({
        readonly: false,
        maxVal: 5,
        minVal: 0,
        step: 0.1,
        numOfStars: 5,
        starConfig: {
            size: 26,
            filledColor: '#F98416',
            unfilledColor: '#5D5D5D',
        },
    })

    let value = $state(4.4)
    $inspect(value)

</script>

<main>
    <StarRating bind:value {config}/>
</main>
