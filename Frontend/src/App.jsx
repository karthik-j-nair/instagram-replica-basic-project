import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context";
import "./style.scss";
import { PostContextProvider } from "./features/post/post.context";
import { UserContextProvider } from "./features/friends/user.context.jsx";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <UserContextProvider>
          <AppRoutes />
        </UserContextProvider>
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
