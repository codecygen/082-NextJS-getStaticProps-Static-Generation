// fs is a nodejs module
// path is a nodejs module
// This module will not appear in Client Side App
import path from 'path';
import fs from 'fs/promises';

const ProductDetailPage = props => {
    const { loadedProduct } = props;

    // This fallback content section is needed because if 
    // you manually type http://localhost:3000/products/p3 to browser, because
    // in getStaticPaths, p3 is not defined, the webpage
    // will be created on the fly upon request. By putting this
    // you allow Next.JS enough time to generate p3 page upon manual
    // typing on the browser, instead of directing to the page with link
    // clicking. For link clicking http://localhost:3000/products/p3 will open
    // even without this section.
    if (!loadedProduct) {
        return <p>Loading...</p>
    }

    return (
        <>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </>
    )
}

const getData = async () => {
    const filePath = path.join(process.cwd(), 'data/dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return data;
};

// NextJS-getStaticProps-getStaticPathsServer-Dynamic-Link-Parameter-Extraction
// Server side dynamic link parameter extraction
export const getStaticProps = async (context) => {
    const { params } = context;

    // pid is coming from the page Component File.
    const productId = params.pid;

    const data = await getData();

    const product = data.products.find(product => product.id === productId);

    // If we try to load http://localhost:3000/products/p4
    // Since it does not exist and fallback is set to true
    // page won't be able to be generated on the fly because
    // the data for p4 does not exist. Normally instead of throwing
    // 404 page error, website shows another error.
    // Error: Failed to load static props
    // To prevent it and load the 404 page, this section is needed.
    if (!product) {
        return { notFound: true };
    }

    return {
        props: {
            loadedProduct: product
        }
    };
};

// NextJS-getStaticProps-getStaticPathsServer-Dynamic-Link-Parameter-Extraction
// This section is needed to support getStaticProps.
export const getStaticPaths = async () => {
    // we have to create this section because, for dynamic links,
    // NextJS does not know how many pages need to be created
    // Normally for other pages production server pregenerates all pages
    // when you run 'npm run build'. But for dynamic links, there could
    // be thousands of pages like this. That is the reason, NextJS for these
    // cases, instead of created thousands of pages ahead of time, only
    // generates up in advance when the request is made.

    // Here the idea is to only include the mostly visited page(s) so that their
    // static html code will be pregenerated.
    // fallback has to be set to "true" to achieve this.


    // instead of manually typing pids down below in the return section, 
    // write it like this,
    const data = await getData();
    const ids = data.products.map(product => product.id);

    const pathsWithParams = ids.map(id => ({ params: { pid: id } }));

    return {
        // instead of manually typing pids, write it like this,
        // paths: [
        //     { params: { pid: 'p1' } }
        // ],

        paths: pathsWithParams,

        // fallback now states that even if we request page
        // http://localhost:3000/products/p4, try to load it on the fly and
        // don't put 404 page.
        fallback: true
        // Alternatively
        // fallback: 'blocking'
        // can be used to eliminate fallback
        // section up top which is represented as
        // if(!loadedProduct) {
        //     return <p>Loading...</p>
        // }
    };
};

export default ProductDetailPage;