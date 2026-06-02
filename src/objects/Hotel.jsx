import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Hotel({ visible = true }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.003
    group.current.position.y = Math.sin(t * 0.5) * 0.05
  })

  const floors = 9
  const windowPositions = []
  for (let f = 0; f < floors; f++) {
    for (let w = 0; w < 3; w++) {
      windowPositions.push({ f, w, side: 'front' })
      windowPositions.push({ f, w, side: 'back' })
      windowPositions.push({ f, w, side: 'left' })
      windowPositions.push({ f, w, side: 'right' })
    }
  }

  return (
    <group ref={group} visible={visible} scale={0.85}>
      {/* Main tower */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 3.2, 0.9]} />
        <meshStandardMaterial color="#141824" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* Side wings */}
      <mesh position={[-0.75, -0.6, 0]}>
        <boxGeometry args={[0.6, 2.0, 0.7]} />
        <meshStandardMaterial color="#181e2c" roughness={0.28} metalness={0.75} />
      </mesh>
      <mesh position={[0.75, -0.6, 0]}>
        <boxGeometry args={[0.6, 2.0, 0.7]} />
        <meshStandardMaterial color="#181e2c" roughness={0.28} metalness={0.75} />
      </mesh>

      {/* Glass windows front */}
      {Array.from({ length: floors }).map((_, f) =>
        Array.from({ length: 3 }).map((_, w) => (
          <mesh key={`f${f}w${w}`} position={[-0.24 + w * 0.24, 1.1 - f * 0.38, 0.456]}>
            <planeGeometry args={[0.14, 0.2]} />
            <meshStandardMaterial color="#4488cc" roughness={0.05} metalness={0.9} transparent opacity={0.8} />
          </mesh>
        ))
      )}

      {/* Glass windows back */}
      {Array.from({ length: floors }).map((_, f) =>
        Array.from({ length: 3 }).map((_, w) => (
          <mesh key={`b${f}w${w}`} position={[-0.24 + w * 0.24, 1.1 - f * 0.38, -0.456]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[0.14, 0.2]} />
            <meshStandardMaterial color="#4488cc" roughness={0.05} metalness={0.9} transparent opacity={0.8} />
          </mesh>
        ))
      )}

      {/* Spire */}
      <mesh position={[0, 1.85, 0]}>
        <coneGeometry args={[0.08, 0.7, 8]} />
        <meshStandardMaterial color="#c0c8d8" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Spire base ring */}
      <mesh position={[0, 1.52, 0]}>
        <torusGeometry args={[0.12, 0.025, 8, 24]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Podium base */}
      <mesh position={[0, -1.72, 0]}>
        <boxGeometry args={[1.5, 0.14, 1.5]} />
        <meshStandardMaterial color="#0e121a" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Entrance canopy */}
      <mesh position={[0, -1.05, 0.58]}>
        <boxGeometry args={[0.5, 0.05, 0.3]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  )
}
