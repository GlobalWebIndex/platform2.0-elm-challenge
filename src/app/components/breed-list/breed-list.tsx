import { FC } from 'react';
import {
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { useBreeds } from '../../state/hooks/use-breeds.tsx';
import { useModal } from 'mui-modal-provider';
import { BreedDetailsModal } from '../modals/breed-details-modal.tsx';

export const BreedList: FC = () => {
  const { showModal } = useModal();

  const { isPending, error, data } = useBreeds();

  if (isPending)
    return <CircularProgress sx={{ display: 'flex', margin: '2rem auto' }} />;

  if (error) return 'An error has occurred: ' + error.message;

  if (!data?.length) return null;

  const openBreedModal = (id: string) => {
    const modal = showModal(BreedDetailsModal, {
      id,
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <Box>
      <List>
        {data?.map((item) => (
          <Paper key={item.id} elevation={2} sx={{ marginBottom: '1rem' }}>
            <ListItem disablePadding>
              <ListItemButton onClick={() => openBreedModal(item.id)}>
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};
