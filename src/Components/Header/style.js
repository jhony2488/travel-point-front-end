import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {},
  rootWrapper:{
    display: 'flex',
    gap: '25px',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:'10%',
    paddingRight:'10%',
  },
  containerButtonAuth:{
    display: 'flex',
    gap: '8px',
  },
  menuClose: {
    position: 'fixed',
    'z-index': '9999',
    width: '48px',
    right: 14,
    top: '1%',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
    color: 'orange',
  },
  titleLink: {
    flexGrow: 1,
    color: 'orange',
    'text-decoration': 'none'
  },
  nav: {
    display: 'flex',
    gap: '25px',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    'list-style': 'none',
    transition: 'transform 1s ease-out',
    marginLeft: '-2%',
    '@media (max-width: 760px)': {
      alignItems: 'right',
      flexDirection: 'column',
      position: 'fixed',
      'z-index': '999',
      paddingTop: '20%',
      width: '100%',
      height: '100vh',
      background: 'black',
      top: '-2%',
      left: '-8%',
      justifyContent: 'flex-start',
    },
  },

  itemNav: {
    'text-align': 'center',
    transition: 'transform 1s ease-out',
    color: 'white',
    '&:hover': {
      transform: 'scale(1.2)',
    },
  },
  linkNav: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',

    '@media (max-width: 760px)': {
      fontSize: '36px',
    },
  },
}))

export default useStyles
