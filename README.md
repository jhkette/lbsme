# README #
  
### What is this repository for? ###
 
This is a Repo for a demo version of the Little Birdie SME website.


## Set up ##

You need to add an .env file with the relevant variables in the root of the project. 

To get a development version of the project please run the command below with the Docker daemon running on your computer.

```docker-compose up --build```

At the moment I am running the project in a development container. However, there is a file to produce a production container in the project if needed.

Alternatively - if you don't want to use docker run:  
```pnpm run dev```


## Configuration  ##

### Folder structure ###
src  
 
--actions  - (function that run server side - such as the handleLogin functions)
note. server actions are sequential (if multiple are called togethor) and next api routes can run in parallel. So next api routes are better for more complex, chained calls but for what I am doing I feel server actions are fine.

--apollo - (set ups apollo client - which is used to run and then cache graphql queries)

--app  - (the next app router - each folder contains a page and this represents a url in the app ie /dashboard/subs)

--components  - (react components - which are used in the main pages - usually to split up code into managable files)

--contexts  - (files that manage react context to ensure global access to react state variables)

--interfaces  - (typescript interfaces)

--lib   - (helper functions)

--sanity - (sets up sanity CMS)

--schemas  - (for zod - a validation library)

middleware.ts - (the middleware file stops a user from accessing authorised content before they have signed in - eg /dashboard)

### pnpm ###

PNPM is used to install dependencies. The easiest way to install pnpm itself is ``npm install -g pnpm@latest-10``. There is further guidance [here](https://pnpm.io/installation) if needed.  


## Dependencies  ##

#### Nextjs 

Nextjs is built on the react library. It features Server Side rendering (the site renders on the server as well as the client) which improves SEO. It also features built in routing - so folder names can be used to create dynamic routes. In additions, another useful feature is that it allows the devloper to create backend API routes or server functions that run on the server. For more see: [https://nextjs.org/](https://nextjs.org/). [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.


#### Graphql / Apollo CLient

This project uses graphql with Apollo Client to query data from the backend. Apollo client is the intermediary library used to run the queries and cache them. There are different caching options available but in the project I feel it is advantageous to cache as much as possible. Therefore I recommend using the "cache and network" option. To add a graphql query check against the backend or AWS appsync playground that it will run then add it to the graphql folder. Then run  ``pnpm run codegen`` to generate functions you can call in the project. 


#### Tailwind css 

 This project uses tailwind 4 for CSS. Tailwind works by added the css syntax to the className of the element. There is extenstive documentation on the [tailwind site](https://tailwindcss.com/) . One issue where tailwind differs from prior versions is you do not need to make a tailwind config file - all custom colours, spacing and so on can be stored in globals.css - which is in the app folder. The current css can act as a template on how to do this.

#### Shadcn components 

 I have used [shadcn](https://ui.shadcn.com/) for extra ui components. These are incredibly easy to add and match the style of the UI. Simply go the website and click the component you wish to add and follow the installation commands. THe shadcn components are located in the @/components/ui folder. Other non shadcn core ui components are located in @/components/core-ui

#### Sanity.io 

 Sanity headless cms is used to store content in relationship to Faqs, Terms and Conditions, and Privacy Policy. It can also be configured to add other content if necessary. There is configiration in the [..studio] folder and the sanity folder.

### Who do I talk to? 

The person how made this repo was Joseph Ketterer. To get in contact with him please contact Martin or Jeremy to get contact details.

## CMS
A cms is available at /studio and you can login with an allowed email

## Additional info
At the moment the site is hidden from search engines using -  
```<meta name="robots" content="noindex,nofollow" />```
If the site is visiting on a mobile it redirects to a download the app page - but the link has not been added. 

### Deployed on Vercel

This app is deployed as a demo on vercel.
