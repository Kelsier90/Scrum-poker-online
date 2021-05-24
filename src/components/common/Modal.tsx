import React from 'react'
import clsx from 'clsx'

import styles from '../../../styles/components/common/Modal.module.css'

interface ModalProps {
  title: string | React.ReactNode
  open: boolean
  onClose: () => void
  children: unknown
}

const Modal = ({ title, open, onClose, children }) => {
  return (
    <>
      <div
        className={clsx(styles.modal, {
          [styles['modal--status-active']]: open
        })}
        onClick={onClose}
      >
        <div
          role="dialog"
          className={styles.modal__dialog}
          onClick={ev => ev.stopPropagation()}
        >
          <h2 className={styles.modal__dialog__title}>{title}</h2>

          <div className={styles.modal__dialog__content}>{children}</div>

          <button
            type="button"
            className={styles.modal__dialog__close}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
      </div>
    </>
  )
}

export default Modal
