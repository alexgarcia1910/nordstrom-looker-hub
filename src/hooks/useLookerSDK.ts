import { useContext } from 'react';
import { ExtensionContext40 } from '@looker/extension-sdk-react';

export const useLookerSDK = () => {
  const context = useContext(ExtensionContext40);
  
  if (!context) {
    throw new Error('useLookerSDK must be used within ExtensionProvider40');
  }
  
  return context.coreSDK;
};
