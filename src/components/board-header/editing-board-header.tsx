import { useRef } from 'react';

import { Button, Flex, Input, useOutsideClick } from '@chakra-ui/react';

interface Props {
  pendingTitle: string;
  handChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleCancel: () => void | undefined;
}

export function EditingBoardHeader({
  pendingTitle,
  handChange,
  handleSubmit,
  handleCancel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  useOutsideClick({
    ref: ref,
    handler: handleCancel,
  });

  return (
    <Flex flex={1} gap={2} ref={ref}>
      <Input
        variant='outline'
        defaultValue={pendingTitle}
        onChange={handChange}
        onKeyDown={handleKeyDown}
        fontSize='xl'
        fontWeight='bold'
        p={2}
        autoFocus
      />
      <Button onClick={handleSubmit} isDisabled={!pendingTitle}>
        확인
      </Button>
      <Button onClick={handleCancel}>취소</Button>
    </Flex>
  );
}
