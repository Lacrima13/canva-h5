import type { CityType, DensityLevel, FlowMode, LightMode } from '../store/cityStore'

export const densityLabels: Record<DensityLevel, string> = {
  low: 'Low Density / 低密度',
  medium: 'Medium Density / 中密度',
  high: 'High Density / 高密度',
}

export const lightLabels: Record<LightMode, string> = {
  cold: 'Cold Light / 冷光',
  warm: 'Warm Light / 暖光',
  mixed: 'Mixed Light / 混合光',
}

export const flowLabels: Record<FlowMode, string> = {
  linear: 'Linear Flow / 直线流动',
  circular: 'Circular Flow / 环形流动',
  random: 'Random Flow / 随机流动',
}

export const cityDescriptions: Record<CityType, string> = {
  'Silent City': '这是一座由冷光、低频路径和稀疏节点构成的静默城市。它没有夸张的轮廓，只在缓慢的数据流里保持呼吸。',
  'Pulse City': '这是一座由高速路径和不稳定光源构成的脉冲城市。它没有固定边界，只在数据流动、光线偏移和路径交汇的瞬间显形。',
  'Floating City': '这是一座漂浮在暖光与环形轨迹中的城市。它像一组缓慢旋转的记忆切片，在时间内部形成柔和的空间秩序。',
  'Split City': '这是一座不断裂变与重组的城市。冷光穿过高密度网格，路径在循环中分叉，形成锋利而不稳定的空间结构。',
  'Liminal City': '这是一座处于边界状态的城市。它介于秩序与随机、记忆与数据、建筑与流动之间，持续生成新的空间图谱。',
}

export const cityKeywords: Record<CityType, string[]> = {
  'Silent City': ['稀疏', '冷静', '静默', '低频'],
  'Pulse City': ['高频', '断裂', '聚合', '闪烁'],
  'Floating City': ['漂浮', '环形', '暖光', '记忆'],
  'Split City': ['裂变', '重组', '冷光', '循环'],
  'Liminal City': ['边界', '过渡', '混合', '显影'],
}

export const lightPalettes: Record<LightMode, { primary: string; secondary: string; accent: string }> = {
  cold: { primary: '#74d7ff', secondary: '#9cc9ff', accent: '#d8dee9' },
  warm: { primary: '#ffd08a', secondary: '#ff8a5c', accent: '#fff0cf' },
  mixed: { primary: '#00f5ff', secondary: '#8b5cf6', accent: '#ff7ad9' },
}
