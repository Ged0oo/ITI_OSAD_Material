const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

let nextArticleId = 3;
const users = [
    { fullname: 'Nagy Mohamed', email: 'nagy@example.com', dob: '2001-01-15' },
    { fullname: 'Ahmed Ali', email: 'ahmed@example.com', dob: '1996-06-22' }
];

const comments = [
    { title: 'Nice read', content: 'This article is very clear.', articleId: '1' },
    { title: 'Helpful', content: 'I used this in my assignment.', articleId: '1' },
    { title: 'Thanks', content: 'Great explanation and examples.', articleId: '2' }
];

const articles = [
    { id: '1', title: 'GraphQL Basics', content: 'Learn the basics of GraphQL.', authorEmail: 'nagy@example.com' },
    { id: '2', title: 'Node + GraphQL', content: 'Build a GraphQL API with Node.js.', authorEmail: 'ahmed@example.com' }
];

const schema = buildSchema(`
    type Query {
        users: [User!]!
        articles: [Article!]!
        article(id: ID!): Article
    }
    type Mutation {
        createArticle(title: String!, content: String!, authorEmail: String!): Article!
    }
    type User {
        fullname: String!
        email: String!
        dob: String!
    }
    type Article {
        id: ID!
        title: String!
        content: String!
        author: User!
        comments: [Comment!]!
    }
    type Comment {
        title: String!
        content: String!
    }
`);

const app = express();

const mapArticle = (article) => {
    const author = users.find((user) => user.email === article.authorEmail);
    if (!author) {
        throw new Error(`Author not found for article ${article.id}`);
    }

    return {
        id: article.id,
        title: article.title,
        content: article.content,
        author,
        comments: comments
            .filter((comment) => comment.articleId === article.id)
            .map(({ title, content }) => ({ title, content }))
    };
};

const root = {
    users: () => {
        return users;
    },

    articles: () => {
        return articles.map(mapArticle);
    },

    article: ({ id }) => {
        const article = articles.find((item) => item.id === id);
        if (!article) {
            return null;
        }
        return mapArticle(article);
    },

    createArticle: ({ title, content, authorEmail }) => {
        const author = users.find((user) => user.email === authorEmail);
        if (!author) {
            throw new Error('Author not found');
        }

        const article = {
            id: String(nextArticleId++),
            title,
            content,
            authorEmail
        };
        articles.push(article);
        return mapArticle(article);
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});