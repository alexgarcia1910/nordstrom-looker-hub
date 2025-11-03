import { useState, useEffect } from 'react';
import { useLookerSDK } from './useLookerSDK';
import { IUser } from '@looker/sdk';

export const useLookerUser = () => {
  const sdk = useLookerSDK();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await sdk.ok(sdk.me());
        setUser(currentUser);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [sdk]);

  return { user, loading, error };
};
