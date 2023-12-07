import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  main: {
    minHeight: '80vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    marginTop: '13%',
    fontSize: '48px',
    textAlign: 'center',
    '@media (max-width: 760px)': {
      marginBottom: '-48px',
    },
  },
  itemSelect:{
    color: 'black',
  },
  box:{
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100%',
    'min-height': '20vh',
    paddingBottom: '30px',
    paddingTop: '16px'
  },
  boxWrapper:{

    width: '30vw',
    display: 'flex',
    flexDirection: 'column',
  
    padding: '8px',
    gap:'4px',
    '@media (max-width: 1080px)': {
      width: '80vw',
    },
  },
  titleModal:{
    alignItem: 'center',
  },
  containerButtons:{
    display: 'grid',
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