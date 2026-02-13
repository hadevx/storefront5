import Header from "./components/Header";
import Footer from "./components/Footer";
import clsx from "clsx";
import FooterClone from "./components/FooterClone";
function Layout({ children, className }) {
  return (
    <div className={clsx("font-[Manrope] ", className && className)}>
      <Header />
      {children}
      {/* <Footer /> */}
      <FooterClone />
    </div>
  );
}

export default Layout;
