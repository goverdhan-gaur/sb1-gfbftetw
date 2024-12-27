import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useInitializeSettings } from '../hooks/useInitializeSettings';

// ... (keep existing interfaces and defaultSettings)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  useInitializeSettings(); // Add this line

  // ... (keep rest of the component the same)
}