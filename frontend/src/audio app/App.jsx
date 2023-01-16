import RecorderControls from "./components/recorder-controls";
import RecordingsList from "./components/recordings-list";
import useRecorder from "./hooks/useRecorder";
import useLocalStorage from "./hooks/useLocalStorage";
import "./app.css";
import Typography from '../modules/components/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';

import 'rc-color-picker/assets/index.css';
import ColorPicker from 'rc-color-picker';
import InputAdornment from '@mui/material/InputAdornment';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import React, { useState, useRef, useEffect } from 'react';
import NoQueenBeeLogo from '../icons8.png';

const DICT = { 'UK': { 'Noise': 'Зашумлений запис', 'Noise_desc': 'Зашумлений запис', 'Swarming': 'Роїння', 'Swarming_desc': 'Роїння', 'Queen Bee': 'Матка присутня', 'Queen Bee_desc': 'Матка присутня', 'No Queen Bee': 'Матка відсутня', 'No Queen Bee_desc': 'Матка відсутня' },
'EN': { 'Noise': 'Noise', 'Noise_desc': 'Noise', 'Swarming': 'Swarming', 'Swarming_desc': 'Swarming', 'Queen Bee': 'Queen Bee', 'Queen Bee_desc': 'Queen Bee', 'No Queen Bee': 'No Queen Bee', 'No Queen Bee_desc': 'No Queen Bee' } }
const LANG = 'EN'
const ICONS = {
  'Swarming': "https://img.icons8.com/fluency/96/000000/bee-swarm.png",
  'Noise': "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/000000/external-Noise-pollution-smooth-conceptual-smashingstocks-flat-smashing-stocks.png",
  'Queen Bee': "https://img.icons8.com/color/96/000000/qween-bee.png",
  'No Queen Bee': NoQueenBeeLogo

}
const INFO = ['Noise', 'Swarming', 'Queen Bee', 'No Queen Bee']

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 400,
  color: theme.palette.text.primary,
}));
export default function App() {
  function broofa() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const COLOR = '#36c'

  const myRefname = useRef(null);
  const handleClick = () => {
    myRefname.current.click();
  }

  const [data, setData] = useLocalStorage("data", []);
  const [colors, setColors] = useLocalStorage("colors", {});
  const [color, setColor] = useState(COLOR);

  const { recorderState, ...handlers } = useRecorder();
  const { initRecording, blob } = recorderState;

  let last_name = data[0]
  if (last_name === undefined) {
    last_name = "My best beehive"
  } else {
    last_name = last_name.name
  }

  const [name, setName] = useState(last_name);
  const handleChange = (event) => {
    setName(event.target.value);
  };


  const PopupExample = () => (
    <Popup nested trigger={<FontAwesomeIcon icon={faQuestionCircle} size="1x" />} position="right">
      {close => (
        INFO.map((record) => (
          <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
            <StyledPaper
              sx={{
                my: 1,
                mx: 'auto',
                p: 2,
              }}
            >
              <Grid container wrap="nowrap" spacing={1}>
                <Grid item>

                  <Tooltip title={DICT[LANG][record]} placement="right">
                    <img src={ICONS[record]} style={{ width: 64, height: 64 }} />
                  </Tooltip>

                </Grid>
                <Grid item xs style={{ display: "flex", alignItems: "center" }}>
                  <Typography>{DICT[LANG][record + '_desc']}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
          </Box>
        ))
      )}
    </Popup>
  );

  useEffect(() => {
    if (blob) {
      let formData = new FormData();
      formData.append("audio", blob, 'blob.ogg');
      setIsLoading(true)
      fetch('/predict', { method: "POST", body: formData }).then((res) => res.json())
        .then((res) => {
          console.log(res, name, { name: color, ...colors });
          setIsLoading(false);

          setColors({ ...colors, [name]: color })
          setData([{ 'key': broofa(), date: new Date().toLocaleString(), name: name, ...res }, ...data])

        }).catch(() => setIsLoading(false));
    }
  }, [blob])


  useEffect(() => {
    if (name in colors) {
      setColor(colors[name])
    }

  }, [name])


  const [isLoading, setIsLoading] = useState(false);

  const changeHandler = (event) => {
    let formData = new FormData();
    formData.append("audio", event.target.files[0]);
    setIsLoading(true)
    fetch('/predict', { method: "POST", body: formData }).then((res) => res.json())
      .then((res) => {
        setIsLoading(false)
        setColors({ ...colors, [name]: color })
        setData([{ 'key': broofa(), date: new Date().toLocaleString(), name: name, ...res }, ...data])

      }).catch(() => setIsLoading(false));
  };
  const colorChangeHandler = (clrs) => {

    if (name in colors) {

      setColors({ ...colors, [name]: clrs.color })

    }
    setColor(clrs.color)
  }
  return (
    <Box
      component="section"
      style={{ background: 'linear-gradient(to right, #ffffb3, #ffff1a)' }}
      sx={{ display: 'flex', overflow: 'hidden' }}
    >
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2" >
          Find out the state of your hive
        </Typography>
        <Box noValidate sx={{ mt: 6 }}>

          <TextField fullWidth
            id="outlined-password-input"
            label="Назва вулика"
            value={name}
            onChange={handleChange}
            disabled={isLoading}

            InputProps={{
              endAdornment: <InputAdornment position="end">  <ColorPicker
                animation="slide-up"
                color={color}
                onChange={colorChangeHandler}
              /></InputAdornment>,
            }}
          />
        </Box>

        <div className="recorder-container">
          <PopupExample />
          <div id="popup-root" />
          <RecorderControls loadingState={{ isLoading, setIsLoading }} recorderState={recorderState} handlers={handlers} />
          <Typography align="center" style={{ 'marginTop': '2rem' }}>
            {'or '}
            <Link underline="always" onClick={initRecording ? () => { } : handleClick}>
              upload
            </Link>
            {' audio file'}
          </Typography>
          <input type="file" name="file" hidden ref={myRefname} accept=".wav" onChange={changeHandler} disabled={isLoading} />
          <span> </span>
          <RecordingsList data={data} colors={colors} />
        </div>
      </Container>
    </Box>
  );
}
