// material-ui
import { styled } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';
import App from 'components';

// loader style
const LoaderWrapper = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 2001,
    width: '100%',

    '& > * + *': {
        marginTop: theme.spacing(2)
    }
}));

// ==============================|| Loader ||============================== //

const Loader = () => (
    <LoaderWrapper>
        <LinearProgress sx={{
            bgcolor: App.color.white,
            "& .MuiLinearProgress-bar ":
            {
                bgcolor: App.color.main
            }
        }} />
    </LoaderWrapper>
);

export default Loader;
