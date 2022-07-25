// External libraries
import { AnimatePresence, motion } from "framer-motion";
import {
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import Image from "next/image";
import { useRouter } from "next/router";

import * as tf from "@tensorflow/tfjs-core";

// Material UI
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

// Components
import MaterialSymbol from "@components/MaterialSymbol";

const WebcamWControls = () => {
  const router = useRouter();

  // Device viewport witdth
  // (for ensuring the viewfinder perfectly fits the screen)
  const [clientWidth, setClientWidth] = useState<number>(360);
  useEffect(
    () => setClientWidth(window.innerWidth > 576 ? 576 : window.innerWidth),
    []
  );

  // List of the available cameras on the client device
  const [clientCameras, setClientCameras] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    async function getAndSetCameras() {
      if (navigator.mediaDevices.enumerateDevices)
        setClientCameras(
          (await navigator.mediaDevices.enumerateDevices()).filter(
            (device) => device.kind === "videoinput"
          )
        );
    }
    getAndSetCameras();
  }, []);
  const [currentCamIdx, cycleCam] = useReducer(
    (state: number) => (state == clientCameras.length - 1 ? 0 : state + 1),
    0
  );

  // Mirror the viewfinder
  // (some webcams don’t automatically mirror)
  const [mirrored, toggleMirrored] = useReducer(
    (state: boolean) => !state,
    false
  );

  // Captured image
  const webcamRef: MutableRefObject<Webcam | undefined> = useRef();
  const [capturedImage, setCapturedImage] = useState<string | null>();

  useEffect(() => {
    async function classify() {
      // @ts-ignore
      const tfliteModel = await tflite.loadTFLiteModel(
        "https://cxsvusqpigjppogkintz.supabase.co/storage/v1/object/public/models/recyclens_model_v2.tflite?t=2022-07-24T23%3A58%3A19.830Z"
      );

      if (!webcamRef.current) return;

      const img = tf.browser.fromPixels(
        webcamRef.current.video as HTMLVideoElement
      );
      const input = tf.cast(
        tf.sub(tf.div(tf.expandDims(img), 127.5), 1),
        "bool"
      );

      // Run inference and get output tensors
      let outputTensor = tfliteModel.predict(input).dataSync();

      let maxIndex = -1;
      let maxConfidence = 0;
      outputTensor.forEach((item: number, index: number) => {
        if (item > maxConfidence) {
          maxIndex = index;
          maxConfidence = item;
        }
      });

      const redirectMap: { [key: number]: number } = {
        0: 8,
        1: 9,
        2: 5,
        3: 16,
        4: 14,
        5: 11,
        6: 15,
        7: 12,
        8: 7,
        9: 6,
        10: 13,
        11: 4,
        12: 17,
        13: 10,
      };

      setTimeout(() => {
        setCapturedImage(null);
        router.push(
          `/local-guides/category/${redirectMap[maxIndex] || 0}`
        );
      }, 3000);
    }
    if (capturedImage) classify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [capturedImage]);

  useEffect(() => {
    if (capturedImage) {
      setTimeout(() => setCapturedImage(null), 3000);
    }
  }, [capturedImage]);

  return (
    <>
      <Paper
        className="relative overflow-hidden rounded-none md:rounded-3xl"
        style={{ height: clientWidth }}
      >
        {/* Client camera label */}
        <Box className="absolute w-full p-2 opacity-50">
          <Typography variant="body1" className="break-all">
            {clientCameras[currentCamIdx]?.label}
          </Typography>
        </Box>

        {/* Viewfinder */}
        <Webcam
          audio={false}
          ref={webcamRef as any}
          height={clientWidth}
          width={clientWidth}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            deviceId: clientCameras[currentCamIdx]?.deviceId,
            height: 300,
            width: 300,
          }}
          mirrored={mirrored}
          className="w-full"
        />

        {/* Contols */}
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          className="h-30 absolute bottom-0 w-full bg-gradient-to-t
            from-[#00000080] to-transparent py-2"
        >
          {/* Switch camera */}
          <IconButton
            onClick={cycleCam}
            disabled={clientCameras.length == 1}
            className="text-white"
          >
            <MaterialSymbol icon="cameraswitch" />
          </IconButton>

          {/* Take photo */}
          <Button
            variant="contained"
            onClick={() => {
              setCapturedImage(() => {
                if (webcamRef.current) return webcamRef.current.getScreenshot();
              });
            }}
          >
            <MaterialSymbol icon="camera" />
          </Button>

          {/* Mirror viewfinder horizontally */}
          <IconButton onClick={toggleMirrored} className="text-white">
            <MaterialSymbol icon="flip" />
          </IconButton>
        </Stack>

        {/* Photo preview */}
        <AnimatePresence>
          {capturedImage && (
            <motion.div
              className="absolute inset-0 z-30"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Image
                src={capturedImage}
                layout="fill"
                objectFit="contain"
                alt="Captured image of trash."
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </>
  );
};

export default WebcamWControls;
