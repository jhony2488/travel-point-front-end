import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {},
  containerFooter:{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: theme.palette.primary.main,
  },

  contentFooter:{
    color:"white",
    fontSize: '16px',
  },
}))

export default useStyles
