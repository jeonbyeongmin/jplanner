import { Flex, Text } from '@chakra-ui/react';

interface TaskProps {
  id: string;
  name: string;
  description: string;
  completed: boolean;
}

export function Task({ name }: TaskProps) {
  return (
    <Flex
      p={4}
      bgColor='gray.50'
      borderRadius='md'
      border='1px'
      borderColor='gray.200'
      _hover={{ bgColor: 'gray.100' }}
      userSelect='none'
      cursor='pointer'
      w='full'
      mb={4}
    >
      <Text noOfLines={4}>{name}</Text>
    </Flex>
  );
}
