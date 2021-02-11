import { getAllProjects, getAuthorData } from '../src/lib/api';
import { DirectoryType } from '../src/enums/directoryType';
import {
  rootDirectory,
  getSubDirectories,
  writeFile,
} from '../src/lib/file-system-helpers';
import { mkdirSync } from 'fs';

async function generatePortfolioCache() {
  console.log('Generating portfolio cache…');

  generatePortfolioCacheFiles(DirectoryType.Projects);
  generatePortfolioCacheFiles(DirectoryType.Author);
}

const generatePortfolioCacheFiles = (directoryType: DirectoryType) => {
  const collection: { locale: string; fileContent: string }[] = [];

  const subDirectories = getSubDirectories(rootDirectory(directoryType));

  subDirectories.forEach((locale) => {
    var element: string;

    switch (directoryType) {
      case DirectoryType.Projects:
        const projects = getAllProjects(locale, [
          'slug',
          'title',
          'date',
          'coverImage',
          'excerpt',
          'ogImage',
          'content',
          'tags',
        ]);
        element = JSON.parse(JSON.stringify(projects));
        break;
      case DirectoryType.Author:
        const author = getAuthorData(locale);
        element = JSON.parse(JSON.stringify(author));
        break;
    }

    collection.push({
      locale,
      fileContent: element,
    });
  });

  writePortfolioCacheFiles(directoryType, collection);
};

const writePortfolioCacheFiles = (
  directoryType: DirectoryType,
  collection: { locale: string; fileContent: string }[],
) => {
  const folderPath =
    directoryType === DirectoryType.Projects
      ? './public/portfolio-cache/projects'
      : './public/portfolio-cache/author';

  collection.forEach((element) => {
    mkdirSync(folderPath, { recursive: true });
    writeFile(
      `${folderPath}/${element.locale}.json`,
      JSON.stringify(element.fileContent),
    );
  });
};

export default generatePortfolioCache;
