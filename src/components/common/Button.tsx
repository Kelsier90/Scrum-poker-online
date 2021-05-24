import React from 'react'
import clsx from 'clsx'

import styles from '../../../styles/components/common/Button.module.css'

interface ButtonProps {
  size?: 'lg' | 'md' | 'sm'
  color?: 'primary' | 'secondary' | 'success'
  type?: 'button' | 'submit'
  children: unknown
  onClick?: () => void
  className?: string
}

const Button = ({
  children,
  size = 'md',
  color = 'primary',
  type = 'button',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[`button--size-${size}`],
        styles[`button--color-${color}`],
        className
      )}
      {...rest}
    >
      <div className={styles.button__content}>{children}</div>
    </button>
  )
}

export default Button
