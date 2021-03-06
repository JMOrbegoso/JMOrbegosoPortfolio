import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Container from '../../components/container';
import Layout from '../../components/layout';
import {
  getAuthorData,
  getAllProjectsPreviews,
  getAllTags,
} from '../../lib/api';
import PageHeader from '../../components/page-header';
import Head from 'next/head';
import { URL_BASE, WEB_NAME } from '../../lib/constants';
import Project from '../../types/project';
import Author from '../../types/author';
import ProjectsList from '../../components/projects-list';
import { getTagTitle } from '../../lib/tag-helpers';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../../enums/translationResource';

type Props = {
  author: Author;
  tagTitle: string;
  projects: Project[];
};

const Tag = ({ author, tagTitle, projects }: Props) => {
  const router = useRouter();
  const { t, lang } = useTranslation('common');

  if (!router.isFallback && !tagTitle) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout author={author}>
      <Container>
        <PageHeader>
          {t(TranslationResource.projects_by_tag)} - {tagTitle}
        </PageHeader>
        {router.isFallback ? (
          <PageHeader>{t(TranslationResource.loading)}</PageHeader>
        ) : (
          <>
            <Head>
              <title>
                {tagTitle} - {WEB_NAME}
              </title>

              <meta
                property="description"
                content={`${t(
                  TranslationResource.projects_by_tag,
                )} - ${tagTitle}`}
              />
              <meta
                property="author"
                content={`${author.firstname} ${author.lastname}`}
              />
              <meta name="keywords" content={tagTitle} />
              <meta name="date" content={new Date().toLocaleDateString()} />

              <meta property="og:url" content={`${URL_BASE}${router.asPath}`} />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={`${tagTitle} - ${WEB_NAME}`} />
              <meta
                property="og:description"
                content={`${t(
                  TranslationResource.projects_by_tag,
                )} - ${tagTitle}`}
              />
              <meta property="og:image" content={author.picture} />
            </Head>
            <ProjectsList projects={projects} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Tag;

type Params = {
  params: {
    tag: string;
    page: number;
  };
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ params, locale }: Params) => {
  const author = getAuthorData(locale);
  const projects = getAllProjectsPreviews(locale).filter((p) =>
    p.tags.includes(params.tag),
  );

  const tagTitle = getTagTitle(params.tag);

  return {
    props: {
      author,
      projects,
      tagTitle,
    },
  };
};

export async function getStaticPaths({ locales }: { locales: string[] }) {
  const paths: { locale: string; params: { tag: string } }[] = [];

  locales.forEach((locale) => {
    const allTags = getAllTags(locale);
    const projectsByTags: {
      tag: string;
      locale: string;
    }[] = [];

    allTags.forEach((tag) => {
      projectsByTags.push({ tag, locale });
    });

    const pagePath = projectsByTags.map((pt) => {
      return {
        locale: pt.locale,
        params: {
          tag: pt.tag,
        },
      };
    });

    paths.push(...pagePath);
  });

  return {
    paths: paths,
    fallback: false,
  };
}
