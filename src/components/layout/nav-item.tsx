import { Flex } from '@chakra-ui/react'

interface NavItemProps {
  content: string
  onClick?: () => void
}

export function NavItem({ content, onClick }: NavItemProps) {
  return (
    <Flex
      as='li'
      _hover={{ bgColor: 'gray.50' }}
      _active={{ bgColor: 'gray.100' }}
      px={2}
      py={3}
      borderRadius='md'
      cursor='pointer'
      userSelect='none'
      onClick={onClick}
    >
      {content}
    </Flex>
  )
}
