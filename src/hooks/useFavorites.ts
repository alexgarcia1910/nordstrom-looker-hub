import { useState, useCallback } from 'react';
import { useLookerSDK } from './useLookerSDK';
import { useLookerUser } from './useLookerUser';
import { toast } from '@/hooks/use-toast';

export const useFavorites = () => {
  const sdk = useLookerSDK();
  const { user } = useLookerUser();
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback(async (contentType: 'dashboard' | 'look', contentId: string) => {
    if (!user?.id) return;

    try {
      const isFavorited = favoritedIds.has(contentId);

      if (isFavorited) {
        // Remove favorite - pass content_favorite_id
        await sdk.ok(
          sdk.delete_content_favorite(contentId)
        );
        setFavoritedIds(prev => {
          const newSet = new Set(prev);
          newSet.delete(contentId);
          return newSet;
        });
        toast({ title: "Removed from favorites" });
      } else {
        // Add favorite
        await sdk.ok(
          sdk.create_content_favorite({
            user_id: user.id.toString(),
            content_metadata_id: contentId
          })
        );
        setFavoritedIds(prev => new Set(prev).add(contentId));
        toast({ title: "Added to favorites" });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast({ 
        title: "Error", 
        description: "Could not update favorites", 
        variant: "destructive" 
      });
    }
  }, [sdk, user, favoritedIds]);

  return { favoritedIds, toggleFavorite };
};
