import { FC } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { useBreeds } from '../../state/hooks/use-breeds.tsx';

export const BreedList: FC = () => {
  const { isPending, error, data } = useBreeds();

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <Box>
      <List>
        {data?.map((item) => (
          <Paper key={item.id} elevation={2} sx={{ marginBottom: '1rem' }}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
};
