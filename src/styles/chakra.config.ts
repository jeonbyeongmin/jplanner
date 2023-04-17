import { menuTheme } from '@/styles/menu'
import { extendTheme } from '@chakra-ui/react'

const config = {
  cssVarPrefix: 'jp',
  initialColorMode: 'light',
  useSystemColorMode: false,
}

const zIndices = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  upperDropdown: 1001,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
}

export const theme = extendTheme({
  colors: {
    gray: {
      50: '#f9fafb',
      100: '#f4f5f7',
      200: '#e5e7eb',
      300: '#d2d6dc',
      400: '#9fa6b2',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#252f3f',
    },
  },
  zIndices,
  config,
  components: {
    Menu: menuTheme,
  },
})
