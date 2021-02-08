import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import ProjectsList from '../components/projects-list';
import Layout from '../components/layout';
import { getAuthorData, getAllProjectsPreviews } from '../lib/api';
import Head from 'next/head';
import { URL_BASE, WEB_NAME, WEB_DESCRIPTION } from '../lib/constants';
import Project from '../types/project';
import Author from '../types/author';
import generateRssFeed from '../../scripts/generate-rss-feed';
import generateSitemap from '../../scripts/generate-sitemap';
import generateFavicons from '../../scripts/generate-favicons';
import generatePortfolioCache from '../../scripts/generate-portfolio-cache';
import markdownToHtml from '../lib/markdownToHtml';
import ContactForm from '../components/contact-form';
import LandingPage from '../components/landing-page';
import useTranslation from 'next-translate/useTranslation';
import TranslationResource from '../enums/translationResource';
import AboutMe from '../components/about-me';

type Props = {
  author: Author;
  projects: Project[];
};

const Index = ({ author, projects }: Props) => {
  const { t, lang } = useTranslation('common');

  return (
    <>
      <Layout author={author}>
        <Head>
          <title> {WEB_NAME} </title>

          <meta property="description" content={WEB_DESCRIPTION} />
          <meta
            property="author"
            content={`${author.firstname} ${author.lastname}`}
          />
          <meta name="keywords" content={'development'} />
          <meta name="date" content={new Date().toLocaleDateString()} />

          <meta property="og:url" content={`${URL_BASE}`} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={WEB_NAME} />
          <meta property="og:description" content={WEB_DESCRIPTION} />
          <meta property="og:image" content={author.picture} />
        </Head>
        <section id="home" className="mb-5">
          <LandingPage
            title={t(TranslationResource.welcome_to_my_portfolio)}
            subtitle={t(TranslationResource.welcome_to_my_portfolio)}
            coverImage="/assets/portfolio/cover.png"
          />
        </section>
        <section id="aboutme" className="mb-5">
          <AboutMe authorContent={author.content} />
        </section>
        <section id="projects" className="mb-5">
          <ProjectsList projects={projects} />
        </section>
        <section id="contact" className="mb-5">
          <ContactForm />
        </section>
      </Layout>
    </>
  );
};

export default Index;

type Params = {
  locales: string[];
  locale: string;
  defaultLocale: string;
};

export const getStaticProps = async ({ locale }: Params) => {
  // Run one-time scripts
  await generateRssFeed();
  await generateSitemap();
  await generateFavicons();
  await generatePortfolioCache();

  const author = getAuthorData(locale);
  const authorContent = await markdownToHtml(author.content || '');
  const projects = getAllProjectsPreviews(locale);

  return {
    props: {
      author: {
        ...author,
        content: authorContent,
      },
      projects,
    },
  };
};
