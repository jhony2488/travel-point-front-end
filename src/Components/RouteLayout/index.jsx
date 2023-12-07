import React from 'react';
import { Route} from 'react-router-dom';

export default function RouteLayout(props) {

  const {
    layout: Layout, component: Component, path, ...rest
  } = props;

  return (
    <>
    <Route
      path={path}
      render={(matchProps) => (
        /* @ts-expect-error Server Component */
        <Layout>
        {/* @ts-expect-error Server Component */}
          <Component {...matchProps} />
        </Layout>
      )}
      {...rest}
    />
    </>
  );
};

const _RouteLayout = RouteLayout;
export { _RouteLayout as RouteLayout };
