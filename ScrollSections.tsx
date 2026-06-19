import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import type { CityData } from '../utils/generateCity'
import type { FlowMode } from '../store/cityStore'

interface CityParticlesProps {
  data: CityData
  flowMode: FlowMode
}

export const CityParticles = ({ data, flowMode }: CityParticlesProps) => {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(data.particleCount * 3)
    for (let i = 0; i < data.particleCount; i += 1) {
      const i3 = i * 3
      const angle = Math.random() * Math.PI * 2
      const radius = 1 + Math.random() * 5.4
      arr[i3] = Math.cos(angle) * radius
      arr[i3 + 1] = Math.random() * 3.6 - 0.55
      arr[i3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [data.particleCount])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const elapsed = clock.getElapsedTime()

    if (flowMode === 'linear') {
      pointsRef.current.rotation.y = Math.sin(elapsed * 0.06) * 0.08
      pointsRef.current.position.x = Math.sin(elapsed * data.flowSpeed) * 0.22
    }

    if (flowMode === 'circular') {
      pointsRef.current.rotation.y = elapsed * data.flowSpeed
      pointsRef.current.rotation.x = Math.sin(elapsed * 0.12) * 0.06
    }

    if (flowMode === 'random') {
      pointsRef.current.rotation.y = elapsed * data.flowSpeed
      pointsRef.current.rotation.z = Math.sin(elapsed * 0.31) * 0.09
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        color={data.palette.accent}
        size={0.018}
        transparent
        opacity={0.72}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
