import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  FormControl,
  FormControlLabel,
  IconButton,
  Link,
  List,
  ListItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { useCatDetails } from '../../state/hooks/use-cat-details.tsx';
import { ROUTES } from '../../constants/routes.ts';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useAddFavourite } from '../../state/hooks/use-add-favourite.ts';
import { useFavourite } from '../../state/hooks/use-favourite.tsx';
import { useRemoveFavourite } from '../../state/hooks/use-remove-favourite.ts';
import { IsPendingModal } from './is-pending-modal.tsx';

type CatDetailsProps = DialogProps & {
  image_id: string;
  onClose: () => void;
};

export const CatDetailsModal: FC<CatDetailsProps> = (props) => {
  const { data: favouritesData } = useFavourite();
  const { addFavourite, isPending: isPendingAddFavourite } = useAddFavourite();
  const { removeFavourite, isPending: isPendingRemoveFavourite } =
    useRemoveFavourite();
  const { image_id, ...rest } = props;

  const { isPending, error, data } = useCatDetails(image_id);

  const isInFavourites =
    favouritesData?.some((favorite) => favorite.image_id === image_id) || false;

  const navigate = useNavigate();

  if (isPending) return <IsPendingModal />;

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return null;

  const [firstBreed] = data.breeds;

  const handleLinkClick = () => {
    rest.onClose();
    navigate(ROUTES.BREED);
  };

  const toggleFavourite = () => {
    if (isInFavourites) {
      const favourite = favouritesData!.find(
        (item) => item.image_id === image_id,
      );

      removeFavourite(favourite!.id);
    } else {
      addFavourite(image_id);
    }
  };

  return (
    <Dialog {...rest}>
      <DialogTitle sx={{ m: 0, p: 2, textAlign: 'center' }}>
        <Link
          variant="h5"
          onClick={handleLinkClick}
          sx={{ cursor: 'pointer', textDecoration: 'none' }}
        >
          {firstBreed.name}
        </Link>
      </DialogTitle>
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
        <Box
          component={'img'}
          src={data.url}
          alt={firstBreed.name}
          onClick={handleLinkClick}
          sx={{
            display: 'flex',
            m: 'auto',
            cursor: 'pointer',
            maxWidth: '100%',
            width: 300,
          }}
        />
        <List>
          <ListItem>Origin: {firstBreed.origin}</ListItem>
          <ListItem>Temperament: {firstBreed.temperament}</ListItem>
          <ListItem>Description: {firstBreed.description}</ListItem>
        </List>
        <Box
          noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}
        >
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
            <FormControlLabel
              control={
                <Checkbox
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  color="secondary"
                  checked={isInFavourites}
                />
              }
              label="Add to favourites"
              onChange={toggleFavourite}
              disabled={isPendingAddFavourite || isPendingRemoveFavourite}
            />
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
