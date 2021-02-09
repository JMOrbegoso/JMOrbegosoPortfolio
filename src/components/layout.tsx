import Footer from './footer';
import Meta from './meta';
import NavBar from './navbar';
import Author from '../types/author';

type Props = {
  author: Author;
  children: React.ReactNode;
};

const Layout = ({ author, children }: Props) => {
  return (
    <>
      <Meta />
      <NavBar />
      <div className="min-h-screen" style={{ paddingTop: 25 }}>
        <main>{children}</main>
      </div>
      <Footer author={author} />
    </>
  );
};

export default Layout;
