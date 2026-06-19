import { motion } from 'framer-motion'
import { CityCanvas } from './CityCanvas'

export const HeroScene = () => {
  return (
    <section className="hero-section" id="top">
      <div className="hero-bg">
        <CityCanvas />
      </div>
      <div className="scanline" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.15, ease: 'easeOut' }}
      >
        <div className="eyebrow">AIGC × WEBGL × H5 EXHIBITION</div>
        <h1>无形城市图谱</h1>
        <p className="hero-subtitle">Invisible City Atlas</p>
        <p className="hero-text">
          城市并不只存在于建筑中。它也存在于路径、光线、声音与数据的流动里。
        </p>
        <a className="primary-button" href="#lab">
          ENTER THE ATLAS
        </a>
      </motion.div>
      <div className="hero-meta">
        <span>Density</span>
        <span>Light</span>
        <span>Flow</span>
        <span>Memory</span>
      </div>
    </section>
  )
}
