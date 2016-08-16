export const ACTIVE_MODAL = 'fcc-tic-tac-toe/modals/ACTIVE_MODAL'
export const SHOW_MODAL = 'fcc-tic-tac-toe/modals/SHOW_MODAL'
export const MESSAGE_COMPLETE = 'fcc-tic-tac-toe/modals/MESSAGE_COMPLETE'
export const HIDE_MODAL = 'fcc-tic-tac-toe/modals/HIDE_MODAL'
export const SHOW_OPTIONS = 'fcc-tic-tac-toe/modals/SHOW_OPTIONS'

const initialState = {
  activeModal: null,
  visible: false,
  messageComplete: false,
  showOptions: false
}
export default (state, action) => {
  switch (action.type) {
    case ACTIVE_MODAL:
      return {
        ...state,
        activeModal: action.payload
      }
    case SHOW_MODAL:
      return {
        ...state,
        visible: true
      },

  }
}
