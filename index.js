import express from 'express';
import bodyParser from 'body-parser';
import { blogData, blogData2 } from './Model/data.js';
import { Blog, Blog2 } from './Model/blog.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs', { blogData: blogData });
});

app.get('/blog-post/:title', (req, res) => {
  const blogTitle = req.params.title;
  const matchingBlogs = [];
  
  blogData.forEach(blog1 => {
    blogData2.forEach(blog2 => {
      if (blog1.title ===  blogTitle  && blog2.title === blogTitle) {
        matchingBlogs.push({
          title: blog1.title,
          content: blog1.content,
          author: blog1.author,
          date: blog1.date,
          wholeContent: blog2.wholeContent,
          wholeContent2: blog2.wholeContent2
        });
      }
    });
  });



  if (matchingBlogs) {
    res.render('blog-post.ejs', { matchingBlogs });
  } else {
    res.status(404).send('Blog post not found');
  }
});

app.get('/post', (req, res) => {
    res.render('post.ejs');
});


app.post('/post', (req, res) => {
  const { title, content, author, date, wholeContent, wholeContent2 } = req.body;
  const newBlog = new Blog(title, content, author, date);
  const newBlog2 = new Blog2(title, wholeContent, wholeContent2);
  blogData.push(newBlog);
  blogData2.push(newBlog2);
  res.redirect('/');
});

app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
})



  
 