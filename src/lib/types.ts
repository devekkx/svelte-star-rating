export interface StarConfigI {
    size: number,
    filledColor: string,
    unfilledColor: string
    filledStrokeColor: string
    unfilledStrokeColor: string
}

export interface ConfigI {
    readonly: boolean
    numOfStars: number,
    value: {
        minVal: number,
        maxVal: number,
        step: number,
    }
    starConfig: StarConfigI
}