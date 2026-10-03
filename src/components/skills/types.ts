export interface Bubble {
    id: string
    label: string
    kind: 'seed' | 'related'
    selected: boolean
}

export interface SkillBubbleGridProps {
    domain: string
    onSelectionChange: (skills: string[]) => void
}
