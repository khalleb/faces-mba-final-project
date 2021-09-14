import fs from 'fs';
import { uniq } from 'lodash';

interface lineGroup {
  image: string;
  group: string;
}

export async function getFile(fileName: string): Promise<string> {
  try {
    if (!fileName) {
      console.log(`Informe o arquivo`);
      return '';
    }
    var data = fs.readFileSync(fileName, 'utf8');
    return data;
  } catch (error) {
    console.log(error);
    return '';
  }
}

export async function readFileGetGroup(file: string): Promise<lineGroup[]> {
  if (!file) {
    console.log(`Informe o arquivo`);
    return [];
  }
  const breakLine = file.split('\r\n');
  if (breakLine) {
    const valueGroup = breakLine.map(e => {
      const line = e.split(' ');
      return { image: line[0], group: line[1] };
    });
    return valueGroup;
  }
  return [];
}

export async function getGroups(list: lineGroup[]): Promise<string[]> {
  if (!list || list.length <= 1) {
    return [];
  }
  const groups = list.map(e => e.group);
  const groupsNoDuplicate = uniq(groups);
  return groupsNoDuplicate;
}