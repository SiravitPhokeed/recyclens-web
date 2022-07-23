// External libraries
import { useEffect, useReducer, useState } from "react";
import Webcam from "react-webcam";

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
  // Device viewport witdth
  // (for ensuring the viewfinder perfectly fits the screen)
  const [clientWidth, setClientWidth] = useState<number>(360);
  useEffect(() => setClientWidth(window.innerWidth), []);

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

  return (
    <>
      <Paper
        className="relative overflow-hidden rounded-none"
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
          className="h-30 absolute bottom-0 w-full bg-gradient-to-t from-[#00000080] to-transparent py-2"
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
          <Button variant="contained">
            <MaterialSymbol icon="camera" />
          </Button>

          {/* Mirror viewfinder horizontally */}
          <IconButton onClick={toggleMirrored} className="text-white">
            <MaterialSymbol icon="flip" />
          </IconButton>
        </Stack>
      </Paper>
    </>
  );
};

export default WebcamWControls;
