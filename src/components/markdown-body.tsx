import Container from './container';
import markdownStyles from '../components/markdown-styles.module.css';

type Props = {
  authorContent: string;
};

const MarkdownBody = ({ authorContent }: Props) => {
  return (
    <Container>
      <div className="max-w-2xl mx-auto text-justify">
        <div
          className={markdownStyles['markdown']}
          dangerouslySetInnerHTML={{ __html: authorContent }}
        />
      </div>
    </Container>
  );
};

export default MarkdownBody;
