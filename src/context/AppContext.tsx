import React, {
  createContext,
  Reducer,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react";
import { LocalStorageService } from "../services/storage/LocalStorage";

type ActionsType =
  | "AddBulkCategories"
  | "AddCategory"
  | "removeCategory"
  | "AddBulkPaymentTypes"
  | "AddPaymentType"
  | "removePaymentType";

type Action = {
  type: ActionsType;
  payload: any;
};
type Profile = {
  name: string;
  lastName: string;
  email: string;
} | null;
type Category = {
  id: string;
  name: string;
};
type PaymentType = {
  id: string;
  name: string;
};

type UserData = {
  categories: Category[];
  paymentTypes: PaymentType[];
};

type State = {
  profile: Profile;
  locale: string;
  isLoading: boolean;
  userData: UserData;
  isAuth: boolean;
  frequencies: [],
  setIsLoading: (loading: boolean) => void;
  setProfile: (profile: Profile) => void;
  setLocale: (locale: string) => void;
  setIsAuth: (auth: boolean) => void;
  userDataManager: (action: Action) => void;
  setFrequencies: (frequencies: []) => void;
};

type AppContextPropsType = {
  children: React.ReactNode;
};

const AppContext = createContext<State | undefined>(undefined);

export const useAppContext = () => {
  const appContext = useContext(AppContext);
  if (!appContext) {
    throw new Error("error");
  }
  return appContext;
};

function userDataReducer(state: UserData, action: Action): UserData {
  switch (action.type) {
    case "AddBulkCategories":
      return { ...state, categories: [...state.categories, ...action.payload] };
    case "AddCategory":
      return { ...state, categories: [...state.categories, action.payload] };
    case "removeCategory":
      return {
        ...state,
        categories: state.categories.filter(
          (item: Category) => item.id !== action.payload
        ),
      };
    case "AddBulkPaymentTypes":
      return {
        ...state,
        paymentTypes: [...state.paymentTypes, ...action.payload],
      };
    case "AddPaymentType":
      return {
        ...state,
        paymentTypes: [...state.paymentTypes, action.payload],
      };
    case "removePaymentType":
      return {
        ...state,
        paymentTypes: state.paymentTypes.filter(
          (item: PaymentType) => item.id !== action.payload
        ),
      };
    default:
      throw new Error();
  }
}

export const AppContextProvider = ({ children }: AppContextPropsType) => {
  const [userData, userDataManager] = useReducer<Reducer<UserData, Action>>(
    userDataReducer,
    { categories: [], paymentTypes: [] }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile>(() => {
    const user = LocalStorageService.getUser();
    if (null !== user) return JSON.parse(user);
    else return null;
  });
  const [frequencies, setFrequencies] = useState(() => {
    const frequencies = LocalStorageService.getFrequencies();
    if (null !== frequencies) return JSON.parse(frequencies);
    else return [];
  });
  const [locale, setLocale] = useState("en");
  const [isAuth, setIsAuth] = useState(() => {
    const user = LocalStorageService.getUser();
    if (null !== user) return true;
    else return false;
  });

  const value = useMemo(
    () => ({
      userData,
      isLoading,
      locale,
      profile,
      isAuth,
      frequencies,
      userDataManager,
      setIsLoading,
      setLocale,
      setProfile,
      setIsAuth,
      setFrequencies,
    }),
    [
      userData,
      isLoading,
      locale,
      profile,
      isAuth,
      frequencies,
      userDataManager,
      setIsLoading,
      setLocale,
      setProfile,
      setIsAuth,
      setFrequencies,
    ]
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
