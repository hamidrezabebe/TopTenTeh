import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function TennisBall({ visible = true }) {
  const group = useRef()

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.elapsedTime
    group.current.rotation.y += 0.006
    group.current.rotation.z = Math.sin(t * 0.4) * 0.08
    group.current.position.y = Math.sin(t * 0.7) * 0.07
  })

  return (
    <group ref={group} visible={visible}>
      {/* Main ball */}
      <mesh>
        <sphereGeometry args={[0.78, 48, 48]} />
        <meshStandardMaterial color="#c8ee30" roughness={0.65} metalness={0.0} />
      </mesh>

      {/* Seam curve 1 */}
      <mesh rotation={[0.3, 0.6, 0]}>
        <torusGeometry args={[0.79, 0.022, 12, 80, Math.PI * 1.6]} />
        <meshStandardMaterial color="#f0f8e0" roughness={0.8} metalness={0.0} />
      </mesh>

      {/* Seam curve 2 — mirrored */}
      <mesh rotation={[0.3 + Math.PI, 0.6 + Math.PI, 0]}>
        <torusGeometry args={[0.79, 0.022, 12, 80, Math.PI * 1.6]} />
        <meshStandardMaterial color="#f0f8e0" roughness={0.8} metalness={0.0} />
      </mesh>

      {/* Subtle fuzz layer */}
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#d4f040" roughness={1.0} transparent opacity={0.15} wireframe={false} />
      </mesh>
    </group>
  )
}
