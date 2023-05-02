export type TaskListHeaderState = 'editing' | 'viewing';

type Draft = {
  state: TaskListHeaderState;
  context: {
    pendingTitle: string;
    prev: string;
  };
};

type Action =
  | { type: 'EDIT' }
  | { type: 'CANCEL' }
  | { type: 'CHANGE'; payload: string }
  | { type: 'SUBMIT' };

export function taskListHeaderReducer(draft: Draft, action: Action) {
  switch (action.type) {
    case 'EDIT': {
      draft.state = 'editing';
      break;
    }
    case 'CANCEL': {
      draft.state = 'viewing';
      draft.context.pendingTitle = draft.context.prev;
      break;
    }
    case 'CHANGE': {
      draft.context.pendingTitle = action.payload;
      break;
    }
    case 'SUBMIT': {
      draft.state = 'viewing';
      draft.context.prev = draft.context.pendingTitle;
      break;
    }
  }
}
