import { Line } from '@react-three/drei'
import type { CityData } from '../utils/generateCity'

interface CityLinesProps {
  data: CityData
}

export const CityLines = ({ data }: CityLinesProps) => {
  return (
    <group>
      {data.lines.slice(0, 190).map((line) => (
        <Line
          key={line.id}
          points={[line.from, line.to]}
          color={data.palette.primary}
          lineWidth={0.7}
          transparent
          opacity={0.32}
        />
      ))}
      {data.nodes.map((node) => (
        <mesh key={node.id} position={node.position} scale={node.scale * 0.05}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={data.palette.secondary}
            emissive={data.palette.primary}
            emissiveIntensity={1.6}
            roughness={0.22}
            metalness={0.4}
          />
        </mesh>
      ))}
    </group>
  )
}
