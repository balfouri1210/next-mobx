import Page from '../../components/Page';
import { useRouter } from 'next/router';
import { useStore } from '../../components/StoreProvider';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export default observer(function Test() {
  const router = useRouter();
  const store = useStore();
  const routerPathParam = parseInt(router.query.name);

  //start the clock when the component is mounted
  useEffect(() => {
    console.log('useEffect called');

    store.start();

    // stop the clock when the component unmounts
    return () => {
      store.stop();
    };
  }, [store, router.asPath]);

  return (
    <div>
      <h1>TEST page : {store.timeString}</h1>
      <div>
        click 'Change route path' button and check the warning in the console.{' '}
        <br />
      </div>
      <button
        style={{
          display: 'inline-flex',
          border: '1px solid black',
          borderRadius: '6px',
          background: 'transparent',
          padding: 16,
          cursor: 'pointer',
        }}
        onClick={() => router.push(`/test/${routerPathParam + 1}`)}>
        Change url path
      </button>
    </div>
  );
});

// The date returned here will be different for every request that hits the page,
// that is because the page becomes a serverless function instead of being statically
// exported when you use `getServerSideProps` or `getInitialProps`
export function getServerSideProps() {
  return { props: { initialState: { lastUpdate: Date.now() } } };
}
