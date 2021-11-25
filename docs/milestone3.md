# Milestone2

## Team Name

Team Lambda

## Application Name

UShare

## Team Overview

* Developer 1: Tengzhi Zhuo, username: TengzhiZhuo
* Developer 2: Yi Ding, username: angelading
* Developer 3: Hongxiang Wang, username: hongxiangwan

## Database Documentation

user document
{	
    _id: <ObjectId1>, 
    username: String,  // The name of the user
    password: Integer  // The password entered by the user
}

post document
{
    _id: <ObjectId2>,
    username: String, // The user who submitted the post
    title: String, // The title of the post
    content: String, // The content of the post
    image1: String, // The name of the first image
    image2: String // The name of the second image
}

comment document
{
    _id: <ObjectId3>,
    username: String, // The user who posted this comment
    post: String, // The post that this comment is in
    content: String,  // The content of this comment
    position: Integer // The position of the comment in the post
}

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


## Breakdown of Labor Division
* Tengzhi Zhuo: 
* Yi Ding: 
* Hongxiang Wang: 
