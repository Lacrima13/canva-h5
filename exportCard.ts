import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sections = [
  {
    index: '01',
    title: '光的城市',
    en: 'CITY OF LIGHT',
    text: '光线不是照明工具，而是城市的温度系统。冷光让结构变得理性，暖光让记忆重新浮现。',
  },
  {
    index: '02',
    title: '路径的城市',
    en: 'CITY OF PATHS',
    text: '路径是移动留下的语言。每一次转向、停留和交汇，都会在城市内部生成新的隐形结构。',
  },
  {
    index: '03',
    title: '声音的城市',
    en: 'CITY OF SOUND',
    text: '声音会扩散、折返、叠加。它没有固定形状，却能短暂构成一座不可见的建筑。',
  },
  {
    index: '04',
    title: '记忆的城市',
    en: 'CITY OF MEMORY',
    text: '城市记忆不是纪念碑，而是被反复经过的角落、雨后的光线、夜晚道路上的短暂停留。',
  },
]

const memoryTexts = [
  '这里储存过一次短暂的相遇。',
  '这里的光线在雨后发生偏移。',
  '这里曾经是一条夜晚的路。',
  '这里留下过一段未被命名的路径。',
]

export const ScrollSections = () => {
  const rootRef = useRef<HTMLElement>(null)
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null)
  const [memory, setMemory] = useState(memoryTexts[0])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.narrative-card').forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.18, y: 70, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 76%',
              end: 'bottom 42%',
              scrub: 0.8,
            },
          },
        )
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const handleSoundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    setRipple({ x: event.clientX - rect.left, y: event.clientY - rect.top, id: Date.now() })
    setMemory(memoryTexts[Math.floor(Math.random() * memoryTexts.length)])
  }

  return (
    <section className="walk-section section-shell" id="walk" ref={rootRef}>
      <div className="section-heading sticky-heading">
        <span className="section-kicker">CITY WALK</span>
        <h2>滑动浏览城市切片</h2>
        <p>城市被分解为光、路径、声音与记忆。向下滑动时，图谱逐层显影。</p>
      </div>

      <div className="narrative-stack">
        {sections.map((item, idx) => (
          <article className="narrative-card glass-card" key={item.index} onClick={idx === 2 ? handleSoundClick : undefined}>
            <span className="narrative-index">{item.index}</span>
            <div>
              <p className="narrative-en">{item.en}</p>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              {idx === 2 && <small>点击卡片，生成一圈声音波纹。</small>}
              {idx === 3 && <strong className="memory-chip">{memory}</strong>}
            </div>
            <div className={`visual-token visual-token-${idx + 1}`} />
            {idx === 2 && ripple && (
              <span
                key={ripple.id}
                className="ripple"
                style={{ left: ripple.x, top: ripple.y }}
              />
            )}
          </article>
        ))}
      </div>
    </section>
  )
}
