import { FiArchive, FiEdit, FiTrash2 } from 'react-icons/fi';
import { HiDotsVertical } from 'react-icons/hi';

import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export function BoardHeaderMenu({ onEdit, onDelete }: Props) {
  return (
    <Menu>
      <MenuButton
        zIndex='upperDropdown'
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='outline'
        color='gray.500'
        fontSize={20}
      />
      <MenuList zIndex='upperDropdown'>
        <MenuItem icon={<FiEdit size={16} />} iconSpacing={4} onClick={onEdit}>
          보드 제목 수정
        </MenuItem>
        <MenuItem icon={<FiArchive size={16} />} iconSpacing={4}>
          아카이브로 이동
        </MenuItem>
        <MenuItem
          icon={<FiTrash2 size={16} />}
          iconSpacing={4}
          onClick={onDelete}
        >
          이 보드 삭제
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
