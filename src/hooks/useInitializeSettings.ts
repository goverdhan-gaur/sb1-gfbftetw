import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

const defaultSettings = {
  theme: 'light',
  currency: 'USD',
  timeZone: 'UTC',
  notifications: {
    email: true,
    push: false,
    trades: true,
    news: false,
  },
};

export function useInitializeSettings() {
  const { user } = useAuth();

  useEffect(() => {
    async function initializeSettings() {
      if (!user) return;

      // Check if settings exist
      const { data: existingSettings } = await supabase
        .from('user_settings')
        .select('id')
        .eq('user_id', user.id)
        .single();

      // If no settings exist, create them
      if (!existingSettings) {
        await supabase
          .from('user_settings')
          .insert({
            user_id: user.id,
            settings: defaultSettings,
          });
      }
    }

    initializeSettings();
  }, [user]);
}