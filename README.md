# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

This is a Repo for a demo version of the Little Birdie SME app. 

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
 
--actions  - (function that run server side - such as the handleLogin functions)

--apollo - (set ups apollo client - which is used to run and then cache graphql queries)

--app  - (the next app router - each folder contains a page and this represents a url in the app ie /dashboard/subs)

--components  - (react components - which are used in the main pages - usually to split up code into managable files)

--contexts  - (files that manage react context to ensure global access to react state variables)

--interfaces  - (typescript interfaces)

--lib   - (helper functions)

--sanity - (sets up sanity CMS)

--schemas  - (for zod - a validation library - only used for login at the moment)

middleware.ts - (the middleware file stops a user from accessing authorised content before they have signed in - eg /dashboard)

### pnpm ###

PNPM is used to install dependencies. The easiest way to install pnpm itself is ``npm install -g pnpm@latest-10``. There is further guidance [here](https://pnpm.io/installation) if needed.  

## Dependencies  ##

### Nextjs ###

Nextjs is built on the react library. It features Server Side rendering (the site renders on the server as well as the client) which improves SEO. It also features built in routing - so folder names can be used to create dynamic routes. In additions, another useful feature is that it allows the devloper to create backend API routes or server functions that run on the server. For more see: [https://nextjs.org/](https://nextjs.org/). [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


 ### Tailwind css ###

 This project uses tailwind 4 for CSS. Tailwind works by added the css syntax to the className of the element. There is extenstive documentation on the [tailwind site](https://tailwindcss.com/) . One issue where tailwind differs from prior versions is you do not need to make a tailwind config file - all custom colours, spacing and so on can be stored in globals.css - which is in the app folder. The current css can act as a template on how to do this.

 ### Shadcn components ###

 I have used [shadcn](https://ui.shadcn.com/) for extra ui components. These are incredibly easy to add and match the style of the UI. Simply go the website and click the component you wish to add and follow the installation commands. THe shadcn components are located in the @/components/ui folder. Other core ui components are located in @/components/core-ui

 ### Sanity.io ###

 Sanity headless cms is used to store content in relationship to deals. I have used to store FAQs and dummy T&Cs, and privacy policy


### Who do I talk to? ###

The person how made this repo was Joseph Ketterer. To get in contact with him please contact Martin or Jeremy to get contact details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
