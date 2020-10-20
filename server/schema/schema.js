const graphql = require('graphql')
const { reduceRight } = require('lodash')
const _ = require('lodash')

const Book = require('../models/book')
const Author = require('../models/author')

const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLInt, 
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql

const books = [
    {name:'you dont know js 1',genre:"js",id:'1',authorId:'1'},
    {name:'you dont know js 2',genre:"JavaScript",id:'2',authorId:'2'},
    {name:'you dont know js 3',genre:"CSS",id:'3',authorId:'3'},
    { name: 'you dont know js 1', genre: "js", id: '4', authorId: '1' },
    { name: 'you dont know js 2', genre: "JavaScript", id: '5', authorId: '2' },
    { name: 'you dont know js 3', genre: "CSS", id: '6', authorId: '3' },
]

const authors = [
    {name:'kyle1',age:40,id:'1'},
    {name:'kyle3',age:41,id:'2'},
    {name:'kyle4',age:44,id:'3'},
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id: { type: GraphQLID},
        name:{type:GraphQLString},
        genre: { type: GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                // return _.find(authors,{id:parent.authorId})
                return Author.findById(parent.authorId)
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return _.filter(books,{authorId:parent.id})
                return Book.find({authorId:parent.id})
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args: { id: { type: GraphQLID}},
            resolve(parent,args){
                //code to get date from db / other source
                // return _.find(books, { id: args.id})
                return Book.findById(args.id)
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                // return _.find(authors,{id:args.id})
                return Author.findById(args.id)
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                // return books
                return Book.find({})
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return Author.find({})
                // return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                age: { type: new GraphQLNonNull(GraphQLInt)}
            },
            resolve(parent,args){
              let author = new Author({
                  name:args.name,
                  age:args.age
              })  
              return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString)},
                genre: { type: new GraphQLNonNull(GraphQLString)},
                authorId: { type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })

                return book.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery,
    mutation:Mutation,
})