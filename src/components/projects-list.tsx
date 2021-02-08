import ProjectPreview from './project-preview';
import Project from '../types/project';
import Container from './container';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';
import { CardDeck } from 'react-bootstrap';

type Props = {
  projects: Project[];
};

const ProjectsList = ({ projects }: Props) => {
  const { t, lang } = useTranslation('common');

  if (0 >= projects.length) {
    return (
      <>
        <section className="text-center">
          <Container>
            <h1>{t(TranslationResource.no_projects_found)}</h1>
          </Container>
        </section>
      </>
    );
  }

  return (
    <Container>
      <CardDeck>
        {projects.map((project) => (
          <ProjectPreview
            key={project.slug}
            title={project.title}
            excerpt={project.excerpt}
            coverImage={project.coverImage}
            slug={project.slug}
            tags={project.tags}
          />
        ))}
      </CardDeck>
    </Container>
  );
};

export default ProjectsList;
