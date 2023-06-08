import { User } from "./api/interfaces";


export type AuthContextStateType = [User, React.Dispatch<React.SetStateAction<User>>];

export type AuthContextType = AuthContextStateType | undefined;