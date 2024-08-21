import { FC } from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { useCats } from '../../state/hooks/use-cats.tsx';

export const CatList: FC = () => {
  const { isPending, error, data } = useCats();

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {data?.map((item) => (
        <ImageListItem key={item.id}>
          <img srcSet={item.url} src={item.url} alt={item.id} loading="lazy" />
        </ImageListItem>
      ))}
    </ImageList>
  );
};
