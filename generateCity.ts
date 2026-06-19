import { motion } from 'framer-motion'
import { densityLabels, flowLabels, lightLabels } from '../data/cityTypes'
import { useCityStore, type DensityLevel, type FlowMode, type LightMode } from '../store/cityStore'
import { CityCanvas } from './CityCanvas'

const densityOrder: DensityLevel[] = ['low', 'medium', 'high']
const lightOrder: LightMode[] = ['cold', 'warm', 'mixed']
const flowOrder: FlowMode[] = ['linear', 'circular', 'random']

export const ParameterPanel = () => {
  const {
    density,
    lightMode,
    flowMode,
    cityType,
    setDensity,
    setLightMode,
    setFlowMode,
    regenerateArchive,
  } = useCityStore()

  const densityIndex = densityOrder.indexOf(density)

  return (
    <section className="lab-section section-shell" id="lab">
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.75 }}
      >
        <span className="section-kicker">PARAMETER LAB</span>
        <h2>选择城市生成因子</h2>
        <p>每一个参数都会改变城市的结构：密度决定它的呼吸，光线决定它的温度，流动决定它的方向。</p>
      </motion.div>

      <div className="lab-grid">
        <div className="control-panel glass-card">
          <div className="control-block">
            <div className="control-title">
              <span>01</span>
              Density / 城市密度
            </div>
            <input
              className="density-range"
              type="range"
              min="0"
              max="2"
              value={densityIndex}
              onChange={(event) => setDensity(densityOrder[Number(event.target.value)])}
            />
            <div className="value-label">{densityLabels[density]}</div>
          </div>

          <div className="control-block">
            <div className="control-title">
              <span>02</span>
              Light / 光线状态
            </div>
            <div className="pill-row">
              {lightOrder.map((item) => (
                <button
                  key={item}
                  className={item === lightMode ? 'active' : ''}
                  onClick={() => setLightMode(item)}
                  type="button"
                >
                  {lightLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div className="control-block">
            <div className="control-title">
              <span>03</span>
              Flow / 流动方式
            </div>
            <div className="flow-grid">
              {flowOrder.map((item) => (
                <button
                  key={item}
                  className={item === flowMode ? 'active flow-button' : 'flow-button'}
                  onClick={() => setFlowMode(item)}
                  type="button"
                >
                  <i className={`flow-icon ${item}`} />
                  {flowLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <button className="secondary-button" onClick={regenerateArchive} type="button">
            REGENERATE SAMPLE ID
          </button>
        </div>

        <div className="preview-card glass-card">
          <div className="preview-topline">
            <span>CITY SAMPLE GENERATED</span>
            <strong>{cityType}</strong>
          </div>
          <div className="preview-canvas-wrap">
            <CityCanvas compact />
          </div>
        </div>
      </div>
    </section>
  )
}
