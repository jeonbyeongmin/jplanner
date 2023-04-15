/* eslint-disable @typescript-eslint/ban-types */
// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true
  'internalEvents': {
    'xstate.init': { type: 'xstate.init' }
  }
  'invokeSrcNameMap': {
    deleteBoard: 'done.invoke.boards.deleting:invocation[0]'
  }
  'missingImplementations': {
    actions: never
    delays: never
    guards: never
    services: never
  }
  'eventsCausingActions': {}
  'eventsCausingDelays': {}
  'eventsCausingGuards': {}
  'eventsCausingServices': {
    deleteBoard: 'DELETE_BOARD'
  }
  'matchesStates': 'deleting' | 'failure' | 'idle' | 'waiting'
  'tags': never
}
