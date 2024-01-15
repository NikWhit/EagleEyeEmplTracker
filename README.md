# EagleEyeEmplTracker

## Description
This handy little Node app could be a great way for an HR team to keep track of their roster of people. Using MySQL the databases can be uploaded. 
Instructions for prepping MySQL with necessary data. 
mysql> use employee_db> source db/schema.sql> source seeds.sql> quit
I changed a few things up for originality. Instead of "Role", I used the term "Position", which postulated a very interesting find. The term "position" is actually a sql reserved term, so having to use `position` backticks is 100% necessary for some parts of the code. I kept it to prove the discovery, rather than reverting back to "role". I also changed "employee" to "hired", because the database was already called employee. I wanted to differentiate for my own sanity. 

##Example Video
https://drive.google.com/file/d/1FV_U6OgC0opGPoC4rQv3DPvmmezsM5iS/view
<img width="997" alt="Screenshot 2024-01-14 at 7 50 57 PM" src="https://github.com/NikWhit/EagleEyeEmplTracker/assets/135679785/40e9cc25-12b0-4e61-89d7-9c5d31959f5d">


## Install
After installing all the dependencies listed in the package.json. Run "npm install", and you'll have them loaded. 

## Use
In order to use this, ensure you 1st, run the mysql process to seed the data. 
Then in your terminal type, "npm start", and you'll be taken to the menu on your terminal. 

## EasterEgg
Did you happen to notice the names of the 'hired'? Its some of the actors that play the avengers.

## Credit
UofU-VIRT-FSF-PT-06-2023-U-LOLC-main/12-SQL/01-Activities/28-Stu_Mini-Project
Also, Module 10 helped immensely with structure.
Helped a bit with structure, and to get an overall idea of how I would accomplish this. 
I learned a lot about inquirer and ESM and CommonJS during this exercise. 

Many of the requirements took me back to the class material of 10-OOP/01-Activities and 02-Challenge
