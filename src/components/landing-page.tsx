import { Jumbotron } from 'react-bootstrap';

type Props = {
  title: string;
  subtitle: string;
  coverImage: string;
};

const LandingPage = ({ title, subtitle, coverImage }: Props) => {
  return (
    <Jumbotron
      style={{
        backgroundImage: `url(${coverImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
    >
      <div className="p-5">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
    </Jumbotron>
  );
};

export default LandingPage;
