import styles from '@styles/components/common/ThemeSelector.module.css'

import React from 'react'
import ThemeSelectorItem from '@src/components/common/ThemeSelector/ThemeSelectorItem'
import DarkThemeSvg from '@src/components/common/illustrations/DarkThemeSvg'
import CaretDownSvg from '@src/components/common/illustrations/CaretDownSvg'
import AutoThemeSvg from '@src/components/common/illustrations/AutoThemeSvg'
import LightThemeSvg from '@src/components/common/illustrations/LightThemeSvg'
import Theme from '@src/components/common/ThemeProvider/types/Theme'
import { useTheme } from '@src/components/common/ThemeProvider'
import CheckSvg from '@src/components/common/illustrations/CheckSvg'
import clsx from 'clsx'

const ThemeSelector = () => {
  const [open, setOpen] = React.useState(false)

  const { theme: currentTheme, setTheme } = useTheme()

  const toggle = () => {
    setOpen(v => !v)
  }

  const handleSetTheme = (theme: Theme) => {
    setTheme(theme)
    setOpen(false)
  }

  const themeMap: Record<Theme, { icon: React.ReactElement; title: string }> = {
    auto: {
      icon: <AutoThemeSvg />,
      title: 'Auto'
    },
    light: {
      icon: <LightThemeSvg />,
      title: 'Light'
    },
    dark: {
      icon: <DarkThemeSvg />,
      title: 'Dark'
    }
  }

  return (
    <div className={styles.root}>
      <button onClick={toggle} className={styles.toggle}>
        <ThemeSelectorItem
          leftIcon={themeMap[currentTheme].icon}
          title={themeMap[currentTheme].title}
          rightIcon={<CaretDownSvg />}
        />
      </button>
      <ul className={clsx(styles.menu, { [styles['menu--open']]: open })}>
        {Object.entries(themeMap).map(([themeKey, { icon, title }]) => (
          <li key={themeKey}>
            <button onClick={() => handleSetTheme(themeKey as Theme)}>
              <ThemeSelectorItem
                leftIcon={icon}
                title={title}
                rightIcon={themeKey === currentTheme ? <CheckSvg /> : null}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ThemeSelector
