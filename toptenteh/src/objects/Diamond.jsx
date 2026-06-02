import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Diamond({ visible = true }) {
  const group = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.006
    group.current.rotation.z = Math.sin(t * 0.3) * 0.05
    group.current.position.y = Math.sin(t * 0.6) * 0.07
    if (innerRef.current) {
      innerRef.current.rotation.y -= 0.01
    }
  })

  return (
    <group ref={group} visible={visible}>
      {/* Main diamond body */}
      <mesh scale={[1, 1.5, 1]}>
        <octahedronGeometry args={[0.82, 0]} />
        <meshStandardMaterial
          color="#c8e8ff"
          roughness={0.0}
          metalness={0.9}
          transparent
          opacity={0.85}
          envMapIntensity={2}
        />
      </mesh>

      {/* Inner facet glow */}
      <mesh ref={innerRef} scale={[0.7, 1.1, 0.7]}>
        <octahedronGeometry args={[0.82, 0]} />
        <meshStandardMaterial
          color="#60a8ff"
          roughness={0.0}
          metalness={1.0}
          transparent
          opacity={0.2}
          side={2}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh scale={[1.08, 1.6, 1.08]}>
        <octahedronGeometry args={[0.82, 0]} />
        <meshStandardMaterial
          color="#a0d0ff"
          roughness={0.0}
          metalness={0.5}
          transparent
          opacity={0.08}
          side={1}
        />
      </mesh>

      {/* Table facet top */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.04, 8]} />
        <meshStandardMaterial color="#e0f0ff" roughness={0.0} metalness={0.95} transparent opacity={0.9} />
      </mesh>

      {/* Gold girdle ring */}
      <mesh>
        <torusGeometry args={[0.83, 0.016, 8, 64]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.1} metalness={0.98} />
      </mesh>

      {/* Sparkle points */}
      {[
        [0.95, 0.4, 0], [-0.95, 0.4, 0], [0, 0.4, 0.95], [0, 0.4, -0.95],
        [0.67, 0.4, 0.67], [-0.67, 0.4, 0.67], [0.67, 0.4, -0.67], [-0.67, 0.4, -0.67],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x * 0.78, y * 0.5, z * 0.78]}>
          <sphereGeometry args={[0.018, 6, 6]} />
          <meshStandardMaterial color="#ffffff" emissive="#88ccff" emissiveIntensity={0.6} roughness={0} metalness={1} />
        </mesh>
      ))}
    </group>
  )
}
