import { Box, Flex, Tooltip } from '@chakra-ui/react'
import { useMemo } from 'react'

interface NavItemProps {
  content: string
  onClick?: () => void
  isCurrent?: boolean
}

export function NavItem({ content, onClick, isCurrent }: NavItemProps) {
  const bgColors = useMemo(() => {
    return {
      default: isCurrent ? 'gray.100' : 'white',
      hover: isCurrent ? 'gray.200' : 'gray.100',
      active: isCurrent ? 'gray.300' : 'gray.200',
    }
  }, [isCurrent])

  return (
    <Tooltip label={content} aria-label={content} openDelay={1000}>
      <Flex
        role='group'
        as='li'
        bgColor={bgColors.default}
        _hover={{ bgColor: bgColors.hover }}
        p={3}
        borderRadius='md'
        cursor='pointer'
        userSelect='none'
        position='relative'
        onClick={onClick}
        visibility='visible'
      >
        <Flex flex={1} overflow='hidden' wordBreak='break-all' position='relative' noOfLines={1}>
          {content}
          <Box
            position='absolute'
            insetY={0}
            right={0}
            zIndex={10}
            w={20}
            bgGradient={`linear(to-l, ${bgColors.default}, rgba(0,0,0,0))`}
            _groupHover={{ bgGradient: `linear(to-l, ${bgColors.hover}, rgba(0,0,0,0))` }}
          />
        </Flex>
      </Flex>
    </Tooltip>
  )
}
