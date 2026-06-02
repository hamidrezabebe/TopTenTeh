import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function LuxuryHouse({ visible = true }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.003
    group.current.position.y = Math.sin(t * 0.5) * 0.05
  })

  return (
    <group ref={group} visible={visible} scale={0.88}>
      {/* Foundation */}
      <mesh position={[0, -0.95, 0]}>
        <boxGeometry args={[1.8, 0.1, 1.4]} />
        <meshStandardMaterial color="#1a1812" roughness={0.6} metalness={0.2} />
      </mesh>

      {/* Main body */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[1.5, 1.1, 1.1]} />
        <meshStandardMaterial color="#f2ece0" roughness={0.85} metalness={0.0} />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0.52, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[1.05, 0.7, 4]} />
        <meshStandardMaterial color="#2c1e14" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Roof trim */}
      <mesh position={[0, 0.17, 0]}>
        <boxGeometry args={[1.6, 0.06, 1.2]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Front door */}
      <mesh position={[0, -0.62, 0.56]}>
        <boxGeometry args={[0.26, 0.55, 0.04]} />
        <meshStandardMaterial color="#2a1408" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Door handle */}
      <mesh position={[0.1, -0.65, 0.59]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.1} metalness={0.95} />
      </mesh>

      {/* Windows front — pair */}
      {[-0.42, 0.42].map((x, i) => (
        <group key={i}>
          <mesh position={[x, -0.28, 0.565]}>
            <boxGeometry args={[0.28, 0.28, 0.04]} />
            <meshStandardMaterial color="#a8c8e8" roughness={0.05} metalness={0.5} transparent opacity={0.75} />
          </mesh>
          {/* window frame */}
          <mesh position={[x, -0.28, 0.57]}>
            <boxGeometry args={[0.3, 0.3, 0.02]} />
            <meshStandardMaterial color="#e0d8c8" roughness={0.7} metalness={0.1} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Side windows */}
      {[-0.565, 0.565].map((z, i) => (
        <mesh key={i} position={[0, -0.28, z]}>
          <boxGeometry args={[0.5, 0.28, 0.04]} />
          <meshStandardMaterial color="#a8c8e8" roughness={0.05} metalness={0.5} transparent opacity={0.75} />
        </mesh>
      ))}

      {/* Chimney */}
      <mesh position={[0.45, 0.62, 0.1]}>
        <boxGeometry args={[0.16, 0.45, 0.16]} />
        <meshStandardMaterial color="#2c1e14" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Garage door */}
      <mesh position={[0, -0.62, -0.56]}>
        <boxGeometry args={[0.7, 0.55, 0.04]} />
        <meshStandardMaterial color="#d8d0c0" roughness={0.6} metalness={0.2} />
      </mesh>
    </group>
  )
}
