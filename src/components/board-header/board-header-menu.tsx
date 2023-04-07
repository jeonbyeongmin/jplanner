import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'

export function BoardHeaderMenu() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='outline'
        color='gray.500'
        fontSize={20}
      />
      <MenuList>
        <MenuItem>Edit title</MenuItem>
        <MenuItem>Move to archive</MenuItem>
        <MenuItem>Delete this board</MenuItem>
        <MenuItem>Delete this plan</MenuItem>
      </MenuList>
    </Menu>
  )
}
