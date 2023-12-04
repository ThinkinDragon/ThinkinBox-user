import { Preferences } from '@capacitor/preferences';

export interface Storage {
    key: string
    value: string
}

const storageDefaults: Storage = {
    key: "",
    value: ""
}

export default class PrefStorage {


    public setStorage = async (key: string, value: string): Promise<void> => {
        await Preferences.set({
            key,
            value,
        });
    };

    public getStorage = async (key: string) => {
        const { value } = await Preferences.get({ key });
        return `${value}`;
    };

    public removeStorage = async (key: string): Promise<void> => {
        await Preferences.remove({ key });
    };
}