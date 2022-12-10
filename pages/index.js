import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useCallback, useState } from "react";

const fetchApi = (endpoint) => {
  return fetch(`/api/v1/${endpoint}`).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export default function Home() {
  const [isLoadingPost, setLoadingPost] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [apiError, setApiError] = useState(null);

  const getApiCallback = useCallback(
    (endpoint) => async (e) => {
      setLoadingPost(true);
      setApiError(null);
      try {
        const response = await fetchApi(endpoint);
        setApiResponse(response);
      } catch (e) {
        setApiError(e);
        console.error(e);
      }
      setLoadingPost(false);
    },
    []
  );

  const onGetStatus = useCallback(getApiCallback(""), []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Barbaria Vercel Deployment</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Barbaria Vercel Deployment</h1>

        <div className={styles.grid}>
          <button onClick={onGetStatus} className={styles.apiButton}>
            Check API status
          </button>
          <div className={`${styles.loader} ${isLoadingPost ? "" : styles.hidden}`}></div>
        </div>
        <pre className={`responseContainer ${styles.code} ${apiResponse ? "" : styles.hidden}`}>
          {apiResponse && JSON.stringify(apiResponse, null, 2)}
        </pre>
      </main>

      <footer className={styles.footer}>
        Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
      </footer>
    </div>
  );
}
