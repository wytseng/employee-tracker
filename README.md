# Employee Tracker

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)

## Description 

This is a command line applications that prompts users to enter data regarding company employees, roles, and departments. The application will save the data entered on a local database storage, and is capable of retrieving and manidpulating database information.

## Table of Contents 

* [Installation](#installation) 

* [Usage](#Usage) 

* [License](#license) 

* [Contribution](#contribution) 

* [Questions](#questions) 

## Installation 

Before you are able to run the application, make sure to: 

1. Run ``` npm i ``` to install all the node packages required for this application. 
2. Create your local database and seed the database will values if needed. This repository includes the schema.sql and seed.sql file that will help you in setting up your databse. 

    **Method 1**: You can copy the code from schema.sql and seed.sql and paste it in your MySQL workbench. Running the code (with schema first) should successfully create the starter database. 

    **Method 2**: You can also create and populate your database through MySQL shell. 

    Run ```$ mysql -u root``` to start the shell, add a '-p' if you have a password on you root user. Then run ```source db/schema.sql``` and ```source db/seed.sql``` to create and populate the starter database.

## Usage 

This application is free to use by anyone. 

To start the application, run ```node index.js``` or  ```npm start``` in your terminal. The application will prompt you for an action to either view, add or remove tables in the database or update an employee's manager and role. 

Note that removing a department or a role will remove all the employees linked to the department and the role. 

Here is a video demonstration of the webpage functionalities: https://drive.google.com/file/d/1j3cJH3-zCZPdHt-GZIWn8e9wM7UQ-_FG/view. 


## License 

GNU General Public License v3.0

## Contribution

If you would like to contribute to this application, please reach out to the owner via email first. You can find the owner's email listed under the 'Questions' section below.  

## Questions 
If you have any questions about the repo, open an issue or contact me directly at stephanietseng113@gmail.com. 
You can find more of my work at [wytseng](https://github.com/wytseng).