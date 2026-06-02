import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Particles({ count = 1800, accentColor = '#c9a84c' }) {
  const ref = useRef()

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)
    const color = new THREE.Color(accentColor)

    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22

      const brightness = 0.2 + Math.random() * 0.5
      if (Math.random() > 0.7) {
        col[i * 3]     = color.r * brightness
        col[i * 3 + 1] = color.g * brightness
        col[i * 3 + 2] = color.b * brightness
      } else {
        col[i * 3]     = brightness * 0.9
        col[i * 3 + 1] = brightness * 0.9
        col[i * 3 + 2] = brightness * 0.9
      }
    }
    return [pos, col]
  }, [count])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.018
    ref.current.rotation.x = t * 0.009
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        <bufferAttribute attach="attributes-color"    array={colors}    count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}
