import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import Author from '../types/author';
import { getResourcesFileNames, localeDirectory } from './file-system-helpers';
import { DirectoryType } from '../enums/directoryType';

export function getResourceByFileName(
  directoryType: DirectoryType,
  locale: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(
    localeDirectory(directoryType, locale),
    `${realSlug}.md`,
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getProjectBySlug(
  locale: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(
    localeDirectory(DirectoryType.Projects, locale),
    `${realSlug}.md`,
  );

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAuthorBySlug(
  locale: string,
  slug: string,
  fields: string[] = [],
) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(
    localeDirectory(DirectoryType.Author, locale),
    `${realSlug}.md`,
  );
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllProjects(locale: string, fields: string[] = []) {
  const projectsFileNames = getResourcesFileNames(
    DirectoryType.Projects,
    locale,
  );
  const projects = projectsFileNames
    .map((fileName) =>
      getResourceByFileName(DirectoryType.Projects, locale, fileName, fields),
    )
    // sort projects by date in descending order
    .sort((project1, project2) => (project1.date > project2.date ? -1 : 1));
  return projects;
}

export function getAllProjectsPreviews(locale: string) {
  return getAllProjects(locale, [
    'slug',
    'title',
    'date',
    'coverImage',
    'excerpt',
    'content',
    'tags',
  ]);
}

export function getAuthorData(locale: string): Author {
  const authorFiles = getResourcesFileNames(DirectoryType.Author, locale);
  const [propertiesFile] = authorFiles.filter((fileName) =>
    fileName.includes('properties'),
  );
  const [aboutMeFile] = authorFiles.filter((fileName) =>
    fileName.includes('about-me'),
  );
  const [skillsFile] = authorFiles.filter((fileName) =>
    fileName.includes('skills'),
  );

  const propertiesData = getAuthorBySlug(locale, propertiesFile, [
    'firstname',
    'lastname',
    'picture',
    'web',
    'facebook',
    'twitter',
    'github',
    'linkedin',
    'youtube',
    'instagram',
  ]);
  const aboutMeData = getAuthorBySlug(locale, aboutMeFile, ['content']);
  const skillsData = getAuthorBySlug(locale, skillsFile, ['content']);

  return {
    firstname: propertiesData.firstname ?? '',
    lastname: propertiesData.lastname ?? '',
    picture: propertiesData.picture ?? '',
    web: propertiesData.web ?? '',
    facebook: propertiesData.facebook ?? '',
    twitter: propertiesData.twitter ?? '',
    github: propertiesData.github ?? '',
    linkedin: propertiesData.linkedin ?? '',
    youtube: propertiesData.youtube ?? '',
    instagram: propertiesData.instagram ?? '',
    body: aboutMeData.content ?? '',
    skills: skillsData.content ?? '',
  };
}

export function getAllTags(locale: string) {
  const allProjects = getAllProjects(locale, ['tags']);
  const allTags = allProjects.map((p) => p.tags).flat(1);

  const allUniqueTags = allTags
    .filter((item, index) => allTags.indexOf(item) === index)
    .sort((tag1, tag2) => tag1.localeCompare(tag2));

  return allUniqueTags;
}
