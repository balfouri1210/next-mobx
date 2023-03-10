import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useEffect } from 'react';
import Clock from './Clock';
import { useRouter } from 'next/router';
import { useStore } from './StoreProvider';

const Page = observer(function Page(props) {
  // use store from the store context
  const router = useRouter();
  const store = useStore();
  console.log('use useStore in the component');

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
      <h1>{props.title}</h1>
      {/* <Clock /> */}

      <div style={{ margin: '12px 0' }}>
        How to test : <br />
        1. open development tool console <br />
        2. Click 'Move to test page' button below. <br />
        3. In the test page, click 'Change route path' button. <br />
        4. in the console, you can see [ cannot update 'test' component while
        rendering StoreProvider ]
      </div>

      <nav>
        <Link
          style={{
            display: 'inline-flex',
            border: '1px solid black',
            borderRadius: '6px',
            padding: 16,
          }}
          href={props.linkTo}>
          Move to TEST page
        </Link>
      </nav>
    </div>
  );
});

export default Page;
