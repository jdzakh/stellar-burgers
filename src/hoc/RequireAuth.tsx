import { useLocation, Navigate, RouteProps } from "react-router-dom";
import { useAppSelector } from "../hook/hook";
import { FC } from "react";

interface iChildren {
   children?: React.ReactChild | React.ReactNode
}

//@ts-ignore
const RequireAuthForProfile: FC<RouteProps> = ({children}: iChildren) => {
   const location = useLocation();
   const { userInfo } = useAppSelector(state => state.userSlice)
   return userInfo ? (children) : <Navigate to="/login" state={{ from: location }} />
}

export default RequireAuthForProfile;

