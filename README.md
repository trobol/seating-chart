# Seating Chart

This branch of the seating chart is dedicated to a next.js + express recreation of the LCDI Seating Chart.

## Installation

1. `git clone https://git.lcdi/Programmers/seating-chart -b node`
2. `cd seating-chart`
3. `npm install` or if you prefer to use yarn, `yarn install`

### ESLint

It is highly recommended for you to set up ESLint. ESLint will ensure that you are writing code that looks good, and will also help you catch a lot of errors. Enforcing good code style will help with maintainability and safeness of code.

#### Setting Up

1. In VSCode install both the `ESLint` and `Prettier` extensions.
2. In your VSCode settings `File -> Preferences -> Settings`, go to the ESLint settings under `Extensions`.
3. Check `Eslint: Auto Fix On Save`.
4. Make sure `Eslint: Run` is set to `onType`.
5. Go to the Prettier settings under `Extensions`.
6. Check `Prettier: Eslint Integration`.

## Localhost Database: XAMPP

Download XAMPP [Here](https://www.apachefriends.org/index.html). XAMPP is used to set up a local MySQL database. You can also use PHPMyAdmin to view the database in further detail.

## Running

Running the application is extremely simple. Make sure you are in the `seating-chart` directory then run:

`npm run dev` or, if you use yarn: `yarn run dev`

## Goal

The goal or purpose of this rewrite is because the authors of this branch believe the current implementation of the seating-chart is 
not well maintainable, and the code is messy. This new implementation will allow for greater maintainability and easy bug fixing. React
comes with much greater dev tools (Chrome Extension `React Developer Tools` found 
[Here](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)).
This implementation will be much more familiar for many to work on as well, since Computer Science Majors are generally taught some JavaScript
through the Champlain curriculum in their first semester. There great docs for many of the libraries which are easily searchable through Google.
Overall, it may be a lot of work to re-create the seating chart. However, if it is successful, it will greatly decrease the amount of time
needed for a new member of the team to get started on bug fixing and general feature development.

Signed,

Adam DeCosta, Kevin Eaton, Jackson Michaels

## Back-End Design

![Database Design](documentation_assets/database_layout.png?raw=true "Database Design")
*This Database Diagram was made using MySQL Workbench*

### Database

:key: = Primary Key
:small_orange_diamond: = Non-Null Foreign Key
:small_blue_diamond: = Non-Null Value

## Development Server

### Set-Up

*The development server has already been created this only serves as a guide to help new possible new development servers in the future*

#### Server Configurations

- Ubuntu Server VM
- [Nginx](https://www.nginx.com/)
- Node
- Git CLI
- MySql
- phpMyAdmin (optional but highly recommended)
- [PM2](http://pm2.keymetrics.io/docs/usage/quick-start/)

*this should be sent as a support ticket as [here](https://support.lcdi/)*

#### MySql Set-Up

Any seating chart server creates monthly backups of the database but it is best to use the production server backups as that will contain the most up to date and stable information. Backups will be located in `.database/` folder. Choose the most recent back up file. Now on the new server, open phpMyAdmin and create a new databse called `seating` and then import the database.

#### Serving Seating Chart

Follow the first three steps of [Installation Guide](#Installation) in the `/var/www/html/` folder. This will install all the packages that you need.

Set up your `.env` with correct credentials.

Run `pm2 start --name seating-chart server/server.js`. This starts the projects on port 3000 and a reserve proxy should be redirecting it to port 80 via nginx. If this is not the case then check the nginx config files with the help of network admins.

### WhenIWork API Integration

[WhenIWork Documentation](http://dev.wheniwork.com/)

[WhenIWork NPM Documentation](https://www.npmjs.com/package/wheniwork)

The API KEY can be found on secret server

In the .env file put the following

```
WIW_API_KEY=API_KEY
WIW_USERNAME=USERNAME
WIW_PASSWORD=PASSWORD
WIW_ACCOUNT_ID=ACCOUNT_ID
```

## Tutorials before you start working on Seating Chart

[Introduction to Javascript](https://www.w3schools.com/js/)

[React Tutorial](https://reactjs.org/docs/)

[Next.js Tutorial](https://nextjs.org/learn/basics/getting-started)

[Passport.js Documentation](http://www.passportjs.org/docs/)

[Object Deconstruction](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

[Git Tutorial](https://git-scm.com/docs/gittutorial)

[Moment JS](https://momentjs.com/)

[Lodash](https://lodash.com/docs/4.17.14)

## Other Important Sites

[Material Tables](https://mbrn.github.io/material-table/#/)

[Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

## Inspirational Quotes

Ubuntu Server VM, Nginx to serve static assets and proxy for node. Pretty simple.
