import { animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Props {
  from: number
  to: number
}

export const Counter = ({ from, to }: Props) => {
  const [isStart, setStart] = useState(true)
  const nodeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = nodeRef.current
    if (node) {
      let controls: any
      if (isStart) {
        console.log('not here')
        from = 0
        node.textContent = '0'

        setTimeout(() => {
          controls = animate(from, to, {
            duration: 1,
            onUpdate(value) {
              node.textContent = parseInt(value.toFixed(0)).toLocaleString()
            }
          })
        }, 1500)

        setStart(false)
      } else {
        controls = animate(from, to, {
          duration: 1,
          onUpdate(value) {
            node.textContent = parseInt(value.toFixed(0)).toLocaleString()
          }
        })
      }

      //return () => controls.stop()
    }
  }, [from, to])

  return <div ref={nodeRef} />
}
