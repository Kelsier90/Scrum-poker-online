import React from 'react'
import clsx from 'clsx'

import styles from '@styles/components/common/Button.module.css'

interface ButtonProps {
  size?: 'lg' | 'md' | 'sm'
  compact?: boolean
  color?: 'primary' | 'secondary' | 'success' | 'transparent'
  type?: 'button' | 'submit'
  children: unknown
  onClick?: () => void
  className?: string
  applyMargin?: boolean
  startIcon?: unknown
}

const Button = ({
  children,
  size = 'md',
  compact = false,
  color = 'primary',
  type = 'button',
  className,
  applyMargin = true,
  startIcon,
  ...rest
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[`button--size-${size}`],
        styles[`button--color-${color}`],
        { [styles['button--compact-true']]: compact },
        { [styles['button--margin-false']]: !applyMargin },
        { [styles['button--hide-text-sm']]: !!startIcon },
        className
      )}
      {...rest}
    >
      <div className={styles.button__content}>
        {startIcon && (
          <div className={styles.button__content__icon}>{startIcon}</div>
        )}
        <div className={styles.button__content__text}>{children}</div>
      </div>
    </button>
  )
}

export default Button
