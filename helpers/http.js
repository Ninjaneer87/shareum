import fetch from 'isomorphic-unfetch';
import Router from 'next/router';

export const myGetServerSideProps = async (url, ctx) => {
  const cookie = ctx.req?.headers.cookie;

  const response = await fetch(url, {
    headers: {
      cookie
    }
  });

  if (response.status === 401 && !ctx.req) {
    Router.replace('/login');
    return;
  }

  if (response.status === 401 && ctx.req) {
    return {
      redirect: {
        permanent: false,
        destination: "/login"
      }
    };
  }

  const json = await response.json();
  return json;
}