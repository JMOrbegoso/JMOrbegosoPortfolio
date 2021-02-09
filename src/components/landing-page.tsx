import { Jumbotron } from 'react-bootstrap';

type Props = {
  title: string;
  subtitle: string;
  coverImage: string;
};

const LandingPage = ({ title, subtitle, coverImage }: Props) => {
  return (
    <Jumbotron
      className="text-white"
      style={{
        backgroundImage: `url(${coverImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <h1 className="p-5 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter leading-tight md:leading-none my-8 md:my-12 text-center md:text-left">
        {title}
      </h1>

      <p className="pb-5 text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tighter leading-tight md:leading-none my-8 md:my-12 text-center md:text-left">
        {subtitle} - sadsad
      </p>
    </Jumbotron>
  );
};

export default LandingPage;
