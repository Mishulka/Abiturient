import { Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { userStore } from "../store/user";
import type { JSX } from "react";

const PrivateRoute = observer(({ children }: { children: JSX.Element }) => {
    return userStore.isLoggedIn ? children : <Navigate to="/login"/>
})

export default PrivateRoute


