# Higher order architecture of the app

## Components

1. **App component**
    - **Description**: The root component of the application.
    - **Responsibilities**: Sets up the main routes and renders the appropriate components based on the current route.
    - **Key Dependencies**: `MemoryRouter`, `Routes`, `Route`, `Outlet`.

2. **CatList component**
    - **Description**: Displays a list of random cat images.
    - **Responsibilities**: Fetches and displays 10 random cat images initially, with a button to load more images.
    - **Key Dependencies**: `useFetchCats` hook for fetching cat images.

3. **CatDetailsPreview component**
    - **Description**: Shows details of a selected cat image.
    - **Responsibilities**: Displays the cat image and breed information if available.
    - **Key Dependencies**: `useParams` from `react-router-dom` to get the cat ID from the URL, `useFetch` hook to
   fetch cat details.

4. **BreedList component**
    - **Description**: Displays a list of cat breeds.
    - **Responsibilities**: Fetches and displays a list of cat breeds. Each breed links to a modal with images of that
   breed.
    - **Key Dependencies**: `useFetch` hook for fetching breed data.

5. **Modal component**
    - **Description**: A modal dialog that can display various content.
    - **Responsibilities**: Displays content in a modal overlay. Used for showing cat details and breed images.
    - **Key Dependencies**: `useLocation` from `react-router-dom` to handle background routes.

6. **Layout component**
    - **Description**: Provides a common layout for the application.
    - **Responsibilities**: Wraps the main content and includes the navigation of the SPA.
    - **Key Dependencies**: `Outlet` from `react-router-dom` to render child routes.

## Component Flow

1. **App component**:
    - Initializes the router and sets up routes.
    - Routes:
        - `/cats`: Renders `CatList`.
        - `/cats/:id`: Renders `CatDetailsPreview` and `Modal`.
        - `/breeds`: Renders `BreedList`.
        - `/breeds/:id`: Renders `Modal`.
        - Unknown routes redirect to `/cats`.

2. **CatList component**:
    - Uses `useFetchCats` to fetch and display a list of random cat images.
    - Provides a button to load more images, which triggers the `reFetch` function from `useFetchCats`.

3. **CatDetailsPreview component**:
    - Uses `useParams` to get the cat ID from the URL.
    - Uses `useFetch` to fetch details of the selected cat image.
    - Displays the cat image, and breed information if available.

4. **BreedList component**:
    - Uses `useFetch` to fetch and display a list of cat breeds.
    - Each breed links to a modal displaying images of that breed.

5. **Modal component**:
    - Uses `useLocation` to handle background routes.
    - Displays content in a modal overlay, such as cat details or breed images.

6. **Layout component**:
    - Wraps the main content and includes the navigation elements.
    - Uses `Outlet` to render child routes.

## Hooks

1. **useFetchCats Hook**:
    - Fetches a list of random cat images.
    - Manages fetching state and provides a function to re-fetch more images.

2. **useFetch Hook**:
    - Generic hook for fetching data from an endpoint.
    - Manages fetching state, data, and errors.

## Example flow

1. User navigates to `/cats`.
2. `App` component renders `CatList`.
3. `CatList` uses `useFetchCats` to fetch and display 10 random cat images.
4. User clicks on a cat image.
5. URL changes to `/cats/:id`.
6. `App` component renders `Modal`.
7. `Modal` uses `useParams` to get the cat ID, `useLocation` to determine if it should render cat or bree information,
and `useFetch` to fetch cat details (since the user is in the `/cats/:id` route).
8. `Modal` displays the cat image, and breed information if available.