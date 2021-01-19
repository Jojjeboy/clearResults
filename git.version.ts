import { writeFileSync } from 'fs';
import { dedent } from 'tslint/lib/utils';
import { promisify } from 'util';
import * as child from 'child_process';
const pjson = require('./package.json')

const exec = promisify(child.exec);

async function createVersionsFile(filename: string) {
  const revision = (await exec('git rev-parse --short HEAD')).stdout.toString().trim();
  const branch = (await exec('git rev-parse --abbrev-ref HEAD')).stdout.toString().trim();
  const date = (await exec('git log -1 --format=%cd')).stdout.toString().trim();

  await exec('npm version minor');
  
  console.log(pjson);

  console.log(`Application Version: '${process.env.npm_package_version}', revision: '${revision}', branch: '${branch}'`);
  
  const content = dedent`
      // this file is automatically generated by git.version.ts script
      export const applicationversion = {
        version: '${process.env.npm_package_version}',
        revision: '${revision}',
        branch: '${branch}',
        date: '${date}'
      };`;

  writeFileSync(filename, content, {encoding: 'utf8'});
}

createVersionsFile('src/environments/applicationversion.ts');