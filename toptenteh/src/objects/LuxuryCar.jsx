import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function LuxuryCar({ visible = true }) {
  const group = useRef()
  const wheelRefs = [useRef(), useRef(), useRef(), useRef()]

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.004
    group.current.position.y = Math.sin(t * 0.5) * 0.05
    wheelRefs.forEach((ref) => {
      if (ref.current) ref.current.rotation.x += 0.02
    })
  })

  const wheelPositions = [
    [-0.65, -0.22, 0.55],
    [0.65, -0.22, 0.55],
    [-0.65, -0.22, -0.55],
    [0.65, -0.22, -0.55],
  ]

  return (
    <group ref={group} visible={visible} scale={0.9}>
      {/* Car body lower */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[2.1, 0.42, 0.95]} />
        <meshStandardMaterial color="#0e0e1a" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Car body upper / cabin */}
      <mesh position={[0.06, 0.22, 0]}>
        <boxGeometry args={[1.25, 0.38, 0.82]} />
        <meshStandardMaterial color="#0e0e1a" roughness={0.15} metalness={0.9} />
      </mesh>

      {/* Windshield front */}
      <mesh position={[0.68, 0.2, 0]} rotation={[0, -0.5, 0]}>
        <planeGeometry args={[0.52, 0.34]} />
        <meshStandardMaterial color="#80b0e0" roughness={0.05} metalness={0.7} transparent opacity={0.55} />
      </mesh>

      {/* Windshield rear */}
      <mesh position={[-0.56, 0.2, 0]} rotation={[0, 2.6, 0]}>
        <planeGeometry args={[0.45, 0.32]} />
        <meshStandardMaterial color="#80b0e0" roughness={0.05} metalness={0.7} transparent opacity={0.55} />
      </mesh>

      {/* Roof */}
      <mesh position={[0.06, 0.42, 0]}>
        <boxGeometry args={[1.0, 0.04, 0.78]} />
        <meshStandardMaterial color="#0a0a14" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Gold grille */}
      <mesh position={[1.05, -0.05, 0]}>
        <boxGeometry args={[0.04, 0.18, 0.5]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.2} metalness={0.95} />
      </mesh>

      {/* Headlights */}
      {[-0.22, 0.22].map((z, i) => (
        <mesh key={i} position={[1.06, -0.06, z]}>
          <cylinderGeometry args={[0.07, 0.07, 0.03, 20]} />
          <meshStandardMaterial color="#ffffff" emissive="#aaccff" emissiveIntensity={0.4} roughness={0.1} metalness={0.5} />
        </mesh>
      ))}

      {/* Wheels */}
      {wheelPositions.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh ref={wheelRefs[i]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.14, 32]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.9} metalness={0.05} />
          </mesh>
          {/* Rim */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.15, 0.025, 8, 24]} />
            <meshStandardMaterial color="#c0c8d8" roughness={0.1} metalness={0.95} />
          </mesh>
          {/* Spoke x */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <boxGeometry args={[0.3, 0.025, 0.14]} />
            <meshStandardMaterial color="#b0b8c8" roughness={0.15} metalness={0.9} />
          </mesh>
          <mesh rotation={[Math.PI / 2, Math.PI / 3, 0]}>
            <boxGeometry args={[0.3, 0.025, 0.14]} />
            <meshStandardMaterial color="#b0b8c8" roughness={0.15} metalness={0.9} />
          </mesh>
          <mesh rotation={[Math.PI / 2, -Math.PI / 3, 0]}>
            <boxGeometry args={[0.3, 0.025, 0.14]} />
            <meshStandardMaterial color="#b0b8c8" roughness={0.15} metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
