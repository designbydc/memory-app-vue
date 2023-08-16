export type GridCell = {
    row: number
    col: number
}

export type TGridTemplate<T> = T[][]

export const EmitEventValues = [
    'restart'
] as const