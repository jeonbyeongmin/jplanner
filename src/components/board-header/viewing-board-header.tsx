import { Flex, Text, Tooltip } from '@chakra-ui/react';

interface Props {
  title?: string;
  handleEdit?: () => void;
}

export function ViewingBoardHeader({ title, handleEdit }: Props) {
  return (
    <Flex
      p={2}
      px={3}
      _hover={{ bgColor: 'gray.100' }}
      borderRadius='lg'
      gap={2}
      align='center'
    >
      <Tooltip label={title} openDelay={1000}>
        <Text
          fontSize='xl'
          fontWeight='bold'
          cursor='pointer'
          userSelect='none'
          onClick={handleEdit}
          noOfLines={1}
          color='blackAlpha.900'
        >
          {title}
        </Text>
      </Tooltip>
    </Flex>
  );
}
