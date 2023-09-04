import {
  useState,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  FC,
  createContext,
  useEffect,
} from "react";

interface UserInterface {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
};

type ContextValue = {
  user: UserInterface | null;
  setUser: Dispatch<SetStateAction<UserInterface | null>>;
};

const UserContext = createContext<null | ContextValue>(null);
const { Provider } = UserContext;

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${Math.trunc(Math.random() * 10) + 1}`)
    .then(res => res.json())
    .then(userFromDB => setUser(userFromDB))
    .catch(err => console.error(err));
  }, [])

  return <Provider value={{ user, setUser }}>{children}</Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

export default UserProvider;
