import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import Tooltip from '@mui/material/Tooltip';
import Typography from '../../../modules/components/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import NoQueenBeeLogo from '../../../icons8.png';
const LANG = 'EN'
const DICT = {
  'UK': { 'Noise': 'Зашумлений запис', 'Swarming': 'Роїння', 'Queen Bee': 'Матка присутня', 'No Queen Bee': 'Матка відсутня' },
  'EN': { 'Noise': 'Noise', 'Swarming': 'Swarming', 'Queen Bee': 'Queen Bee', 'No Queen Bee': 'No Queen Bee' }
}

const ICONS = {
  'Swarming': "https://img.icons8.com/fluency/96/000000/bee-swarm.png",
  'Noise': "https://img.icons8.com/external-smashingstocks-flat-smashing-stocks/66/000000/external-Noise-pollution-smooth-conceptual-smashingstocks-flat-smashing-stocks.png",
  'Queen Bee': "https://img.icons8.com/color/96/000000/qween-bee.png",
  'No Queen Bee': NoQueenBeeLogo

}
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


export default function RecordingsList({ data, colors }) {
  return (
    <div className="recordings-container">
      {data.length > 0 ? (
        <div className="recordings-list">
          {data.map((record) => (
            <div className="record" key={record.key} style={{ 'background-color': colors[record.name] }}>
              <Grid container spacing={2} styles={{ backgroundColor: colors[record.name] }}>
                <Grid item>
                  <ButtonBase sx={{ width: 64, height: 64 }}>

                    <Tooltip title={DICT[LANG][record.predict]} placement="right">
                      <Img src={ICONS[record.predict]} />
                    </Tooltip>
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {record.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {record.date}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

            </div>
          ))}
        </div>) : (
        <div className="no-records">
          <FontAwesomeIcon icon={faExclamationCircle} size="3x" color="#f2ea02" />
          <Typography variant="h5">
            {'There are no records'}
          </Typography>
        </div>
      )}
    </div>
  )
}
