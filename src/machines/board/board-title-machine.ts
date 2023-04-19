import { assign, createMachine } from 'xstate';

const schema = {
  context: {} as {
    pendingTitle: string;
    prev: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boardRef: any;
  },
  events: {} as
    | { type: 'INITIALIZE'; value: string }
    | { type: 'CHANGE'; value: string }
    | { type: 'SUBMIT'; id: string }
    | { type: 'EDIT' }
    | { type: 'CANCEL' },
};

export const boardTitleMachine = createMachine(
  {
    tsTypes: {} as import('./board-title-machine.typegen').Typegen0,
    predictableActionArguments: true,
    schema,
    id: 'boardTitle',
    initial: 'viewing',
    context: {
      pendingTitle: '',
      prev: '',
      boardRef: null,
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
            actions: 'resetTitle',
          },
        },
      },
    },
    on: {
      INITIALIZE: {
        target: 'viewing',
        actions: [
          assign({
            pendingTitle: (_, event) => event.value,
            prev: (_, event) => event.value,
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
      updateTitle: (context, event) => {
        context.boardRef.send({
          type: 'UPDATE_BOARD',
          payload: {
            id: event.id,
            title: context.pendingTitle,
          },
        });
      },
      resetTitle: assign({ pendingTitle: (context) => context.prev }),
    },
  },
);
