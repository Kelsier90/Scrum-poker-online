import React from 'react'
import clsx from 'clsx'

import styles from '@styles/components/common/Modal.module.css'

interface ModalProps {
  title: string | React.ReactNode
  open: boolean
  onClose?: () => void
  children: unknown
}

const Modal = ({ title, open, onClose, children }: ModalProps) => {
  return (
    <>
      <div
        className={clsx(styles.root, {
          [styles['root--status-active']]: open
        })}
        onClick={onClose}
      >
        <div
          role="dialog"
          className={styles.root__dialog}
          onClick={ev => ev.stopPropagation()}
        >
          <h2 className={styles.root__dialog__title}>{title}</h2>

          <div className={styles.root__dialog__content}>{children}</div>

          {onClose && (
            <button
              type="button"
              className={styles.root__dialog__close}
              onClick={onClose}
            >
              &times;
            </button>
          )}
        </div>
      </div>
    </>
  )
}

export default Modal
