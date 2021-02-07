import PostPreview from './post-preview';
import Project from '../types/project';
import Container from './container';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {
  projects: Project[];
};

const PostsList = ({ projects }: Props) => {
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
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 mb-32">
          {projects.map((project) => (
            <PostPreview
              key={project.slug}
              title={project.title}
              coverImage={project.coverImage}
              date={project.date}
              slug={project.slug}
              excerpt={project.excerpt}
              content={project.content}
              tags={project.tags}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PostsList;
