import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:6500/",
  headers: { "Content-Type": "application/json" },
});

// api.interceptors.request.use(async (request) => {
//   console.log(request);

//   const res = await fetch("/api/auth/check-cookie");
//   const json = await res.json();
//   const { accessToken, refreshToken } = json;
//   console.log(accessToken, refreshToken);
//   console.log(json);

//   return request;
// });

export default api;
