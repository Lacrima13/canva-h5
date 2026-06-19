import { motion } from 'framer-motion'

export const Navigation = () => {
  return (
    <motion.header
      className="top-nav"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      <div className="brand-mark">ICA</div>
      <nav>
        <a href="#lab">参数实验室</a>
        <a href="#walk">城市切片</a>
        <a href="#archive">生成档案</a>
      </nav>
    </motion.header>
  )
}
