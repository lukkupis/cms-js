// import App, { Container } from 'next/app';
// import React from 'react';
// import withReduxStore from '../lib/with-redux-store';
// import { Provider } from 'react-redux';

// class MyApp extends App {
//   render() {
//     const { Component, pageProps, reduxStore } = this.props;
//     return (
//       <Container>
//         <Provider store={reduxStore}>
//           <Component {...pageProps} />
//         </Provider>
//       </Container>
//     );
//   }
// }

// export default withReduxStore(MyApp);

import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import { initStore } from '../store/store';
import { ThemeProvider } from 'styled-components';

const theme = {};

export default withRedux(initStore)(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx, req }) {
      return {
        pageProps: Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}
      };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Container>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <Component {...pageProps} />
            </Provider>
          </ThemeProvider>
        </Container>
      );
    }
  }
);
