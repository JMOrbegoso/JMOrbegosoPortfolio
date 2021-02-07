import markdownStyles from './markdown-styles.module.css';

type Props = {
  content: string;
};

const ProjectBody = ({ content }: Props) => {
  return (
    <div className="max-w-2xl mx-auto text-justify">
      <div
        className={markdownStyles['markdown']}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default ProjectBody;
