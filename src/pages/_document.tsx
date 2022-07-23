// Modules
import Document, { Html, Head, Main, NextScript } from "next/document";

class RecycLensDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            name="theme-color"
            content="#486641"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#7ABB6C"
            media="(prefers-color-scheme: dark)"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RecycLensDocument;
