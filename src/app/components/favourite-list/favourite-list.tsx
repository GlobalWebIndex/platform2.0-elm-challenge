import { FC } from 'react';
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFavourite } from '../../state/hooks/use-favourite.tsx';
import { useRemoveFavourite } from '../../state/hooks/use-remove-favourite.ts';

export const FavouriteList: FC = () => {
  const { data } = useFavourite();
  const { removeFavourite } = useRemoveFavourite();

  if (!data?.length) return null;

  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {data?.map((item) => (
        <Paper key={item.id} elevation={3}>
          <ImageListItem>
            <img
              srcSet={item.image.url}
              src={item.image.url}
              alt={item.image.id}
              loading="lazy"
            />
            <ImageListItemBar
              actionIcon={
                <IconButton
                  onClick={() => removeFavourite(item.id)}
                  sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        </Paper>
      ))}
    </ImageList>
  );
};
