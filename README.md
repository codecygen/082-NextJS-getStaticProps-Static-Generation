This is a very simple Next.js app.

Pages created in this app are;
- http://localhost:3000
- http://localhost:3000/aras, which would generate dynamic uid page
- http://localhost:3000/products/p2, which would generate p2 product id 
- http://localhost:3000/last-sales


When you run "npm run dev" server files are optimized and ".next" folder gets created.
"npm start" starts the server with the files under ".next" folder. These files are for production.

## Keywords:
- **NextJS-getStaticProps-Static-Side-Rendering**
- **NextJS-ISR-Incremental-Static-Regeneration**
- **NextJS-getStaticProps-getStaticPathsServer-Dynamic-Link-Parameter-Extraction**, there is a possibility to extract the data through getStaticProps, instead of useRouter's router.query.parameter option. When you use useRouter hook, the dynamic link data is extracted from the client side, whereas with the "context" argument of getStaticProps function, you are able to extract the data from server side.
- **NextJS-getServerSideProps-Server-Side-Rendering**
- **NextJS-Client-Side-Data-Fetching**, if data is changing frequently such as stock prices, if the data is highly user specific such as last orders of a customer in an online shop, if partial data needs to be loaded which is only used on the part of the page, then prefetching data for the page generation might not work as required. In these circumstances, traditional React hooks for client side data fetching such as useEffect() and Javascript built in method fetch() works fine.