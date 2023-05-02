import { assign, createMachine } from 'xstate';

const schema = {
  context: {} as {
    pendingTitle: string;
    prev: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boardRef: any;
  },
  events: {} as
    | { type: 'CHANGE'; value: string }
    | { type: 'SUBMIT'; boardID: string }
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
            boardID: event.boardID,
            title: context.pendingTitle,
          },
        });
      },
      resetTitle: assign({ pendingTitle: (context) => context.prev }),
    },
  },
);
