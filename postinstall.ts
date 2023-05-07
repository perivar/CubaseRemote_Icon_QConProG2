import fs from 'fs'
import path from 'path'

const getFiles = (sourcePath: string, extensionFilter: string, nameFilter: string) => {
  const assetsPath = path.resolve(sourcePath)
  const assetsPathExists = fs.existsSync(assetsPath)

  if (assetsPathExists) {
    console.info(`Asset folder exists (${assetsPath.toString()})...`)

    const paths = fs.readdirSync(assetsPath)

    // filter only .js files
    const jsFiles = paths.filter((t) => path.extname(t).toLowerCase() === extensionFilter)

    // filter based on name
    const filteredFiles = nameFilter ? jsFiles.filter((t) => t.toLowerCase().includes(nameFilter.toLowerCase())) : jsFiles

    const filesContent = filteredFiles.map((fileName) => {
      // console.log('FileName:', fileName)
      const filePath = path.resolve(`${sourcePath}/${fileName}`)
      console.log('Processing file path:', filePath)
      if (fs.existsSync(filePath)) {
        return {
          filePath,
          fileName,
        }
      }
    })

    return filesContent
  }
}

const replaceInFiles = (assetsPath: string, extensionFilter: string, filter: string, replaceMap: Map<RegExp, string>) => {
  const filteredFiles = getFiles(assetsPath, extensionFilter, filter)

  if (filteredFiles) {
    filteredFiles.forEach((elem) => {
      const filePath = elem?.filePath as string
      // const fileName = elem?.fileName as string

      replaceInFile(filePath, replaceMap)
    })
  }
}

const replaceInFile = (filePath: string, replaceMap: Map<RegExp, string>) => {
  fs.readFile(filePath, 'utf8', function (err, data) {
    if (err) {
      return console.log(err)
    }

    let replaced = data
    replaceMap.forEach((replaceValue: string, searchValue: RegExp) => {
      // console.info(`Replacing '${searchValue}' with '${replaceValue}'`)
      replaced = replaced.replace(searchValue, replaceValue)
    })

    fs.writeFile(filePath, replaced, 'utf8', function (err) {
      if (err) return console.log(err)
    })
  })
}

// these regexes work
// replaced = replaced.replace(/"use strict";/g, '//')
// replaced = replaced.replace(/Object.defineProperty\(exports, "__esModule", { value: true }\);/g, '//')

const replaceMap: Map<RegExp, string> = new Map([
  [/"use strict";/, ''],
  [/Object.defineProperty\(exports, "__esModule", { value: true }\);/g, ''],
])

replaceInFiles('icon/qcon_pro_g2/', '.js', 'icon_', replaceMap)
