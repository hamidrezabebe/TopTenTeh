import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function Burger({ visible = true }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.004
    group.current.position.y = Math.sin(t * 0.6) * 0.06
  })

  return (
    <group ref={group} visible={visible}>
      {/* Sesame seeds */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i / 14) * Math.PI * 2
        const r = 0.28 + (i % 3) * 0.08
        return (
          <mesh key={i} position={[Math.cos(angle) * r, 0.58 + (i % 2) * 0.04, Math.sin(angle) * r]}>
            <sphereGeometry args={[0.035, 6, 6]} />
            <meshStandardMaterial color="#f0e0a0" roughness={0.9} />
          </mesh>
        )
      })}

      {/* Bun top */}
      <mesh position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
        <meshStandardMaterial color="#d4935a" roughness={0.55} metalness={0.05} />
      </mesh>

      {/* Lettuce */}
      <mesh position={[0, 0.12, 0]} rotation={[0.08, 0.4, 0.05]}>
        <torusGeometry args={[0.6, 0.09, 8, 40]} />
        <meshStandardMaterial color="#3d7a3d" roughness={0.95} />
      </mesh>

      {/* Cheese */}
      <mesh position={[0, 0.06, 0]} rotation={[0, 0.35, 0]}>
        <boxGeometry args={[1.25, 0.055, 1.25]} />
        <meshStandardMaterial color="#ffaa22" roughness={0.6} metalness={0.0} transparent opacity={0.95} />
      </mesh>

      {/* Patty */}
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.64, 0.62, 0.14, 32]} />
        <meshStandardMaterial color="#3a1a0a" roughness={0.92} metalness={0.04} />
      </mesh>

      {/* Bun bottom */}
      <mesh position={[0, -0.32, 0]}>
        <cylinderGeometry args={[0.68, 0.66, 0.22, 32]} />
        <meshStandardMaterial color="#d4935a" roughness={0.55} metalness={0.05} />
      </mesh>
    </group>
  )
}
