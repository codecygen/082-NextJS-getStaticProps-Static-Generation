const UserIdPage = (props) => {
  return (
    <h1>{props.id}</h1>
  );
};

export default UserIdPage;

// NextJS-getServerSideProps-Server-Side-Rendering
// Here since the page is created on the fly, we don't need
// getStaticPaths
export const getServerSideProps = async (context) => {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: `userid-${userId}`,
      // hasError: true
    },

    // notFound: true,
    // redirect: {
    //   destination: '/no-data',
    // }
  };
};