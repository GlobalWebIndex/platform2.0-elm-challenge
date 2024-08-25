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

type CatDetailsProps = DialogProps & {
  id: string;
  onClose: () => void;
};

export const CatDetailsModal: FC<CatDetailsProps> = (props) => {
  const { id, ...rest } = props;

  const { isPending, error, data } = useCatDetails(id);

  const navigate = useNavigate();

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return null;

  const [firstBreed] = data.breeds;

  const handleLinkClick = () => {
    rest.onClose();
    navigate(ROUTES.BREED);
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
          width={300}
          sx={{
            display: 'flex',
            m: 'auto',
            cursor: 'pointer',
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
                />
              }
              label="Add to favourites"
            />
          </FormControl>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
