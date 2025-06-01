# README #

This README would normally document whatever steps are necessary to get your application up and running.

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

## Dependencies  ##


### pnpm ###

PNPM is used to install dependencies. The easiest way to install pnpm itself is ``npm install -g pnpm@latest-10``. There is further guidance [here](https://pnpm.io/installation) if needed.  

### Nextjs ###

Nextjs is built on the react library. 




 ### tailwind ###

 This project uses tailwind 4 for CSS. Tailwind works by added the css syntax to the className of the element. There is extenstive documentation on the [tailwind site](https://tailwindcss.com/) . One issue where tailwind differs from prior versions is you do not need to make a tailwind config file - all custom colours, spacing and so on can be stored in globals.css - which is in the app folder. The current css can act as a template on how to do this.

 ### shadcn components ###

 I have used [shadcn](https://ui.shadcn.com/) for extra ui components. These are incredibly easy to add and match the style of the UI. Simply go the website and click the component you wish to add and follow the installation commands. THe shadcn components are located in the @/components/ui folder. Other core ui components are located in @/components/core/ui


### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contactThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
