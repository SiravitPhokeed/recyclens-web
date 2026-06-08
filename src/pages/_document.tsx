import {
  documentGetInitialProps,
  DocumentHeadTags,
  type DocumentHeadTagsProps,
} from "@mui/material-nextjs/v14-pagesRouter";
import {
  Head,
  Html,
  Main,
  NextScript,
  type DocumentContext,
  type DocumentProps,
} from "next/document";

function RecycLensDocument(props: DocumentProps & DocumentHeadTagsProps) {
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
        <DocumentHeadTags {...props} />
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

RecycLensDocument.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};

export default RecycLensDocument;
