import { FC } from 'react';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';

export const IsPendingModal: FC = () => {
  return (
    <Dialog
      open={true}
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};
