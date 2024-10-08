import React from 'react'

interface CrownSvgProps {
  width?: string | number
  height?: string | number
  className?: string
}

const CrownSvg = ({ width = 570, height = 394, className }: CrownSvgProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 570 394"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M82.2121 102.684C80.7116 97.242 86.8727 92.928 91.4732 96.1992L270.593 223.562C273.972 225.964 273.954 230.988 270.558 233.367L149.857 317.882C146.46 320.26 141.733 318.559 140.631 314.562L82.2121 102.684Z" />
      <path d="M487.788 102.68C489.288 97.2381 483.127 92.9241 478.527 96.1953L299.407 223.558C296.028 225.961 296.046 230.985 299.442 233.363L420.143 317.878C423.54 320.256 428.267 318.555 429.369 314.558L487.788 102.68Z" />
      <path d="M290.541 45.3335C288.492 40.4034 281.508 40.4033 279.459 45.3335L190.589 259.198C188.947 263.149 191.851 267.5 196.13 267.5L373.87 267.5C378.149 267.5 381.053 263.149 379.411 259.198L290.541 45.3335Z" />
      <rect x="140" y="232" width="290" height="104" rx="30" />
      <circle cx="480.5" cy="97.5" r="32.5" />
      <circle cx="284.5" cy="32.5" r="32.5" />
      <circle cx="89.5" cy="97.5" r="32.5" />
      <rect x="152" y="346" width="265" height="25" rx="12.5" />
    </svg>
  )
}

export default CrownSvg
