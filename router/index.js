const headers = require('../headers'); // Chunk2

const errorHandler = require('../errorHandler'); //Chunk3
const successHandler = require('../successHandler');

const Post = require('../model/posts'); //Chunk4

const router = async (req,res) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    if(req.url==="/posts" && req.method === "GET") {
        const allPosts = await Post.find()
        successHandler(res, allPosts);
        res.end()
    } else if (req.url = '/posts' && req.method === 'POST') {
        req.on('end', async()=>{
            try {
                const data = JSON.parse(body)
                if(data.content) {
                    const newPost = await Post.create({
                        name: data.name,
                        content: data.content,
                        image: data.image,
                        tags: data.tags,
                        likes: data.likes
                    })
                    successHandler(res, newPost);
                    res.end()
                } else {
                    errorHandler(res)
                }
            } catch (error) {
                errorHandler(res,error);
                    res.end()
                    console.log(body)
                    console.log('Here 2')
                }
            })
    } else if (req.url="/posts" && req.method ==="DELETE") {
            const delPosts = await Post.deleteMany({})
            successHandler(res);
            res.end()
        }
}

// Post.create(
    // {
    //     name: 'jiii',
    //     content: 'data.content',
    //     tags: 'data.tags',
    //     type: `group`
    // }
//     ).then (() => {
//         console.log('Inserted a New Recording-Type2')
//     }
//     ).catch((err) => {
//         console.log(err)
//     })

module.exports = router