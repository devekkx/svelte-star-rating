interface StylesI {
    containerStyles?: string;
    starStyles?: string;
}

export interface StarConfigI {
    size: number;
    filledColor: string;
    unfilledColor: string;
}

export interface ConfigI {
    readonly: boolean;
    numOfStars: number;
    minVal: number;
    maxVal: number;
    step: number;
    starConfig: StarConfigI;
    styles?: StylesI;
}
