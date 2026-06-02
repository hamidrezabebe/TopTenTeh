import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CoffeeCup({ visible = true }) {
  const group = useRef()
  const steamRefs = [useRef(), useRef(), useRef()]

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.004
    group.current.position.y = Math.sin(t * 0.5) * 0.06
    steamRefs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.position.y = 0.55 + i * 0.22 + Math.sin(t * 1.5 + i) * 0.04
        ref.current.material.opacity = 0.15 + Math.sin(t + i) * 0.08
      }
    })
  })

  return (
    <group ref={group} visible={visible}>
      {/* Saucer */}
      <mesh position={[0, -0.58, 0]}>
        <cylinderGeometry args={[0.72, 0.68, 0.07, 40]} />
        <meshStandardMaterial color="#ede8e0" roughness={0.5} metalness={0.1} />
      </mesh>
      <mesh position={[0, -0.56, 0]}>
        <torusGeometry args={[0.48, 0.025, 8, 40]} />
        <meshStandardMaterial color="#d4cfc8" roughness={0.6} />
      </mesh>

      {/* Cup body */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.38, 0.3, 0.88, 40]} />
        <meshStandardMaterial color="#1c1008" roughness={0.55} metalness={0.1} />
      </mesh>

      {/* Gold rim band */}
      <mesh position={[0, 0.34, 0]}>
        <torusGeometry args={[0.382, 0.018, 8, 40]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Coffee surface */}
      <mesh position={[0, 0.34, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.02, 32]} />
        <meshStandardMaterial color="#3a1e08" roughness={0.9} metalness={0.0} />
      </mesh>

      {/* Latte art circle */}
      <mesh position={[0, 0.36, 0]}>
        <torusGeometry args={[0.16, 0.02, 6, 32]} />
        <meshStandardMaterial color="#c8a060" roughness={1.0} metalness={0.0} />
      </mesh>

      {/* Handle */}
      <mesh position={[0.52, 0.04, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.22, 0.038, 10, 24, Math.PI]} />
        <meshStandardMaterial color="#1c1008" roughness={0.55} metalness={0.1} />
      </mesh>

      {/* Steam wisps */}
      {[[-0.08, 0], [0.0, 0.1], [0.08, 0]].map(([x, rz], i) => (
        <mesh key={i} ref={steamRefs[i]} position={[x, 0.55 + i * 0.22, 0]}>
          <torusGeometry args={[0.08 + i * 0.03, 0.014, 6, 20, Math.PI * 1.2]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.18} roughness={1} />
        </mesh>
      ))}
    </group>
  )
}
