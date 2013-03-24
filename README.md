#looter

Looter is a Node.js app that allows you to fetch HTML content of web sites and transfer the HTML tags into JSON objects.

The input of looter is URL, the output is the HTML tags structures in JSON format.

##Installation

Before installing looter, make sure [node.js](http://nodejs.org/) is installed in your machine.

    git clone git://github.com/fuyei/looter.git
    
Once the packages cloned to your local machine, use npm to install:

    npm install
    
Then it's done.


##Get Started
Start the node app in command line:
  npm start
or 
  node app.js

That looter app will be initiated, then open up a browser and go to `http://localhost:3000`. You will see a looter viewer.

![Alt text](/public/images/viewer.PNG "Looter viewer")

##Limitation

Currently only supports HTTP protocol, ignores @script@ and @head@ tags. Only inspect the content of `BODY` tag. 

