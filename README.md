# EV_Charge Decentralised Data Store and Web Application


## To run on your local computer you will need the following.

See: https://nodejs.org/en/ 
See: http://truffleframework.com/

## Once installed run the following commands in order;

Setup Commands

Open 2 console windows;

console #1 run;

  git clone https://github.com/eh7/EV_Charge.git 

  cd EV_Charge/

  npm install

console #2 run;

  truffle develop

back to console #1 run;

  truffle test test/set_dev_chain.js

  node charge.js

Then in browser go to url return from running "node charge.js", default url is;

 http://localhost:8284
 
After running the "node charge.js" command you will also see a list of addresses to test the web front end out.

Any question or problems, let me know;

Gavin. (http://eh7.co.uk)  :)


-----------
### The Problem

## Share&Charge coding challenge

At Share&Charge we are developing an e-mobility charging platform and associated software components to enable a more seamless and enjoyable end user experience for electric vehicle users and better integration between e-mobility providers and charging pole operators.

For this challenge you are tasked with developing a key feature of the platform, a web component  that enables an EV driver to explore their charging history.

Story
As an EV driver 
I want to be able to review my entire charging history 
So that I can determine the overall costs involved

Acceptance Criteria
I want to see a maximum of 10 items per page
I want the ability to page backwards and forwards 10 pages at a time 
I want to see for each history item the date & time of the charge
I want to see for each history item the duration of the charge
I want to see for each history item the total costs calculated as 1.00 per hour
All history is stored in a decentralized fashion on the block chain, how it is stored and retrieved is left up to the developer.

The aim of the exercise is to showcase tools, framework, patterns and practices of developing Ethereum based web solutions… e.g. use of Web3.js and TDD.
We want to see good use of established frameworks and scripts to quickly enable us to run the provided solution locally, for example use of Ganache and Truffle framework is a good starting point.

-----------

