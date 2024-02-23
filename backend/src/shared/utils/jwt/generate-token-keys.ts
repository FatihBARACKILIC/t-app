import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

export async function generateTokenKeys(dirname: string): Promise<void> {
  const currentPath = path.join(dirname, 'keys');

  const isExist = fs.existsSync(currentPath);
  if (!isExist) {
    fs.mkdirSync(currentPath);
  }

  const keys = ['access', 'refresh'];
  for (const key of keys) {
    const privatePath = path.join(currentPath, `${key}_private.pem`);
    const publicPath = path.join(currentPath, `${key}_public.pem`);
    const isKeyExist = fs.existsSync(privatePath);
    if (!isKeyExist) {
      await generateKeys(privatePath, publicPath);
    }
  }
}

async function generateKeys(
  privatePath: string,
  publicPath: string,
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const privateCommand = `openssl genpkey -algorithm RSA -out ${privatePath} -pkeyopt rsa_keygen_bits:2048`;
    const publicCommand = `openssl rsa -in ${privatePath} -pubout -out ${publicPath}`;

    exec(privateCommand, (error) => {
      if (error) reject(error);
      else {
        exec(publicCommand, (error) => {
          if (error) reject(error);
          else resolve();
        });
      }
    });
  });

  //   $ openssl genpkey -algorithm RSA -out rsa_private.pem -pkeyopt rsa_keygen_bits:2048
  //   $ openssl rsa -in rsa_private.pem -pubout -out rsa_public.pem
}
