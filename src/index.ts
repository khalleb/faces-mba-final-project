import 'dotenv/config';

import { existsSync, mkdirSync, copyFile } from 'fs';
import { getFile, readFileGetGroup } from './lib/files';
import { pathWindowsLinux } from './lib/util';

(async (): Promise<void> => {
  console.log('Carregando...');
  const basePath = process?.env?.BASE_PATH;
  if (!basePath || !existsSync(basePath)) {
    throw new Error('Pasta de arquivos padrão não encontrada');
  }
  const fileList = `${basePath}${pathWindowsLinux()}identity_CelebA.txt`;
  const folderImages = `${basePath}${pathWindowsLinux()}img_align_celeba`
  if (!existsSync(fileList)) {
    throw new Error('Arquivo de texto não localizado');
  }
  if (!existsSync(folderImages)) {
    throw new Error('Pasta de imagens não localizadas');
  }
  const imageFile = await getFile(fileList);
  if (imageFile) {
    const groupBy = await readFileGetGroup(imageFile);
    if (groupBy) {
      const folferNewImages = `${basePath}${pathWindowsLinux()}new-images`;
      if (!existsSync(folferNewImages)) {
        mkdirSync(folferNewImages);
      }
      try {
        groupBy.forEach(file => {
          const fileOld = `${folderImages}${pathWindowsLinux()}${file.image}`
          const fileNew = `${folferNewImages}${pathWindowsLinux()}${file.group}_${file.image}`
          copyFile(fileOld, fileNew, (err) => {
            if (err) {
              console.log(`Erro ao copiar imagem: ` + err);
            }else {
              console.log(`${file.image} - Copiado`);
            }
          });
        });
        console.log('Arquivos copiados');
      } catch (error) {
        console.log('erro ao copiar o arquivo' + error);
      }
    }
  }
})();