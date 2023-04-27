import { Flex, Text } from '@chakra-ui/react';

interface Props {
  title: string;
}

export function Task({ title }: Props) {
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
      <Text noOfLines={4}>{title}</Text>
    </Flex>
  );
}
