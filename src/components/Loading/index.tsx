import { LdsRing, LdsRingChild1, LdsRingChild2, LdsRingChild3 } from './styles'

interface ILoading {
  width: string
  height: string
}

export function Loading({ width, height }: ILoading) {
  return (
    <LdsRing>
      <LdsRingChild1 style={{ width, height }} />
      <LdsRingChild2 style={{ width, height }} />
      <LdsRingChild3 style={{ width, height }} />
    </LdsRing>
  )
}
