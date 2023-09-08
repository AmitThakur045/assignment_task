# assignment_task
A simple real-time chat application implementation using Socket.io, Node and React.

## Setup and run
1. Clone the Repository: Use the following command to clone the OptySys repository to your local machine:

```shell
git clone https://github.com/AmitThakur045/assignment_task.git
```

2. Make sure you have port 5173 and 8080 free in your machine.
3. Run `npm i` in both /server and /client directories.
4. Open two terminal windows and navigate to both of these directories and run `npm run dev` in the client directory and `npm run start` in the server directory. 

## Instructions to run this app
For signing in differently in the app, you can use two different browser tabs opening the same application and can chat in real time. There is no session maintained so on every page visit it will ask for signing-in. 
There are two types of users Admin and Client.

Admin has the ability to talk with more than one client which is assigned to it when the client first signs up.
The client can only talk with one admin who is assigned to it while it is signing up.

## Extra Features
- Used socket.io to provide the real-time messaging environment for both clients as well as Admin.
- Used sorted set (Priority Queue) provided by Redis to evenly distribute the users among Admin.
- Created a responsive UI. 

Messages are stored on MongoDB so even if users refresh the pages multiple times the messages won't be lost.
