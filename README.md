# CatLover

## Description
The app  CatLover is designed for cat enthusiasts and leverages the [The Cat API](https://thecatapi.com) to provide a 
rich user experience across two main views:

1. **Random Cat Images View**: Displays a list of 10 random cat images with a button to load more. Clicking on an image
opens a modal with the image and breed information (if available). The image in the modal links to the breed detail 
view. The URL of the modal can be shared to display the same image.
2. **Cat Breeds View**: Shows a list of cat breeds. Each breed opens a modal with a list of images of that breed. Each
image in the modal links back to the cat detail view.

The application emphasizes user experience by ensuring that "cat modals" can be shared via URLs. The app is built using
[React](https://react.dev/), and follows best practices.

## Technologies Used

- **[React](https://react.dev/)**: For building the user interface.
- **[TypeScript](https://www.typescriptlang.org/)**: For type safety and better developer experience.
- **[Jest](https://jestjs.io/)**: For unit testing.
- **[React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)**: For testing React components.
- **[React Router](https://reactrouter.com/en/main)**: For routing within the application.

## Instructions

### General

You need to have [pnpm](https://pnpm.io/) installed. To do so, run `npm install -g pnpm`.
Then install the project's dependencies with `pnpm install`.

### Development server

For development environment with webpack dev server, run `pnpm run start`.  
The default browser will open and navigate to `http://localhost:7777`.  
The app will reload if you change any of the source files.

### Build

The build artifacts will be stored in the `dist/` directory.  
Run `pnpm run build` for a production build.

### Running unit tests

Run `pnpm run test` to execute the unit tests.

## Improvements

### State management

A state management library like Redux could be used to store cat or breed info. This would allow for example to:
- Show the cat's name in the "CatDetails" modal
- Use the breed's name as the `alt` attribute of the image in the "CatDetails" modal
- Show the cat's name in the "BreedDetails" modal
- Use the breed's name as the `alt` attribute of the image in the "BreedDetails" modal

### Error handling

Error handling could be improved by:
- Adding `catch` clauses to the network requests.
- Adding a global error boundary to catch "uncaught" errors in the app.

This could improve the user experience by showing a friendly error message instead of nothing and / or a blank page.

### Internationalization

The app could be internationalized to support multiple languages. This could be done using a library like 
`react-i18next`.

### Loading state

Skeleton loaders could be used in each image while loading. They could even replace the initial "spinner" by having a
few image skeletons until the images are fetched and rendered.

### Responsive design

Although the app is catered for different desktop screen sizes, it could be made responsive for mobile devices as well.

## Notes

The aforementioned improvements were not implemented due to time constraints. The focus was on the core functionality of
the app.

Furthermore:
- The "Favourites view" feature is not implemented. If it were implemented, I would have used the browser's local 
storage to store the favourite images.
- The UI / UX are not perfect due to the lack of designs. I did not want to spend much time on this, but focus on the
  implementation. 
