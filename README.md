# README #

This README would normally document whatever steps are necessary to get your application up and running. test
test

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

## Set up ##

To get a development version of the project please run the command below with the Docker daemon running on your computer.

```docker-compose up --build```

To run an interactive shell:

Run docker ps to find your container name  
 ```docker ps```

Then run the below command to start an interactive shell:  
```docker exec -it my-lbsme-container sh```

Alternatively - if you don't want to use docker run:  
```pnpm run dev```


## Configuration  ##

### Folder structure ###
src  
 
--actions  

--app  

--components  

--contexts  

--interfaces  

--lib  

--schemas  

middleware.ts

### pnpm ###

PNPM is used to install dependencies. The easiest way to install pnpm itself is ``npm install -g pnpm@latest-10``. There is further guidance [here](https://pnpm.io/installation) if needed.  

## Dependencies  ##

### Nextjs ###

Nextjs is built on the react library. It features Server Side rendering (the site renders on the server as well as the clien) which improves SEO. It also features built in routing - so folder names can be used to create dynamic routes. It also allows the devloper to create backend API routes or server functions that are run on the server.[https://nextjs.org/](https://nextjs.org/). [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


 ### Tailwind css ###

 This project uses tailwind 4 for CSS. Tailwind works by added the css syntax to the className of the element. There is extenstive documentation on the [tailwind site](https://tailwindcss.com/) . One issue where tailwind differs from prior versions is you do not need to make a tailwind config file - all custom colours, spacing and so on can be stored in globals.css - which is in the app folder. The current css can act as a template on how to do this.

 ### Shadcn components ###

 I have used [shadcn](https://ui.shadcn.com/) for extra ui components. These are incredibly easy to add and match the style of the UI. Simply go the website and click the component you wish to add and follow the installation commands. THe shadcn components are located in the @/components/ui folder. Other core ui components are located in @/components/core/ui

 ### Sanity.io ###

 Sanity headless cms is used to store content in relationship to deals.

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contactThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
