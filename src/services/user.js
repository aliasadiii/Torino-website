import axios from "axios";

const sendUserData = async (userData) => {
  try {
    const res = await axios.put("/api/user/profile", userData);
    return { res };
  } catch (error) {
    return { error };
  }
};

export { sendUserData };
