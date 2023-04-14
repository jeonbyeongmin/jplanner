import { assign, createMachine } from 'xstate'

const schema = {
  context: {} as { pendingTitle: string; title: string },
  events: {} as
    | { type: 'INITIATE'; value: string }
    | { type: 'CHANGE'; value: string }
    | { type: 'SUBMIT' }
    | { type: 'EDIT' }
    | { type: 'CANCEL' },
}

export const boardTitleMachine = createMachine(
  {
    predictableActionArguments: true,
    schema,
    id: 'boardTitle',
    initial: 'idle',
    context: {
      pendingTitle: '',
      title: '',
    },
    states: {
      idle: {
        on: {
          INITIATE: {
            target: 'viewing',
            actions: assign({
              title: (_, event) => event.value,
              pendingTitle: (_, event) => event.value,
            }),
          },
        },
      },
      viewing: {
        on: {
          EDIT: 'editing',
        },
      },
      editing: {
        on: {
          CHANGE: {
            actions: assign({
              pendingTitle: (_, event) => event.value,
            }),
          },
          SUBMIT: {
            cond: 'hasTitle',
            target: 'viewing',
            actions: assign({
              title: (context) => context.pendingTitle,
            }),
          },
          CANCEL: {
            target: 'viewing',
            actions: assign({
              pendingTitle: (context) => context.title,
            }),
          },
        },
      },
    },
  },
  {
    guards: {
      hasTitle: (context) => context.title.length > 0,
    },
  },
)
