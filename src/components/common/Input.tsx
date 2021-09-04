import React from 'react'
import clsx from 'clsx'

import styles from '@styles/components/common/Input.module.css'

interface InputProps {
  size?: 'lg' | 'md'
  placeholder?: string
  name?: string
  defaultValue?: string
  value?: string
  required?: boolean
  maxLength?: number
  autoFocus?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, styles[`input--size-${size}`])}
        {...rest}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
