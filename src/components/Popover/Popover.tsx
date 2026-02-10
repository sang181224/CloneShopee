import { useFloating, arrow, FloatingPortal, shift, offset, type Placement } from '@floating-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState, type ElementType } from 'react'

interface Props {
  children: React.ReactNode
  renderPopover?: React.ReactNode
  className?: string
  as?: ElementType
  initalOpen?: boolean
  placement?: Placement
  offsetValue?: number
}

export default function Popover({
  children,
  renderPopover,
  className,
  as: Element = 'div',
  initalOpen,
  placement = 'bottom-end',
  offsetValue = 0
}: Props) {
  const arrowRef = useRef(null)
  const { refs, floatingStyles, middlewareData } = useFloating({
    middleware: [
      offset(offsetValue),
      shift(),
      arrow({
        element: arrowRef
      })
    ],
    placement: placement
  })
  const [open, setOpen] = useState(initalOpen || false)
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <Element className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}
      <FloatingPortal>
        <AnimatePresence>
          {open && (
            <div ref={refs.setFloating} style={floatingStyles} className='z-[9999]'>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
              >
                <div
                  ref={arrowRef}
                  style={{
                    position: 'absolute',
                    left: middlewareData.arrow?.x,
                    top: middlewareData.arrow?.y
                  }}
                  className='z-1 absolute translate-y-[-98%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                />
                {renderPopover}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
