import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Grid, PerspectiveCamera, Stars } from '@react-three/drei'
import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { useCityStore } from '../store/cityStore'
import { generateCity } from '../utils/generateCity'
import { CityLines } from './CityLines'
import { CityParticles } from './CityParticles'

interface CityCanvasProps {
  compact?: boolean
}

const CityField = ({ compact = false }: CityCanvasProps) => {
  const groupRef = useRef<THREE.Group>(null)
  const { density, lightMode, flowMode } = useCityStore()
  const data = useMemo(() => generateCity(density, lightMode, flowMode), [density, lightMode, flowMode])

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return
    const elapsed = clock.getElapsedTime()
    groupRef.current.rotation.y = elapsed * 0.045 + pointer.x * 0.16
    groupRef.current.rotation.x = -0.18 + pointer.y * 0.08
  })

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 5, 2]} intensity={1.4} color={data.palette.primary} />
      <pointLight position={[-4, 2.4, -3]} intensity={18} color={data.palette.secondary} distance={8} />
      <Stars radius={18} depth={20} count={compact ? 450 : 900} factor={3} fade speed={0.4} />
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.18}>
        <group ref={groupRef} position={[0, compact ? -0.6 : -0.85, 0]} scale={compact ? 0.72 : 1}>
          <CityLines data={data} />
          <CityParticles data={data} flowMode={flowMode} />
        </group>
      </Float>
      <Grid
        position={[0, -1.04, 0]}
        args={[11, 11]}
        cellSize={0.5}
        cellThickness={0.42}
        cellColor={data.palette.primary}
        sectionSize={2.5}
        sectionThickness={0.72}
        sectionColor={data.palette.secondary}
        fadeDistance={11}
        fadeStrength={1.3}
        infiniteGrid
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.6} intensity={1.25} mipmapBlur />
        <Vignette offset={0.24} darkness={0.72} />
      </EffectComposer>
    </>
  )
}

export const CityCanvas = ({ compact = false }: CityCanvasProps) => {
  return (
    <Canvas className="city-canvas" dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
      <PerspectiveCamera makeDefault position={[0, compact ? 3.4 : 3.8, compact ? 6.8 : 7.4]} fov={compact ? 54 : 48} />
      <Suspense fallback={null}>
        <CityField compact={compact} />
      </Suspense>
    </Canvas>
  )
}
