import React, { useEffect, useMemo, useState, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Slider,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Lottie from "lottie-react";
import AnimationData1 from "../../../../assets/speaker.json";
import Loader from "../../../../assets/imageloader.json";
import b64toBlob from "b64-to-blob";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateSpeech({ Input }) {
  const [audio64, setAudio64] = useState("");
  const [audioSrc, setAudioSrc] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  const handleSpeech = useMemo(
    () => async () => {
      if (Input) {
        try {
          setLoading(true);
          const response = await fetch(
            "http://localhost:8000/conversion/texttospeech",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(Input),
            }
          );

          const audioData = await response.json();
          setLoading(false);

          if (!response.ok || audioData.success === false) {
            toast.error(audioData.message || "Failed to generate audio.");
            return;
          }

          setAudio64(audioData.audio);
        } catch (error) {
          setLoading(false);
          toast.error(error.message || "An error occurred while generating audio.");
        }
      }
    },
    [Input]
  );

  useEffect(() => {
    handleSpeech();
  }, [handleSpeech, Input]);

  useEffect(() => {
    if (audio64) {
      const contentType = "audio/mp3";
      const blob = b64toBlob(audio64, contentType);
      const url = URL.createObjectURL(blob);
      setAudioSrc(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audio64]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (event, value) => {
    if (audioRef.current) {
      const newTime = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "100%",
        px: { xs: 2, sm: 4 },
        py: { xs: 4, sm: 6 },
        backgroundColor: "transparent",
      }}
    >
      {loading ? (
        <Lottie animationData={Loader}/>
      ) : audioSrc ? (
        <Card
          sx={{
            width: "100%",
            maxWidth: "600px",
            p: 2,
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", mb: 2 }}>
              Generated Audio:
            </Typography>
            <Slider
              value={progress}
              onChange={handleSeek}
              aria-labelledby="audio-progress"
              sx={{ color: "#1976d2", mb: 1 }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption">{formatTime(progress * (duration / 100))}</Typography>
              <Typography variant="caption">{formatTime(duration)}</Typography>
            </Box>
          </CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton
              onClick={handlePlayPause}
              sx={{
                backgroundColor: "#28a745",
                color: "white",
                "&:hover": { backgroundColor: "#218838" },
              }}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>
          </Box>
          <audio
            ref={audioRef}
            src={audioSrc}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            style={{ display: "none" }}
          />
        </Card>
      ) : (
        <Lottie animationData={AnimationData1} />
      )}
    </Box>
  );
}
