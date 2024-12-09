import { AuthContextProvider } from "./_utils/auth-context";

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
};

export default Layout;
