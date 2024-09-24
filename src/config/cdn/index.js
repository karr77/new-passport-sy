import fs from "fs";
import path from "path";

const fileDisplay = (filePath) => {
  const arr = [];
  return new Promise((resolve) => {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        console.error("Error:(spec)", err);
        resolve(arr);
        return;
      }
      let pendingFiles = files.length;
      if (pendingFiles === 0) {
        resolve(arr);
        return;
      }
      files.forEach((filename) => {
        const filedir = path.join(filePath, filename);
        fs.stat(filedir, (error, stats) => {
          if (error) {
            console.error("Error:(spec)", error);
            if (--pendingFiles === 0) resolve(arr);
            return;
          }
          if (stats.isFile()) {
            const newPath = filedir.replace(
              "D:\\zcjb-passport-test",
              "."
            );
            arr.push({
              fileName: filename,
              filePath: newPath,
            });
          } else if (stats.isDirectory()) {
            fileDisplay(filedir).then((subDirFiles) => {
              arr.push(...subDirFiles);
              if (--pendingFiles === 0) resolve(arr);
            });
          }
          if (--pendingFiles === 0) resolve(arr);
        });
      });
    });
  });
};

export { fileDisplay };  // 改为命名导出