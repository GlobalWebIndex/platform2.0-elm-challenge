import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

type CatPagination = {
  limit: number;
  loadMore: () => void;
};

export const CatPaginationContext = createContext<CatPagination | undefined>(
  undefined,
);

export const useCatPaginationContext = () => {
  const context = useContext(CatPaginationContext);

  if (context === undefined) {
    throw new Error(
      'useCatPaginationContext must be used within a CatPaginationProvider',
    );
  }
  return context;
};

export const CatPaginationProvider: FC<PropsWithChildren> = ({ children }) => {
  const [limit, setLimit] = useState<number>(10);

  const loadMore = () => {
    setLimit((prev) => prev + 10);
  };

  return (
    <CatPaginationContext.Provider value={{ limit, loadMore }}>
      {children}
    </CatPaginationContext.Provider>
  );
};
