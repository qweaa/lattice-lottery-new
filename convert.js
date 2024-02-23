import fs from 'fs'
import path from 'path'
import markdownpdf from 'markdown-pdf'

// 指定包含Markdown文件的目录路径
const entryPath = './src/doc';
const outPath = './dist';

// 读取目录中的所有文件
fs.readdir(entryPath, (err, files) => {
  if (err) {
    console.log('无法读取doc目录：', err);
    return;
  }

  // 过滤出Markdown文件
  const markdownFiles = files.filter(file => path.extname(file).toLowerCase() === '.md');

  // 对每个Markdown文件进行转换
  markdownFiles.forEach(markdownFile => {
    const inputFilePath = path.join(entryPath, markdownFile);
    const outputFilePath = path.join(outPath, `${path.basename(markdownFile, '.md')}.pdf`);

    // 使用markdown-pdf库将Markdown转换为PDF
    markdownpdf({
      cssPath: './src/doc/misty-light-windows.css',
    }).from(inputFilePath).to(outputFilePath, () => {
      console.log(`已成功将 ${inputFilePath} 转换为 ${outputFilePath}`);
    });
  });
});