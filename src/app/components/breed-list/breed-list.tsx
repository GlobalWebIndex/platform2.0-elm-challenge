import { FC } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
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
          <ListItem key={item.id}>
            <ListItemButton>
              <ListItemText>{item.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
