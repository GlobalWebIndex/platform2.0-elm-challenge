import { FC } from 'react';
import { ImageList, ImageListItem, Link } from '@mui/material';
import { useCats } from '../../state/hooks/use-cats.tsx';
import { useModal } from 'mui-modal-provider';
import { CatDetailsModal } from '../modals/cat-details-modal.tsx';

export const CatList: FC = () => {
  const { showModal } = useModal();

  const { isPending, error, data } = useCats();

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!data?.length) return null;

  const openCatModal = (id: string) => {
    const modal = showModal(CatDetailsModal, {
      id,
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <ImageList variant="masonry" cols={3} gap={8}>
      {data?.map((item) => (
        <Link
          key={item.id}
          component="button"
          onClick={() => openCatModal(item.id)}
        >
          <ImageListItem>
            <img
              srcSet={item.url}
              src={item.url}
              alt={item.id}
              loading="lazy"
            />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
};
