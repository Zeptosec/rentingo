import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Rentingo</title>
        <meta name="description" content="Renting system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2 className='text-indigo-500'>Rentingo text</h2>
    </>
  )
}
