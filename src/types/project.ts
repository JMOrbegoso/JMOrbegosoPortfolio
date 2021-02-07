import { Tag } from '../enums/tag';

type Project = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  excerpt: string;
  ogImage: {
    url: string;
  };
  content: string;
  tags: Tag[];
};

export default Project;
