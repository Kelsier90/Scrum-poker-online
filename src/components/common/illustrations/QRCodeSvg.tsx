import React from 'react'

const QRCodeSvg = ({
  className,
  onClick
}: {
  className?: string
  onClick?: () => void
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      xmlSpace="preserve"
      className={className}
      onClick={onClick}
    >
      <g>
        <g>
          <g>
            <path d="M160,0H0v160h160V0z M128,128H32V32h96V128z" />
            <rect x="64" y="64" width="32" height="32" />
            <path d="M352,0v160h160V0H352z M480,128h-96V32h96V128z" />
            <rect x="416" y="64" width="32" height="32" />
            <path d="M0,512h160V352H0V512z M32,384h96v96H32V384z" />
            <rect x="64" y="416" width="32" height="32" />
            <rect x="256" width="64" height="32" />
            <polygon points="256,128 288,128 288,96 320,96 320,64 224,64 224,32 192,32 192,64 192,80 192,96 256,96 			" />
            <rect x="192" y="128" width="32" height="32" />
            <polygon points="320,160 288,160 288,192 192,192 192,224 320,224 			" />
            <polygon points="32,288 64,288 64,256 32,256 32,192 0,192 0,320 32,320 			" />
            <rect x="64" y="192" width="32" height="32" />
            <polygon
              points="192,320 256,320 256,288 224,288 224,256 160,256 160,192 128,192 128,256 96,256 96,320 128,320 128,288
				144,288 160,288 192,288 			"
            />
            <rect x="288" y="256" width="32" height="64" />
            <polygon points="288,352 192,352 192,384 256,384 256,480 192,480 192,512 288,512 288,480 352,480 352,448 288,448 			" />
            <rect x="192" y="416" width="32" height="32" />
            <rect x="320" y="352" width="32" height="64" />
            <polygon points="480,416 384,416 384,512 416,512 416,448 480,448 			" />
            <rect x="448" y="480" width="64" height="32" />
            <rect x="480" y="352" width="32" height="32" />
            <polygon points="384,384 416,384 416,288 352,288 352,320 384,320 			" />
            <polygon points="448,224 416,224 416,192 384,192 384,224 352,224 352,256 480,256 480,224 512,224 512,192 448,192 			" />
            <rect x="448" y="288" width="64" height="32" />
          </g>
        </g>
      </g>
    </svg>
  )
}

export default QRCodeSvg
