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
          {/* eslint-disable @next/next/no-sync-scripts */}
          <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core" />
          <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-cpu" />
          <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-tflite/dist/tf-tflite.min.js" />
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
