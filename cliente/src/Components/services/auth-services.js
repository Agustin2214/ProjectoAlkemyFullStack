import axios from "axios";

const signup = (inputs) => {
  return axios.post("http://localhost:3001/auth", inputs )
    .then((response) => {
      console.log(response);
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
  
};






const register = (inputs) => {
  console.log()
  return axios.post("http://localhost:3001/users/", inputs)
    .then((response) => {
      if (response.data.token) {
        // localStorage.setItem('user', JSON.stringify(response.data))
      }
      return response.data;
    });
};



const logout = () => {
  localStorage.removeItem("user");

};



const authService = {
  signup,
  register,
  logout,

};

export default authService;