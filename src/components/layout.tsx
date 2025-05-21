import type { ReactNode } from "react";
import Footer from "./footer";
import type { HeaderProps } from "./header";
import Header from "./header";

interface LayoutProps extends HeaderProps {
  title: string;
  children: ReactNode;
}

function Layout({ title, children, ...rest }: LayoutProps) {
  return (
    <div>
      <Header {...rest} />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
