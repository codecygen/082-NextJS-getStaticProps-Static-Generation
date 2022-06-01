// fs is a nodejs module
// path is a nodejs module
// This module will not appear in Client Side App
import path from 'path';
import fs from 'fs/promises';

const ProductDetailPage = props => {
    const { loadedProduct } = props;

    return (
        <>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </>
    )
}

// NextJS-getStaticProps-getStaticPathsServer-Side-Dynamic-Link-Parameter-Extraction
// Server side dynamic link parameter extraction
export const getStaticProps = async (context) => {
    const { params } = context;

    const productId = params.pid;

    const filePath = path.join(process.cwd(), 'data/dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    const product = data.products.find(product => product.id === productId);

    return {
        props: {
            loadedProduct: product
        }
    };
};

// NextJS-getStaticProps-getStaticPathsServer-Side-Dynamic-Link-Parameter-Extraction
// Server side dynamic link parameter extraction
export const getStaticPaths = async () => {
    // we have to create this section because, for dynamic links,
    // NextJS does not know how many pages need to be created
    // Normally for other pages production server pregenerates all pages
    // when you run 'npm run build'. But for dynamic links, there could
    // be thousands of pages like this. That is the reason, NextJS for these
    // cases, instead of created thousands of pages ahead of time, only
    // generates up in advance when the request is made.
    return {
        paths: [
            { params: { pid: 'p1' } },
            { params: { pid: 'p2' } },
            { params: { pid: 'p3' } }
        ],

        fallback: false
    };
};

export default ProductDetailPage;