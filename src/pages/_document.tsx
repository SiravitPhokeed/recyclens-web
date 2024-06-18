import Document, { Head, Html, Main, NextScript } from "next/document";

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
          {/* eslint-disable @next/next/no-sync-scripts */}
          <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core@4.10.0" />
          <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-cpu@4.10.0" />
          <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite@0.0.1-alpha.9/dist/tf-tflite.min.js" />
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
