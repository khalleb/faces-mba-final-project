import { existsSync, mkdirSync, copyFile } from 'fs';
import { getFile, readFileGetGroup } from './lib/files';
import { pathWindowsLinux } from './lib/util';

(async (): Promise<void> => {
  console.log('Carregando...');
  const basePath = '/home/khalleb/Documents/base-data-faces'
  const imageFile = await getFile(`${basePath}${pathWindowsLinux()}identity_CelebA.txt`);
  if (imageFile) {
    const groupBy = await readFileGetGroup(imageFile);
    if (groupBy) {
      const folferNewImages = `${basePath}${pathWindowsLinux()}new-images`;
      if (!existsSync(folferNewImages)) {
        mkdirSync(folferNewImages);
      }
      try {
        groupBy.forEach(file => {
          const fileOld = `${basePath}${pathWindowsLinux()}img_align_celeba${pathWindowsLinux()}${file.image}`
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