import { useSelector } from "react-redux";

export const jwtToken = () => {
  const { jwt } = useSelector((state: any) => state.auth);
  return jwt;
};
