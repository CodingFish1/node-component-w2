const headers = require('../headers'); // Chunk2

const errorHandler = require('../errorHandler'); //Chunk3
const successHandler = require('../successHandler');

const Post = require('../model/posts'); //Chunk4

const opts = { runValidators: true }

const router = async (req,res) => {
    let body = ''
    req.on('data', (chunk) => {
      body += chunk
    })

    if(req.url==='/posts' && req.method === 'GET') {
        const allPosts = await Post.find()
        successHandler(res, allPosts);
    } else if (req.url === '/posts' && req.method === 'POST') {
        req.on('end', async()=>{
            try {
                const data = JSON.parse(body)
                if(data.content) {
                    const newPost = await Post.create({
                        name: data.name,
                        tags: data.tags,
                        type: data.type,
                        image: data.image,
                        content: data.content,
                        likes: data.likes,
                        comments: data.comments
                    })
                    successHandler(res, newPost);
                } else {
                    errorHandler(res)
                }
            } catch (error) {
                errorHandler(res,error);
                }
            })
    } else if (req.url==='/posts' && req.method === 'DELETE') {
        const delPosts = await Post.deleteMany({})
        successHandler(res);
    } else if (req.url.startsWith('/posts/') && req.method === 'DELETE') {
        const id = req.url.split('/').pop()
        try {
        const deleteResult = await Post.findByIdAndDelete(id);
            if(deleteResult) {
                successHandler(res, deleteResult)
            } else {
                errorHandler(res, deleteResult)
            }
        } catch(error){
            errorHandler(res, error)
        }
    } else if (req.url.startsWith('/posts/') && req.method === 'PATCH') {
        req.on('end', async()=>{
            try {
                const id = req.url.split('/').pop()
                const data = JSON.parse(body) 
                if (
                    Object.keys(data).length === 0 ||
                    (data.hasOwnProperty('content') && data.content === '') ||
                    data.tags.length === 0
                ) {
                    errorHandler(res)
                } else {
                    const updateResult = await Post.findByIdAndUpdate(id,
                        {...data},
                        opts
                        )
                    if (updateResult === null) {
                        errorHandler(res, "No such ID, please check again") 
                    }
                    res.end()          
                }
            }catch(error){
                errorHandler(res, error)
            }
        })
    } else {
        errorHandler(res,"It's a 404 page")
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