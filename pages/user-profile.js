const UserProfilePage = props => {
  return (
    <h1>{props.username}</h1>
  );
};

export default UserProfilePage;

// NextJS-getServerSideProps-Server-Side-Rendering
// The only different from getStaticProps is this function
// will not have the revalidate key, because the idea of having
// getServerSideProps is to create pages in every http request.
// This page is not statically generated. It will really be generated on the fly.
// The reason to use getServerSideProps is, if we have a quickly changing page,
// we always need to change the data on every page request. In this case, using
// getServerSideProps is more pertinent than getStaticProps
export const getServerSideProps = async (context) => {

  // In getServerSideProps, unlike getStaticProps
  // we are not only able to reach to a parameter called params,
  // but also request and response data.
  // These are default Node.js request and response object.
  const { params, req, res } = context;

  return {
    props: {
      username: 'Aras'
    },

    // notFound: true,
    // redirect: {
    //   destination: '/no-data',
    // }
  };
};