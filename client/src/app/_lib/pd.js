import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const ProductDirectory = path.join(process.cwd(), 'src/data/PDS')
const jsonDir = "src/data/.json";
export function getAllPostsIds() {
    const fileNames = fs.readdirSync(ProductDirectory)
    return fileNames.filter((fileName) => fileName.includes('.md')).map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(ProductDirectory, `${id}.md`)

    if (fs.existsSync(fullPath)) {
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        // Use remark to convert markdown into HTML string
        const processedContent = await remark()
            .use(html)
            .process(matterResult.content)
        const contentHtml = processedContent.toString()

        // Combine the data with the id and contentHtml
        return {
            id,
            contentHtml,
            ...matterResult.data
        }
    } else {
        return;
    }
}