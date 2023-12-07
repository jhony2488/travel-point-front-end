import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  backgroundMain:{
    width: '100%',
    height: '100vh',
    background:'url("./images/background-home.jpg")',
    'background-repeat': 'no-repeat',
    'background-size': 'cover'
  },
  backgroundMainWrapper:{
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgb(0, 0, 0,0.5)'
  },
  backgroundMainButton:{
    fontSize: '42px',
    color: 'white'
  },
  title: {
    flexGrow: 1,
    marginTop: '32px',
    fontSize: '32px',
    textAlign: 'center',
  },
}));

export default useStyles;