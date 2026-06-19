import { create } from 'zustand'

export type DensityLevel = 'low' | 'medium' | 'high'
export type LightMode = 'cold' | 'warm' | 'mixed'
export type FlowMode = 'linear' | 'circular' | 'random'
export type CityType = 'Silent City' | 'Pulse City' | 'Floating City' | 'Split City' | 'Liminal City'

export interface CityState {
  density: DensityLevel
  lightMode: LightMode
  flowMode: FlowMode
  cityType: CityType
  archiveId: string
  setDensity: (density: DensityLevel) => void
  setLightMode: (lightMode: LightMode) => void
  setFlowMode: (flowMode: FlowMode) => void
  regenerateArchive: () => void
}

const getCityType = (density: DensityLevel, lightMode: LightMode, flowMode: FlowMode): CityType => {
  if (density === 'low' && lightMode === 'cold' && flowMode === 'linear') return 'Silent City'
  if (density === 'high' && lightMode === 'mixed' && flowMode === 'random') return 'Pulse City'
  if (density === 'medium' && lightMode === 'warm' && flowMode === 'circular') return 'Floating City'
  if (density === 'high' && lightMode === 'cold' && flowMode === 'circular') return 'Split City'
  return 'Liminal City'
}

const makeArchiveId = () => {
  const num = Math.floor(100 + Math.random() * 899)
  const suffix = Math.random().toString(36).slice(2, 5).toUpperCase()
  return `ICA-2099-${num}-${suffix}`
}

export const useCityStore = create<CityState>((set, get) => ({
  density: 'medium',
  lightMode: 'mixed',
  flowMode: 'random',
  cityType: 'Liminal City',
  archiveId: makeArchiveId(),
  setDensity: (density) => {
    const { lightMode, flowMode } = get()
    set({ density, cityType: getCityType(density, lightMode, flowMode) })
  },
  setLightMode: (lightMode) => {
    const { density, flowMode } = get()
    set({ lightMode, cityType: getCityType(density, lightMode, flowMode) })
  },
  setFlowMode: (flowMode) => {
    const { density, lightMode } = get()
    set({ flowMode, cityType: getCityType(density, lightMode, flowMode) })
  },
  regenerateArchive: () => set({ archiveId: makeArchiveId() }),
}))
