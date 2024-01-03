import { browser } from '$app/environment';
import { development, type IStorageProvider, LensClient, type LensClientConfig } from '@lens-protocol/client';

class StorageProvider implements IStorageProvider {
    getItem(key: string): string | Promise<string | null> | null {
        if (!browser) return null;
        return window.localStorage.getItem(key);
    }

    removeItem(key: string): void | Promise<string> | Promise<void> {
        if (!browser) return;
        window.localStorage.removeItem(key);
    }

    setItem(key: string, value: string): string | void | Promise<string> | Promise<void> {
        if (!browser) return;
        window.localStorage.setItem(key, value);
    }
}

const environment = development;

const storageProvider = new StorageProvider();

const config: LensClientConfig = {
    environment,
    storage: storageProvider,
    mediaTransforms: {
        publication: {
            width: '400px',
            keepAspectRatio: true
        },
        profilePicture: {
            width: '210px',
            height: '210px'
        },
    }
};

export const lensClient: LensClient = new LensClient(config);
