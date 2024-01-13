import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <main className="w-4/5 mx-auto">
      <Header />
      {children}
    </main>
  );
};

export default Layout;