import {
    createStyles,
    makeStyles,
} from '@material-ui/core';

export const inputStyles = makeStyles(() => {
    return createStyles({
        search: {
            margin: '0'
        },
        input: {
            color: 'black !important',
            // background: theme.palette.primary.main,
        }
    });
});