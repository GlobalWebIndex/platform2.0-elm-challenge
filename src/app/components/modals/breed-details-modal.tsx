import {
  Dialog,
  DialogContent,
  DialogProps,
  IconButton,
  ImageList,
  ImageListItem,
  Link,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC } from 'react';
import { useBreedDetails } from '../../state/hooks/use-breed-details.ts';
import { CatDetailsModal } from './cat-details-modal.tsx';
import { useModal } from 'mui-modal-provider';
import { IsPendingModal } from './is-pending-modal.tsx';

type BreedDetailsProps = DialogProps & {
  id: string;
  onClose: () => void;
};

export const BreedDetailsModal: FC<BreedDetailsProps> = (props) => {
  const { showModal } = useModal();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const { id, ...rest } = props;

  const { isPending, error, data } = useBreedDetails(id);

  if (isPending) return <IsPendingModal />;

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return null;

  const openCatModal = (id: string) => {
    const modal = showModal(CatDetailsModal, {
      image_id: id,
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
        <ImageList
          variant="masonry"
          cols={isSmallScreen ? 3 : 2}
          gap={8}
          sx={{ p: 2 }}
        >
          {data?.map((item) => (
            <Link
              key={item.id}
              component="button"
              onClick={() => {
                rest.onClose();
                openCatModal(item.id);
              }}
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
      </DialogContent>
    </Dialog>
  );
};
