import { keyframes, styled } from '@ignite-ui/react'

export const ldsRingAnimation = keyframes({
  '0%': {
    transform: 'rotate(0deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

export const LdsRing = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  margin: 'auto',
  width: '$20',
  height: '$20',
})

export const LdsRingDiv = styled('div', {
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  margin: '$2',
  borderWidth: '$space$2',
  borderStyle: 'solid',
  borderColor: '$gray200 transparent transparent transparent',
  borderRadius: '$full',
  animation: `${ldsRingAnimation} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite`,
})

export const LdsRingChild1 = styled(LdsRingDiv, {
  animationDelay: '-0.45s',
})

export const LdsRingChild2 = styled(LdsRingDiv, {
  animationDelay: '-0.3s',
})

export const LdsRingChild3 = styled(LdsRingDiv, {
  animationDelay: '-0.15s',
})
