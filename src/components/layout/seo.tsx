import Head from 'next/head';

const title = 'JPlanner';
const description = 'No more spend too much time planning';

export function SEO() {
  return (
    <Head>
      <link rel='icon' href='/favicon.ico' />
      <link rel='apple-touch-icon' href='/icon.png' />
      <link rel='shortcut icon' href='/icon.png' />

      <meta name='og:title' content={title} />
      <meta name='og:site_name' content={title} />
      <meta name='og:description' content={description} />
      <meta name='og:type' content='website' />
      <meta name='og:url' content='https://jplanner.vercel.app' />
      <meta property='og:image' content='/og.png' />

      <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
      <meta name='keywords' content='todolist, todo, agile, agile todo' />
      <meta name='description' content={description} />

      <title>{title}</title>
    </Head>
  );
}
