import React from 'react'
import Modal from '../../common/Modal'
import QRCode from 'react-qr-code'

interface RoomQRModalProps {
  open: boolean
  url: string
  onClose: () => void
}

const RoomQRModal = ({ url, open, onClose }: RoomQRModalProps) => {
  return (
    <Modal title={url} open={open} onClose={onClose}>
      <div style={{ textAlign: 'center' }}>
        <QRCode value={url} />
      </div>
    </Modal>
  )
}

export default RoomQRModal
