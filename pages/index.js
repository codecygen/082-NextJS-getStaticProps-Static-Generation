// fs is a nodejs module
// path is a nodejs module
// This module will not appear in Client Side App
import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

const HomePage = (props) => {
  const { products } = props;

  return (
    <ul>
      {products.map(product => (
        <li
          key={product.id}>
          <Link href={`/${product.id}`}>
            {product.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

// NextJS-getStaticProps-Server-Side-Rendering
// Code in getStaticProps is not shipped to the client
export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), 'data/dummy-backend.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // redirect return object key for SSR
  if (!data) {
    return {
      redirect: {
        destiunation: '/no-data',
      }
    }
  }

  // notFound return object key for SSR
  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products
    },

    // NextJS-ISR-Incremental-Static-Regeneration
    //  Means generate the page after every 10 seconds.
    // It does not mean that page will be refreshed after 2 secs.
    // It means if a new http requests comes after 2 seconds a newly
    // updated version will be served to the client.
    // In development server, we will always see the latest data no matter if
    // this option is given. But in production, this section matters.
    // This is called incremental static regeneration.
    revalidate: 2,

    // notFound: true,
    // redirect: {
    //   destination: '/no-data'
    // },
  };
};

export default HomePage;
