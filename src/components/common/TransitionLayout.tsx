import styles from '@styles/components/common/TransitionLayout.module.css'

import React from 'react'
import clsx from 'clsx'

const TransitionLayout = ({ children }: { children: unknown }) => {
  const [displayChildren, setDisplayChildren] = React.useState(children)
  const [display, setDisplay] = React.useState(false)

  React.useEffect(() => {
    setDisplay(true)
  }, [])

  React.useEffect(() => {
    if (children !== displayChildren) setDisplay(false)
  }, [children, displayChildren])

  return (
    <div
      className={clsx(styles.root, { [styles['root--display']]: display })}
      onTransitionEnd={() => {
        if (display === false) {
          setDisplayChildren(children)
          setDisplay(true)
        }
      }}
    >
      {displayChildren}
    </div>
  )
}

export default TransitionLayout
