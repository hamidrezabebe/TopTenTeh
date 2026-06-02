import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, DepthOfField, EffectComposer, Bloom } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import gsap from 'gsap'

import Burger      from './objects/Burger'
import Hotel       from './objects/Hotel'
import TennisBall  from './objects/TennisBall'
import CoffeeCup   from './objects/CoffeeCup'
import LuxuryCar   from './objects/LuxuryCar'
import LuxuryHouse from './objects/LuxuryHouse'
import Airplane    from './objects/Airplane'
import Diamond     from './objects/Diamond'
import Particles   from './objects/Particles'
import { CATEGORIES } from './data'

// ─── PER-OBJECT COMPONENTS MAP ───────────────────────────────────────────────
const OBJECTS = [Burger, Hotel, TennisBall, CoffeeCup, LuxuryCar, LuxuryHouse, Airplane, Diamond]

// ─── SCENE LIGHTS ────────────────────────────────────────────────────────────
function SceneLights({ accentColor }) {
  const keyRef   = useRef()
  const fillRef  = useRef()
  const rimRef   = useRef()

  useEffect(() => {
    if (!fillRef.current) return
    gsap.to(fillRef.current.color, {
      r: parseInt(accentColor.slice(1, 3), 16) / 255,
      g: parseInt(accentColor.slice(3, 5), 16) / 255,
      b: parseInt(accentColor.slice(5, 7), 16) / 255,
      duration: 1.4,
      ease: 'power2.inOut',
    })
  }, [accentColor])

  return (
    <>
      <ambientLight intensity={0.18} />
      <directionalLight ref={keyRef} position={[3, 5, 4]} intensity={1.8} color="#fff8e8" castShadow />
      <pointLight ref={fillRef} position={[-3, 2, 3]} intensity={1.6} distance={18} color={accentColor} />
      <directionalLight ref={rimRef} position={[-4, -2, -5]} intensity={0.5} color="#4468cc" />
      <pointLight position={[0, -3, 0]} intensity={0.3} color="#111122" />
    </>
  )
}

// ─── MORPHING OBJECT GROUP ────────────────────────────────────────────────────
function MorphGroup({ catIndex, transitioning, onTransitionComplete }) {
  const groupRef = useRef()
  const prevRef  = useRef()
  const nextRef  = useRef()

  const [prevIdx, setPrevIdx] = useState(catIndex)
  const [nextIdx, setNextIdx] = useState(catIndex)
  const [phase, setPhase]     = useState('idle') // idle | out | in

  useEffect(() => {
    if (catIndex === prevIdx) return
    setNextIdx(catIndex)
    setPhase('out')

    // Animate current out
    if (prevRef.current) {
      gsap.to(prevRef.current.scale, {
        x: 0, y: 0, z: 0, duration: 0.55,
        ease: 'back.in(2)',
        onComplete: () => {
          setPhase('in')
          setPrevIdx(catIndex)
          // Animate next in
          if (nextRef.current) {
            gsap.fromTo(
              nextRef.current.scale,
              { x: 0, y: 0, z: 0 },
              { x: 1, y: 1, z: 1, duration: 0.75, ease: 'elastic.out(1, 0.55)',
                onComplete: () => { setPhase('idle'); onTransitionComplete?.() }
              }
            )
            gsap.fromTo(
              nextRef.current.rotation,
              { y: Math.PI },
              { y: 0, duration: 0.75, ease: 'power3.out' }
            )
          }
        },
      })
      gsap.to(prevRef.current.rotation, {
        y: prevRef.current.rotation.y + Math.PI * 1.5,
        duration: 0.55,
        ease: 'power2.in',
      })
    }
  }, [catIndex])

  useFrame(() => {
    if (!groupRef.current) return
    // Subtle camera-sync breathing
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, 0, 0.05)
  })

  const PrevObj = OBJECTS[prevIdx] || Burger
  const NextObj = OBJECTS[nextIdx] || Burger
  const showPrev = prevIdx !== nextIdx || phase === 'idle'
  const showNext = nextIdx !== prevIdx

  return (
    <group ref={groupRef}>
      {showPrev && (
        <group ref={prevRef}>
          <PrevObj />
        </group>
      )}
      {showNext && (
        <group ref={nextRef} scale={[0, 0, 0]}>
          <NextObj />
        </group>
      )}
      {!showNext && (
        <group ref={nextRef}>
          <PrevObj />
        </group>
      )}
    </group>
  )
}

// ─── CAMERA RIG ───────────────────────────────────────────────────────────────
function CameraRig({ catIndex }) {
  const { camera } = useThree()

  useEffect(() => {
    gsap.to(camera.position, {
      x: (Math.random() - 0.5) * 0.6,
      y: (Math.random() - 0.5) * 0.3,
      z: 4.8 + (Math.random() - 0.5) * 0.4,
      duration: 1.6,
      ease: 'power2.inOut',
    })
  }, [catIndex])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    camera.position.x += (Math.sin(t * 0.15) * 0.18 - camera.position.x) * 0.012
    camera.position.y += (Math.cos(t * 0.1)  * 0.10 - camera.position.y) * 0.012
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── CANVAS SCENE ─────────────────────────────────────────────────────────────
export default function Scene({ catIndex, accentColor }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.8], fov: 45 }}
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.25 }}
      shadows
      style={{ background: '#000000' }}
    >
      <fog attach="fog" args={['#000000', 8, 28]} />
      <SceneLights accentColor={accentColor} />
      <CameraRig catIndex={catIndex} />
      <Particles count={1800} accentColor={accentColor} />
      <MorphGroup catIndex={catIndex} />
      <Environment preset="city" />
    </Canvas>
  )
}
