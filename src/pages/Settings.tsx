import React from 'react';
import ProfileSection from '../components/settings/ProfileSection';
import NotificationSection from '../components/settings/NotificationSection';
import PreferencesSection from '../components/settings/PreferencesSection';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <ProfileSection />
      <NotificationSection />
      <PreferencesSection />
    </div>
  );
}