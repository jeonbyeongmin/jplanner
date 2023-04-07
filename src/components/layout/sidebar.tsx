import { Nav } from '@/components/layout/nav'
import { Avatar, Button, Flex, Text } from '@chakra-ui/react'
import { HiChevronDown } from 'react-icons/hi'

export function Sidebar() {
  return (
    <Flex h='full' direction='column' borderRight='1px' borderColor='gray.200'>
      <Flex as='nav' h='full' flex={1} gap={3} px={2} py={3} direction='column'>
        <Flex align='center' justify='space-between' px={3} py={2} _hover={{ bgColor: 'gray.100' }} borderRadius='md'>
          <Flex gap={4} align='center'>
            <Avatar size='md' name='Dan Abrahmov' src='https://bit.ly/dan-abramov' borderRadius='md' />
            <Text fontWeight='bold' fontSize='lg'>
              전병민
            </Text>
          </Flex>
          <HiChevronDown fontSize={18} />
        </Flex>
        <Button variant='outline' size='lg' flexShrink={0}>
          New board
        </Button>
        <Nav />
      </Flex>
    </Flex>
  )
}
