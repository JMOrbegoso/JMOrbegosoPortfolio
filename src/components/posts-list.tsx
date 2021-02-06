import PostPreview from './post-preview';
import Post from '../types/post';
import Container from './container';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';

type Props = {
  posts: Post[];
};

const PostsList = ({ posts }: Props) => {
  const { t, lang } = useTranslation('common');

  if (0 >= posts.length) {
    return (
      <>
        <section className="text-center">
          <Container>
            <h1>{t(TranslationResource.no_posts_found)}</h1>
          </Container>
        </section>
      </>
    );
  }

  return (
    <section>
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 mb-32">
          {posts.map((post) => (
            <PostPreview
              key={post.slug}
              title={post.title}
              coverImage={post.coverImage}
              date={post.date}
              slug={post.slug}
              excerpt={post.excerpt}
              content={post.content}
              tags={post.tags}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default PostsList;
