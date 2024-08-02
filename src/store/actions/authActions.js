export const login = (email, password) => async (dispatch) => {
  try {
    // Mock login request
    const response = await fakeAuthService.login(email, password);

    if (response.success) {
      dispatch({ type: "LOGIN_SUCCESS", payload: response.user });
      return true;
    } else {
      dispatch({ type: "LOGIN_FAILURE" });
      return false;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE" });
    return false;
  }
};
