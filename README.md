# hyper wrapped

![Hyper Wrapped Preview](./hyper-wrapped.png)

This was a project developed for an internship interview. The project involved creating a full stack web application that allows users to visualize their yearly bank activity, in a similar way to Spotify Wrapped and others. 

Once the frontend and backend are running, you should be able to login using one of the following usernames: `chico`, `alanturing`, `johnmcc`, `mminsky` or `konzuse`. The password field wasn't implemented and the register option isn't available, since it didn't make sense for the project.

## demo

<div align="center">
  <video src=https://github.com/emmanuelsdias/hyper-wrapped/assets/62708624/20663a32-5a74-45c9-ba35-8b4693d3d30e width="400" />
</div>

## backend

The backend was developed using FastAPI. Its main function is to enable login, communicate with the database and, through the use of queries, provide stats and trends for the frontend's wrapped section.

### how to run

To make the backend work correctly, you first need to link it to your PostgreSQL database. For that, create your database and then update the `URL_DATABASE` parameters located inside `backend/database/__init__.py` with your credentials.

Next, to run the backend app, you need to have Python installed. Once inside the `backend` folder, create and activate your Python environment. Then, run `make install` to install all needed dependencies and `make start` to run the app.

Once you run the backend app for the first time, it should create the PostgreSQL tables and relations according to the implemented models. However, all the tables should be empty for now. To populate them, use a PostgreSQL management tool (such as pgAdmin) or command line to import the mock data provided in `database_dummy`. Note that the `transaction_id` field in `transactions` is not supposed to be among the columns to import and should be created automatically. 


### structure

The backend structure is divided in the following folders:

- `controllers`: defines the logic of the database's queries 
- `database`: defines the connection to the PostgreSQL database
- `models`: creates the models for each of the database's tables
- `routes`: provides the logic to communicate with the frontend and forward requests to the controllers
- `schemas`: defines the object's interface throught the app

## frontend

The frontend was developed using ReactJS. The app is responsive and should work in both desktop and mobile devices.

### how to run

To run the frontend, you need to have NodeJS installed. Then, once inside the `frontend` folder, run `npm install` to install all needed dependencies and finally `npm start` to run the app. 

To properly communicate with the backend, update the `API_URL` located inside `frontend/api/config.js` to match your backend's URL.

### structure

 The `src` folder contains the source code for the frontend. It is divided into the following folders:

- `api`: contains the code to communicate with the backend
- `components`: contains the reusable React components used throughout the app, with `Animations` and `Data` folders containing multiple components each
- `fonts`: contains the fonts used in the app
- `images`: contains the images used in the app
- `pages`: contains the pages used in the app, with the `wrapped` folder containing multiple pages in it
- `styles`: contains the global styles of the app
- `utils`: contains utility functions used in the app

## credits

Although the project uses [Hyperplane AI](https://hyperplane.ai/)'s visual identity, it was only used for the development of the project and in no way represents the company's values or intentions.

To create the mock data available at `database_dummy`, Erik Altman's [Credit Card Transactions' table](https://www.kaggle.com/datasets/ealtman2019/credit-card-transactions/) was adapted, keeping only the first five users' transactions (preventing the +2GB needed to store the full table) and adapting some of the original fields.
