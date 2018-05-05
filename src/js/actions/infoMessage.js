
export const SHOW_INFO_MESSAGE = 'SHOW_INFO_MESSAGE';
export const RESET_SHOW_INFO_MESSAGE = 'RESET_SHOW_INFO_MESSAGE';


export function showInfoMessage(payload) {
  return {
    type: SHOW_INFO_MESSAGE,
    payload: payload
  };
}

export function resetShowInfoMessage() {
  return {
    type: RESET_SHOW_INFO_MESSAGE
  }
};
