import Link from 'next/link';
import { Tag } from '../enums/tag';
import ProjectTags from './project-tags';
import { Card } from 'react-bootstrap';

type Props = {
  title: string;
  excerpt: string;
  coverImage: string;
  slug: string;
  tags: Tag[];
};

const ProjectPreview = ({ title, excerpt, coverImage, slug, tags }: Props) => {
  return (
    <Card className="m-2">
      <Link as={`/projects/${slug}`} href="/projects/[slug]">
        <a aria-label={title}>
          <Card.Img variant="top" src={coverImage} />
        </a>
      </Link>
      <Card.Body>
        <Link as={`/projects/${slug}`} href="/projects/[slug]">
          <a className="hover:underline">
            <Card.Title className="text-center">{title}</Card.Title>
          </a>
        </Link>
        <Card.Text className="text-justify">{excerpt}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <ProjectTags tags={tags} />
      </Card.Footer>
    </Card>
  );
};

export default ProjectPreview;
