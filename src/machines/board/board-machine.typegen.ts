// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  'internalEvents': {
    'done.invoke.board.adding:invocation[0]': {
      type: 'done.invoke.board.adding:invocation[0]'
      data: unknown
      __tip: 'See the XState TS docs to learn how to strongly type this.'
    }
    'xstate.init': { type: 'xstate.init' }
  }
  'invokeSrcNameMap': {
    addBoard: 'done.invoke.board.adding:invocation[0]'
    deleteBoard: 'done.invoke.board.deleting:invocation[0]'
    updateBoard: 'done.invoke.board.updating:invocation[0]'
  }
  'missingImplementations': {
    actions: 'refetch'
    delays: never
    guards: never
    services: never
  }
  'eventsCausingActions': {
    refetch: 'done.invoke.board.adding:invocation[0]'
  }
  'eventsCausingDelays': {}
  'eventsCausingGuards': {}
  'eventsCausingServices': {
    addBoard: 'ADD_BOARD'
    deleteBoard: 'DELETE_BOARD'
    updateBoard: 'UPDATE_BOARD'
  }
  'matchesStates': 'adding' | 'deleting' | 'failure' | 'idle' | 'updating' | 'waiting'
  'tags': never
}
