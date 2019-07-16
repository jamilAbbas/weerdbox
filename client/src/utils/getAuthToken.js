export const getAuthToken = () => {
  if (localStorage.getItem("jwtToken")) {
    return localStorage.getItem("jwtToken");
  }
};
