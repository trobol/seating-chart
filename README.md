# Seating Chart

This branch of the seating chart is dedicated to a next.js + express recreation of the LCDI Seating Chart.

## Installation

1. `git clone https://git.lcdi/Programmers/seating-chart -b node`
2. `cd seating-chart`
3. `npm install` or if you prefer to use yarn, `yarn install`

### ESLint

It is highly recommended for you to set up ESLint. ESLint will ensure that you are writing code that looks good, and will also help you catch
a lot of errors. Enforcing good code style will help with maintainability and safeness of code.

#### Setting Up

1. In VSCode install both the `ESLint` and `Prettier` extensions.
2. In your VSCode settings `File -> Preferences -> Settings`, go to the ESLint settings under `Extensions`.
3. Check `Eslint: Auto Fix On Save`.
4. Make sure `Eslint: Run` is set to `onType`.
5. Go to the Prettier settings under `Extensions`.
6. Check `Prettier: Eslint Integration`.

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

## TODO
* Front-end 
    * User page
        * Manage seat
            * take
            * Change
            * return
        * Manage reservations
        * User Management
            * Register user
            * Change user data
            * View users timesheet (could just use when I work instead)
    * Admin page                     
        * Admin dashboard
        * Projects
        * Reports/logs
        * Guests
        * All user management
        * All user timesheets
* Backend
    * WiW Integration
    * Make/find API to handle all front end requests
* Misc
    * make new kiosk app (potentially custom made IOS app)
    * standalone map page for use on screen outside door