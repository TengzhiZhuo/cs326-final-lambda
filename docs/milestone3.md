# Milestone 3

## Team Name

Team Lambda

## Application Name

UShare

## Team Overview

* Developer 1: Tengzhi Zhuo, username: TengzhiZhuo
* Developer 2: Yi Ding, username: angelading
* Developer 3: Hongxiang Wang, username: hongxiangwan

## Database Documentation

The first collection of our database is the users' data. It includes the username and password created by the users.
```
user document
{	
    _id: <ObjectId1>, 
    username: String,  // The name of the user
    password: Integer  // The password entered by the user
}
```
The Second collection of our database is the data of the users' posts. It includes the username of the user who submitted the post, as well as the title, contents, and images of the post.
```
post document
{
    _id: <ObjectId2>,
    username: String, // The user who submitted the post
    title: String, // The title of the post
    content: String, // The content of the post
    image1: String, // The name of the first image
    image2: String // The name of the second image
}
```
The third collection of our database is the comments under a specific post. It includes the username of the user, post title, content of the comment, and comment postion.
```
comment document
{
    _id: <ObjectId3>,
    username: String, // The user who posted this comment
    post: String, // The post that this comment is in
    content: String,  // The content of this comment
    position: Integer // The position of the comment in the post
}
```
The forth collection of our database is the users' profile data. It includes the username, graduation year, major, minor, interest, and avaster entered by the users.
```
profile document
{
    _id: <ObjectId4>,
    username: String,  // The username of the user
    graduation: Integer, // The graduation year of the user
    major: String, // The major of the user
    minor: String, // The minor of the user
    interest: String, // The interest of the user
    avatar: String // The name of the image of user's avatar
}
```


## Breakdown of Labor Division
* Tengzhi Zhuo: Modified CRUD operations and backend codes of user page, signup page, implement Mongodb database.
* Yi Ding: Writing the MD file, designing the database, implement Mongodb database.
* Hongxiang Wang: Modified CRUD operations and backend codes of login page, signup page, main page.
