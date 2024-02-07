import * as React from 'react';
import {
  Button,
  Drawer,
  TextField,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getHomeStateValues } from '../../../../../../features/home/homeSlice';
import styled from '@emotion/styled';
import { grey } from '@mui/material/colors';
import SpeedIcon from '@mui/icons-material/Speed';
const RateSetPoint = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { rateSetPointDialog, rateSetPoint } = useSelector(
    (state) => state.home
  );
  const [newRateSetPoint, setNewRateSetPoint] = React.useState(rateSetPoint);
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    dispatch(getHomeStateValues({ name: 'rateSetPointDialog', value: false }));
  };

  const handleSubmit = () => {
    // Dispatch action to update the rate set point here
    handleClose(); // Close drawer after submitting
  };

  return (
    <Drawer
      anchor='right'
      open={rateSetPointDialog}
      onClose={handleClose}
      variant='temporary'
      sx={{
        '& .MuiDrawer-paper': { width: fullScreen ? '100%' : '500px' },
      }}>
      <Wrapper>
        <div className='heading'>
          <div className='title'>
            <SpeedIcon></SpeedIcon> Rate Set Point
          </div>
          <div className='content'>
            Adjust the discharge rate set point to fine-tune the dryer&apos;s
            speed, matching your operational throughput needs.
          </div>
        </div>
        <div className='body'>
          <div className='current_value'>
            <span>Current Set Point:</span>
            <span>{rateSetPoint}%</span>
          </div>
          <TextField
            fullWidth
            autoFocus
            margin='dense'
            id='rateSetPoint'
            label='Desired Rate Set Point'
            type='number'
            variant='outlined'
            value={newRateSetPoint}
            onChange={(e) => setNewRateSetPoint(e.target.value)}
          />
        </div>
        <div className='footer'>
          <Button
            onClick={handleClose}
            color='primary'
            variant='outlined'>
            Discard Changes
          </Button>
          <Button
            onClick={handleSubmit}
            color='primary'
            variant='contained'>
            Update Set Point
          </Button>
        </div>
      </Wrapper>
    </Drawer>
  );
};

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;

  .heading {
    padding-bottom: 20px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 20px;

    .title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        font-size: 2.5rem;
        // icon color
        color: ${({ theme }) =>
          theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main};
      }
    }

    .content {
      font-size: 16px;
      color: ${({ theme }) =>
        theme.palette.mode === 'dark' ? grey[300] : grey[600]};
    }
  }

  .body {
    .current_value {
      font-size: 16px;
      margin: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span:first-child {
        font-weight: bold;
      }
    }

    .MuiTextField-root {
      margin-top: 10px;
    }
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr 1fr;

    gap: 10px;
    margin-top: 20px;

    .MuiButton-root {
      font-size: 14px;
    }
  }
`;

export default RateSetPoint;
