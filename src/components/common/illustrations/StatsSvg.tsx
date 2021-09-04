import React from 'react'

const StatsSvg = ({ className }: { className?: string }) => {
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
    >
      <g>
        <g>
          <path
            d="M492,186H40v-26h252c11.046,0,20-8.954,20-20V40c0-11.046-8.954-20-20-20H40C40,8.954,31.046,0,20,0S0,8.954,0,20
			c0,6.838,0,465.072,0,472c0,11.046,8.954,20,20,20s20-8.954,20-20h152c11.046,0,20-8.954,20-20V372c0-11.046-8.954-20-20-20H40
			v-26h452c11.046,0,20-8.954,20-20V206C512,194.954,503.046,186,492,186z M40,60h232v60H40V60z M172,392v60H40v-60H172z M472,286
			H40v-60h432V286z"
          />
        </g>
      </g>
    </svg>
  )
}

export default StatsSvg
