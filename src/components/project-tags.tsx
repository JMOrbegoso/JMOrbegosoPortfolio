import { Tag } from '../enums/tag';
import ProjectTag from './project-tag';

type Props = {
  tags: Tag[];
};

const ProjectTags = ({ tags }: Props) => {
  return (
    <>
      <div className="row justify-content-center">
        {tags.map((tag) => (
          <ProjectTag key={tag} tag={tag} />
        ))}
      </div>
    </>
  );
};

export default ProjectTags;
