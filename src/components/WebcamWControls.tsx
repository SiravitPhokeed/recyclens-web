// External libraries
import {
  MutableRefObject,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Webcam from "react-webcam";
import Image from "next/image";

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
import { AnimatePresence, motion } from "framer-motion";

const WebcamWControls = () => {
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
          screenshotFormat="image/jpeg"
          width={clientWidth}
          videoConstraints={{
            deviceId: clientCameras[currentCamIdx]?.deviceId,
            height: clientWidth,
            width: clientWidth,
          }}
          mirrored={mirrored}
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
            onClick={() =>
              setCapturedImage(() => {
                if (webcamRef.current) return webcamRef.current.getScreenshot();
              })
            }
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
              <Image src={capturedImage} alt="" layout="fill" />
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </>
  );
};

export default WebcamWControls;
