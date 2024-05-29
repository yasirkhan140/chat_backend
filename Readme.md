


# Real Time Chat Application
  This application built using Node.js, Express, Socket.io, Postgres, RESTful Web Service.
  
  

# Features
  <li>Uses Express as the application Framework.</li> 
  <li>Real-time communication between a client and a server using Socket.io.</li>
  <li>Uses Postgres, Postgres  for storing messages and querying data.</li>
  <li>Uses RESTful Web Service for serve different platforms</li> 

# Installation

### Running Locally

Make sure you have Node.js and npm install.

  
      
## How It Works

  A database called "chat_db" named is created via code. 
  The nickname, msg, group information is also kept in the table named Messages.
    
  User to user, As a publication broadcast or group in the room  messaging.
  User to user messaging:
   <pre> /w username messagetext</pre> the message is sent as.
      
 ## Sockets
    
   Having an active connection opened between the client and the server so client can send and receive data. This allows             real-time communication using TCP sockets. This is made possible by Socket.io.

   The client starts by connecting to the server through a socket(maybe also assigned to a specific namespace). Once connections is successful, client and server can emit and listen to events. 

## RESTful

  Using HTTP requests, we can use the respective action to trigger every of these four CRUD operations.    
    <li>POST is used to send data to a server — Create</li>
    <li>GET is used to fetch data from a server — Read</li>
    <li>PUT is used to send and update data — Update</li>
    <li>DELETE is used to delete data — Delete  </li>
    
  
  


## Run Locally

Clone the project

```bash
  git clone https://github.com/yasirkhan140/chat_backend
```

Go to the project directory

```bash
  cd chat_backend
```

Install dependencies

```bash
  npm install
```

Start the typescript watch

```bash
  npm run tsc
```
After tsc Start the server 

```bash
  npm run dev
```


## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express


## 🛠 Skills
Javascript, HTML, CSS,Node js postgres , express , socket.io...


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/yasirkhan140/chat_backend)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/yasir-khan-699651204/)


