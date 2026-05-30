import { ReactLenis } from 'lenis/react'

export default function ScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.1, 
      duration: 1.5, 
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    }}>
      {children}
    </ReactLenis>
  )
}
