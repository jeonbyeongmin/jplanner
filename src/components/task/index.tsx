import { Flex, Text } from '@chakra-ui/react'

interface TaskProps {
  id: string
  name: string
  description: string
  completed: boolean
}

export function Task({ id, name, description, completed }: TaskProps) {
  return (
    <Flex
      p={4}
      bgColor='gray.50'
      borderRadius='md'
      border='1px'
      borderColor='gray.200'
      _hover={{ bgColor: 'gray.100' }}
      userSelect='none'
    >
      <Text noOfLines={4}>{name}</Text>
    </Flex>
  )
}
