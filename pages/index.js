const HomePage = (props) => {
  return (
    <ul>
      <li>Product 1</li>
      <li>Product 2</li>
      <li>Product 3</li>
    </ul>
  );
};

export const getStaticProps = async () => {
  return { props: {

  }};
};

export default HomePage;
