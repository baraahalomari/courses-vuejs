import decode from "jwt-decode";

export default function getUser() {
  const profile = localStorage.getItem("user");
  if (profile) {
    const user = JSON.parse(profile);
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      return decodedToken;
    }
    return null;
  }
  return null;
}