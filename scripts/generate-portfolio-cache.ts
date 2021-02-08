import { getResourceByFileName } from '../src/lib/api';
import { DirectoryType } from '../src/enums/directoryType';
import {
  getfileNamesByLocale,
  writeFile,
} from '../src/lib/file-system-helpers';
import { mkdirSync } from 'fs';

async function generatePortfolioCache() {
  console.log('Generating portfolio cache…');

  generatePortfolioCacheFiles(DirectoryType.Projects, [
    'slug',
    'title',
    'date',
    'coverImage',
    'excerpt',
    'ogImage',
    'content',
    'tags',
  ]);

  generatePortfolioCacheFiles(DirectoryType.Author, [
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
    'content',
  ]);
}

const generatePortfolioCacheFiles = (
  directoryType: DirectoryType,
  fields: string[],
) => {
  const filePaths = getfileNamesByLocale(directoryType);

  let collection: { locale: string; fileContent: string }[] = [];

  filePaths.forEach((dir) => {
    const element = dir.fileNames.map((fileName) =>
      getResourceByFileName(directoryType, dir.locale, fileName, fields),
    );

    collection.push({
      locale: dir.locale,
      fileContent: JSON.parse(JSON.stringify(element)),
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
