import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '78vh',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  modal:{
    width: '100vw'
  },
  itemSelect:{
    color: 'black',
  },
  title: {
    marginTop: '32px',
    marginBottom: '-10px',
    fontSize: '48px',
    textAlign: 'center',
    '@media (max-width: 760px)': {
      marginBottom: '-19px',
    },
  },
  box:{
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100%',
    height: '100vh',
  },
  boxWrapper:{
    background: 'white',
    display: 'grid',
    padding: '16px',
    gap:'12px'
  },
  titleModal:{
    alignItem: 'center',
  },
  containerButtonAdd:{
    display: 'grid',
    justifyItems: 'center',
    marginTop: '20px',
    marginBottom: '8px',
  },
  containerButtons:{
    display: 'flex',
    width: '100%',
    'justify-items': 'center',
    gap:'8px',

  },
  buttonSubmit:{
    width: '70%',
    '@media (max-width: 760px)': {
      width: '80vw',
    },
  }
}));

export default useStyles;