export interface StarConfigI {
    size: number,
    filledColor: string,
    unfilledColor: string
}

export interface ConfigI {
    readonly: boolean
    numOfStars: number,
    minVal: number,
    maxVal: number,
    step: number,

    starConfig: StarConfigI
}