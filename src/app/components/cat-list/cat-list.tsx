import { FC } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  ImageList,
  ImageListItem,
  Link,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useCats } from '../../state/hooks/use-cats.tsx';
import { useModal } from 'mui-modal-provider';
import { CatDetailsModal } from '../modals/cat-details-modal.tsx';
import { useCatPaginationContext } from '../../state/cat-pagination-context/cat-pagination-context.tsx';

export const CatList: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { showModal } = useModal();
  const { loadMore } = useCatPaginationContext();

  const { isPending, error, data } = useCats();

  if (isPending)
    return <CircularProgress sx={{ display: 'flex', margin: '2rem auto' }} />;

  if (error) return 'An error has occurred: ' + error.message;

  if (!data?.length) return null;

  const openCatModal = (id: string) => {
    const modal = showModal(CatDetailsModal, {
      image_id: id,
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <>
      <ImageList
        variant="masonry"
        cols={isSmallScreen ? 2 : 3}
        gap={10}
        sx={{ p: 1.5 }}
      >
        {data?.map((item) => (
          <Link
            key={item.id}
            component="button"
            onClick={() => openCatModal(item.id)}
          >
            <Paper elevation={3}>
              <ImageListItem>
                <img
                  srcSet={item.url}
                  src={item.url}
                  alt={item.id}
                  loading="lazy"
                />
              </ImageListItem>
            </Paper>
          </Link>
        ))}
      </ImageList>
      <Box sx={{ display: 'flex', justifyContent: 'center', m: 3 }}>
        <Button variant="contained" onClick={() => loadMore()}>
          Load more
        </Button>
      </Box>
    </>
  );
};
