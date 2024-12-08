import type { Playlist, Source } from "@prisma/client"

export type GAME_INFOS = {
    name: string,
    id: string,
    description: string,
    main_color: string,
    secondary_color: string,
    light_color: string
}

export interface BASE_PARAMETER {
    name : string
    description : string
    type : string
    unit : string
    value? : number | string
    default : number | string
}

export interface PARAMETER extends BASE_PARAMETER {
    [key: string] : any
}

export interface INTEGER_PARAMETER extends BASE_PARAMETER {
    type: "integer",
    value?: number,
    default: number,
    min: number,
    max: number
}

export interface FLOAT_PARAMETER extends BASE_PARAMETER {
    type: "float",
    value?: number,
    default: number,
    min: number,
    max: number
}

type Choice<T extends string> = { value: T; display: string };

export interface CHOICE_PARAMETER<T extends string> extends BASE_PARAMETER {
    type: "choice";
    value?: T;
    default: T;
    choices: Choice<T>[];
}

export interface GAME_PARAMETERS {
    nb_games: INTEGER_PARAMETER,
    [url_id: string]: PARAMETER
}

export interface SCORE_STATS {
    global: number | null,
    personal: number | null,
    total_global: number | null,
    total_personal: number | null
}

export interface GameNode {
    inputNode() : AudioNode | null
    connect(to: AudioNode) : AudioNode | null
    getNewValueToFind() : any
    getRightValue() : any
    PositionToValue(p: number | {x: number, y: number}) : any
    ValueToPosition(value: any) : any
    //isPositionaNumber(): boolean
    initialize(actx: BaseAudioContext): void,
    //getBoundaries(): {min: number | {x: number, y: number}, max: number | {x: number, y: number}}
    //getUnit(): string;
    getWonPoints(information: any) : number;
}

export type PLAYLIST = Playlist & {sources: Source[]};

