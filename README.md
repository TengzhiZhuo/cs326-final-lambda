# Team Lambda

## UShare

### Semester

Fall 2021

### Team Members

* Developer 1: Tengzhi Zhuo, username: TengzhiZhuo
* Developer 2: Yi Ding, username: angelading
* Developer 3: Hongxiang Wang, username: hongxiangwan


### Project Overview
UShare is a platform that allows UMass students to share their good experience on campus. They can post food recommendations around campus, interesting club they recommend others to join, or a good location to study. They can also share any good resources on campus, such as LRC and CCPH. Any good experience or resources they could share with other students on campus is great. 

Users can post data such as images, time, locations, etc., and other users can post their comments and thoughts on the comment section. Some existing popular experience sharing apps includes Instagram and Pinterest. Comparing to these existing apps, our web application is going to be specifically focusing on UMass students. Users are going to share their experience relate to UMass campus, and they are also going to post pictures and the specific location on campus. Moreover, Instagram and Pinterest are mainly focused on sharing images, in our app, text contents and images are going to have equal importance.


### User Interface
#### Login Page

This page is for the users to log in to their account.

<img src="docs/img/final-login.png" alt="alt text" title="image Title" />

#### Sign up Page

This page is for the users to sign up for an account if they don't have one.

<img src="docs/img/final-signup.png" alt="alt text" title="image Title" />

#### Home Page
In the home page, the users can send a post with texts, photos, and locations. Other users can view the posts and they can click on the post title to see all the information.

<img src="docs/img/final-homepage.png" alt="alt text" title="image Title" />

#### Content Page

The content page is the page where users can see the full content of the experience shown by another user. At the top of the page, its some buttons to direct the user to other pages. Users can access all the images and the contents of the post in this page. Also, their is a comment section for users to share ideas and thoughts at the bottom. 

<img src="docs/img/final-contentpage.png" alt="alt text" title="image Title" />

#### User Profile Page
The user profile page is for the user to log their graduation date, major, minor, and interest. They can click on the "Save" button to save their information. They can also upload their profile pictures by clicking on the "Upload Your Avaar" button, and logout from their account by clicking on the "Logout" button. 

<img src="docs/img/final-profilepage.png" alt="alt text" title="image Title" />



### APIs
Based on simple REST principles, the UShare Web API endpoints return JSON metadata about user login, user profile, posts, and comments, directly from the UShare Data Catalogue.

Data resources are accessed via standard HTTPS requests to an API endpoint. Basic routing which is method of the Express `app` object is being used to serve the files. `app.get()` is used to handle GET requests and `app.post` is used to handle POST requests

| Requests | Actions |
| -------- | -------- |
|GET /getProfile | Retrieves user profile data |
|POST /loginsubmit | Check log in |
|POST /signupsubmit | Save user username and password |
|GET /getPost | Retrieves posts data|
|POST /postsubmit | Creates the post data when a user create a new post |
|POST /profilesubmit | Creates profile data identified by User name |
|GET /getComment | Retrieves user comment data |
|POST /commentsubmit | Creates user comment data identified by User name and Post name |


### Database Documentation

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


### URL Routes/Mappings

| Routes | Description |
| -------- | -------- |
|Login -> Signup | When the user needs to sign up |
|Login -> Homepage | Each user can only access their own homepage / Check contents on Homepage |
|Homepage -> Contentpage | Each user can only have their own username to give comments / Check the contents of any of the posts shwon on Homepage |
|Homepage/Contentpage -> Profilepage | Each user can only check their own profile / Check or modify contents of the profile |
|Homepage/Contentpage/Profilepage -> Login(sign out) | To sign out of current user |

### Authentication/Authorization

  - All the user's usernames must be unique
  - A window will pop up after successfully signed up
  - The password for log in must match the one signed up
  - A window will pop up if the password or the username
  - Only able to view the details of the inner pages if you are a user
  - Different users can only view their own unique pages

### Breakdown of Labor Division
* Tengzhi Zhuo: Compeleted the HTML and CSS of main page and user profile page. The server setup, the userPage html CRUD operations. Modified CRUD operations and backend codes of user page, signup page, implement Mongodb database.
* Yi Ding: Compeleted wireframes of mainpage, login page, content page, and the userprofile. API design, html CRUD operations, md file writing. Writing the MD file, designing the database, implement Mongodb database.
* Hongxiang Wang: Compeleted the HTML and CSS of user login page and content page. MainPage html CRUD operations, md file writing. Modified CRUD operations and backend codes of login page, signup page, main page.


### Conclusion

Through the whole design and implementation process we have learned many interesting html and css operations, the way of creating a server and the CRUD operations and most importantly different features in github. The greatest difficulties is the to implement the routing of different pages. We have five different html pages in total and for different user/post the pages should show different contents. Another difficulty that we concountered is the sever and CRUD operations, which took us quite a long time to make it work successfully. A thing that our team would have liked to know or do before starting the project is that we have to plan a complete routing when designing the html pages. It took us some times to go back on the html pages when we were working on other Milestones and plan a complete routing would have helped us later.

