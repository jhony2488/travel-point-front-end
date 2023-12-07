import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => {
  return createStyles({
    container: {
      width: '100%',
      display: 'grid',
    },
    wrapper: {
      width: '100%',
      display: 'grid',
      'justify-content': 'center',
    },
    contentTitle:{
        'font-size': '24px',
        'line-height': '32px',
        'text-align': 'center',
        'letter-spacing': '-0.15px',
        'margin-bottom': '12px',
    }
  });
});

export default useStyles;
