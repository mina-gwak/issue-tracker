import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, createStyles, withStyles, Theme } from '@material-ui/core/styles';

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#1a90ff',
    },
  }),
)(LinearProgress);

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    paddingTop: 14,
    paddingBottom: 8,
  },
});

interface ProgressBarPropsType {
  progress: number;
}
export default function ProgressBar({ progress }: ProgressBarPropsType) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <BorderLinearProgress variant='determinate' value={progress} />
    </div>
  );
}
