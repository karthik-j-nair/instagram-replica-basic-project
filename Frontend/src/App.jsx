import React from "react";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./features/auth/auth.context";
import "./style.scss";
import { PostContextProvider } from "./features/post/post.context";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <AppRoutes />
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
