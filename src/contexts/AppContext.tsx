import { createContext } from 'react';
import { Category } from '../api/client/categories';
import { PublicGeneralSettings, PublicContactSettings } from '../api/client/public';

export interface AppContextType {
    categories: Category[];
    generalSettings: PublicGeneralSettings | null;
    contactSettings: PublicContactSettings | null;
    loading: boolean;
    error: string | null;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

