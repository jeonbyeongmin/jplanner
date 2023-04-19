// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  'internalEvents': {
    'xstate.init': { type: 'xstate.init' };
  };
  'invokeSrcNameMap': {
    addBoardActor: 'done.invoke.board.adding:invocation[0]';
    deleteBoardActor: 'done.invoke.board.deleting:invocation[0]';
    updateBoardActor: 'done.invoke.board.updating:invocation[0]';
  };
  'missingImplementations': {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  'eventsCausingActions': {
    updateData: 'UPDATE_DATA';
  };
  'eventsCausingDelays': {};
  'eventsCausingGuards': {};
  'eventsCausingServices': {
    addBoardActor: 'ADD_BOARD';
    deleteBoardActor: 'DELETE_BOARD';
    updateBoardActor: 'UPDATE_BOARD';
  };
  'matchesStates': 'adding' | 'deleting' | 'failure' | 'idle' | 'updating' | 'waiting';
  'tags': never;
}
