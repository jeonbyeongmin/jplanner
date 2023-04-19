import { GetServerSideProps } from 'next';

export default function Home() {
  return {};
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {} = context;

  const user = true; // get user from db

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
      props: {},
    };
  }

  return {
    redirect: {
      destination: '/board',
      permanent: false,
    },
    props: {},
  };
};
