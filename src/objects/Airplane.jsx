import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Airplane({ visible = true }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.004
    group.current.position.y = Math.sin(t * 0.5) * 0.07
    group.current.rotation.z = Math.sin(t * 0.3) * 0.04
  })

  return (
    <group ref={group} visible={visible} scale={0.82}>
      {/* Fuselage */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.16, 0.12, 2.6, 24]} />
        <meshStandardMaterial color="#f0f0f2" roughness={0.25} metalness={0.7} />
      </mesh>

      {/* Nose cone */}
      <mesh position={[1.42, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[0.16, 0.32, 20]} />
        <meshStandardMaterial color="#f5f5f8" roughness={0.2} metalness={0.65} />
      </mesh>

      {/* Main wings */}
      <mesh position={[-0.1, 0, 0]}>
        <boxGeometry args={[0.06, 2.0, 0.78]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.28} metalness={0.65} />
      </mesh>

      {/* Wing winglets */}
      {[-1.0, 1.0].map((y, i) => (
        <mesh key={i} position={[-0.1, y, -0.3]} rotation={[0, 0, i === 0 ? -0.4 : 0.4]}>
          <boxGeometry args={[0.04, 0.3, 0.22]} />
          <meshStandardMaterial color="#d8d8e0" roughness={0.3} metalness={0.6} />
        </mesh>
      ))}

      {/* Horizontal stabilizer */}
      <mesh position={[-1.05, 0, 0]}>
        <boxGeometry args={[0.04, 0.85, 0.3]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.28} metalness={0.65} />
      </mesh>

      {/* Vertical stabilizer */}
      <mesh position={[-0.9, 0, 0]}>
        <boxGeometry args={[0.38, 0.04, 0.3]} />
        <meshStandardMaterial color="#e8e8ec" roughness={0.28} metalness={0.65} />
      </mesh>

      {/* Engines x2 */}
      {[-0.6, 0.6].map((y, i) => (
        <group key={i} position={[0.12, y, 0.25]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.1, 0.08, 0.5, 20]} />
            <meshStandardMaterial color="#c8c8d0" roughness={0.2} metalness={0.85} />
          </mesh>
          {/* Engine intake ring */}
          <mesh position={[0.28, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.1, 0.015, 8, 20]} />
            <meshStandardMaterial color="#c9a84c" roughness={0.2} metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Cabin windows strip */}
      {Array.from({ length: 10 }).map((_, i) => (
        <mesh key={i} position={[0.9 - i * 0.2, 0.165, 0]}>
          <boxGeometry args={[0.1, 0.04, 0.04]} />
          <meshStandardMaterial color="#80b8e8" roughness={0.05} metalness={0.6} transparent opacity={0.8} />
        </mesh>
      ))}

      {/* Livery stripe */}
      <mesh position={[0, -0.01, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.162, 0.122, 2.6, 24, 1, false, 0, 0.2]} />
        <meshStandardMaterial color="#c9a84c" roughness={0.3} metalness={0.8} />
      </mesh>
    </group>
  )
}
