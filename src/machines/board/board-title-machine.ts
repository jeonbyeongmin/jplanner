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
    initial: 'viewing',
    context: {
      pendingTitle: '',
      title: '',
    },
    states: {
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
            actions: 'updateTitle',
          },
          CANCEL: {
            target: 'viewing',
            actions: 'resetPendingTitle',
          },
        },
      },
    },
    on: {
      INITIATE: {
        target: 'viewing',
        actions: [
          assign({
            title: (_, event) => event.value,
            pendingTitle: (_, event) => event.value,
          }),
        ],
      },
    },
  },
  {
    guards: {
      hasTitle: (context) => context.pendingTitle.length > 0,
    },

    actions: {
      updateTitle: assign({
        title: (context) => context.pendingTitle,
      }),
      resetPendingTitle: assign({
        pendingTitle: (context) => context.title,
      }),
    },
  },
)
