import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  useEffect(() => {
    const callApi = async () => {
      const res = await axios.get('/api/');
      console.log({res})
    }
    callApi();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Shareum</title>
        <meta name="description" content="Next gen social network" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to SHAREUM!
        </h1>
      </main>
    </div>
  )
}
