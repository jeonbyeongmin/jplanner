import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';

import { useToggle } from '@/hooks/use-toggle';
import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

export function TaskListHeaderMenu() {
  const [isOpen, handleToggle] = useToggle();

  return (
    <Menu
      placement='bottom-end'
      isOpen={isOpen}
      onOpen={handleToggle}
      onClose={handleToggle}
    >
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='ghost'
        size='sm'
        color='gray.500'
        fontSize='lg'
        zIndex='dropdown'
        opacity={isOpen ? 1 : 0}
        _groupHover={{ opacity: 1 }}
      />
      <MenuList zIndex='dropdown'>
        <MenuItem icon={<FiEdit size={16} />} iconSpacing={5}>
          리스트 제목 수정
        </MenuItem>
        <MenuItem icon={<FiTrash2 size={16} />} iconSpacing={5}>
          이 리스트 삭제
        </MenuItem>
      </MenuList>
      <Box
        left={0}
        top={0}
        bottom={0}
        right={0}
        position='absolute'
        bgColor='white'
        borderRadius='xl'
        zIndex={isOpen ? 1 : -1}
        opacity={isOpen ? 0.7 : 0}
        transition='all 0.2s'
      />
    </Menu>
  );
}
