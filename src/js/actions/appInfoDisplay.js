//Validate user fields like name and password
export const APP_INFO_DISPLAY = 'APP_INFO_DISPLAY';
export const RESET_APP_INFO_DISPLAY = 'RESET_APP_INFO_DISPLAY';

export function appInfoDisplay(data) {
  return {
    type: APP_INFO_DISPLAY,
    payload: data
  };
}

export function resetAppInfoDisplay() {
  return {
    type: RESET_APP_INFO_DISPLAY
  }
};

