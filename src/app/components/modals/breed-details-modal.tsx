import {
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';
import { useBreedDetails } from '../../state/hooks/use-breed-details.ts';
import { CatDetailsModal } from './cat-details-modal.tsx';
import { useModal } from 'mui-modal-provider';

type BreedDetailsProps = DialogProps & {
  id: string;
  onClose: () => void;
};

export const BreedDetailsModal: FC<BreedDetailsProps> = (props) => {
  const { showModal } = useModal();
  const { id, ...rest } = props;

  const { isPending, error, data } = useBreedDetails(id);

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return null;

  const openCatModal = (id: string) => {
    const modal = showModal(CatDetailsModal, {
      id,
      onClose: () => {
        modal.hide();
      },
    });
  };

  return (
    <Dialog {...rest}>
      <IconButton
        aria-label="close"
        onClick={rest.onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <ImageList variant="masonry" cols={3} gap={8}>
          {data?.map((item) => (
            <Link
              key={item.id}
              component="button"
              onClick={() => {
                openCatModal(item.id);
                // rest.onClose(); // TODO figure out the sequence here
              }}
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
      </DialogContent>
    </Dialog>
  );
};
