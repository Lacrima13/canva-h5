import { toPng } from 'html-to-image'

export const exportNodeAsPng = async (node: HTMLElement, filename: string) => {
  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio: 2,
    backgroundColor: '#05070a',
  })

  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  link.click()
}
