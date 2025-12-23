// app/settings/page.tsx (FIXED VERSION)
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Settings state
  const [settings, setSettings] = useState({
    general: {
      libraryName: 'Central Public Library',
      libraryEmail: 'contact@library.com',
      libraryPhone: '+1 (234) 567-8900',
      address: '123 Library Street, Knowledge City',
      openingHours: '9:00 AM - 8:00 PM',
      maxBooksPerMember: 5,
      loanPeriod: 14,
      autoRenewal: true,
    },
    borrowing: {
      lateFeePerDay: 1.00,
      maxLateDays: 30,
      reservationHoldDays: 3,
      maxReservations: 3,
      allowRenewals: true,
      renewalDays: 7,
      gracePeriod: 2,
    },
    membership: {
      membershipPlans: [
        { name: 'Basic', maxBooks: 3, price: 0 },
        { name: 'Standard', maxBooks: 5, price: 49 },
        { name: 'Premium', maxBooks: 10, price: 99 },
      ],
      studentDiscount: 20,
      seniorDiscount: 15,
      annualDiscount: 10,
    },
    fines: {
      finePerDay: 0.50,
      maxFineAmount: 25.00,
      damageFee: 15.00,
      lostBookFee: 'Book Price + Processing',
      fineReminderDays: [3, 7, 14],
      autoWaiveSmallFines: true,
      smallFineThreshold: 2.00,
    },
    notifications: {
      dueReminderDays: 2,
      reservationReady: true,
      newBookAlert: true,
      newsletterSubscription: true,
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
    },
    security: {
      sessionTimeout: 30,
      requirePasswordChange: 90,
      twoFactorAuth: false,
      ipWhitelist: [],
      failedAttemptsLock: 5,
      lockoutDuration: 15,
    }
  });

  // Check for dark mode preference
  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  // Color Palette
  const colors = darkMode ? {
    primary: '#3b82f6',
    secondary: '#10b981',
    danger: '#ef4444',
    warning: '#f59e0b',
    purple: '#8b5cf6',
    pink: '#ec4899',
    teal: '#14b8a6',
    orange: '#f97316',
    indigo: '#6366f1',
    background: '#111827',
    cardBg: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    overlay: '#00000040',
    success: '#10b981',
  } : {
    primary: '#2563eb',
    secondary: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
    purple: '#7c3aed',
    pink: '#db2777',
    teal: '#0d9488',
    orange: '#ea580c',
    indigo: '#4f46e5',
    background: '#f9fafb',
    cardBg: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    overlay: '#00000020',
    success: '#059669',
  };

  // Settings tabs
  const settingsTabs = [
    { id: 'general', label: '⚙️ General', icon: '⚙️' },
    { id: 'borrowing', label: '📚 Borrowing', icon: '📚' },
    { id: 'membership', label: '👤 Membership', icon: '👤' },
    { id: 'fines', label: '💰 Fines', icon: '💰' },
    { id: 'notifications', label: '🔔 Notifications', icon: '🔔' },
    { id: 'security', label: '🔒 Security', icon: '🔒' },
    { id: 'backup', label: '💾 Backup', icon: '💾' },
  ];

  // Handle setting change
  const handleSettingChange = (category: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value
      }
    }));
  };

  // Handle membership plan change
  const handleMembershipPlanChange = (index: number, field: string, value: any) => {
    const updatedPlans = [...settings.membership.membershipPlans];
    updatedPlans[index] = {
      ...updatedPlans[index],
      [field]: field === 'price' ? parseFloat(value) || 0 : value
    };
    
    setSettings(prev => ({
      ...prev,
      membership: {
        ...prev.membership,
        membershipPlans: updatedPlans
      }
    }));
  };

  // Add new membership plan
  const addMembershipPlan = () => {
    const newPlan = {
      name: `Plan ${settings.membership.membershipPlans.length + 1}`,
      maxBooks: 3,
      price: 0
    };
    
    setSettings(prev => ({
      ...prev,
      membership: {
        ...prev.membership,
        membershipPlans: [...prev.membership.membershipPlans, newPlan]
      }
    }));
  };

  // Remove membership plan
  const removeMembershipPlan = (index: number) => {
    if (settings.membership.membershipPlans.length > 1) {
      const updatedPlans = settings.membership.membershipPlans.filter((_, i) => i !== index);
      
      setSettings(prev => ({
        ...prev,
        membership: {
          ...prev.membership,
          membershipPlans: updatedPlans
        }
      }));
    }
  };

  // Handle save settings
  const saveSettings = () => {
    setLoading(true);
    setSaveStatus('saving');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', settings);
      setLoading(false);
      setSaveStatus('saved');
      
      // Reset saved status after 3 seconds
      setTimeout(() => {
        setSaveStatus('idle');
      }, 3000);
    }, 1500);
  };

  // Handle reset to defaults
  const resetToDefaults = () => {
    if (confirm('Are you sure you want to reset all settings to default values?')) {
      setLoading(true);
      
      // Reset settings to default
      setTimeout(() => {
        setSettings({
          general: {
            libraryName: 'Central Public Library',
            libraryEmail: 'contact@library.com',
            libraryPhone: '+1 (234) 567-8900',
            address: '123 Library Street, Knowledge City',
            openingHours: '9:00 AM - 8:00 PM',
            maxBooksPerMember: 5,
            loanPeriod: 14,
            autoRenewal: true,
          },
          borrowing: {
            lateFeePerDay: 1.00,
            maxLateDays: 30,
            reservationHoldDays: 3,
            maxReservations: 3,
            allowRenewals: true,
            renewalDays: 7,
            gracePeriod: 2,
          },
          membership: {
            membershipPlans: [
              { name: 'Basic', maxBooks: 3, price: 0 },
              { name: 'Standard', maxBooks: 5, price: 49 },
              { name: 'Premium', maxBooks: 10, price: 99 },
            ],
            studentDiscount: 20,
            seniorDiscount: 15,
            annualDiscount: 10,
          },
          fines: {
            finePerDay: 0.50,
            maxFineAmount: 25.00,
            damageFee: 15.00,
            lostBookFee: 'Book Price + Processing',
            fineReminderDays: [3, 7, 14],
            autoWaiveSmallFines: true,
            smallFineThreshold: 2.00,
          },
          notifications: {
            dueReminderDays: 2,
            reservationReady: true,
            newBookAlert: true,
            newsletterSubscription: true,
            emailNotifications: true,
            smsNotifications: false,
            pushNotifications: true,
          },
          security: {
            sessionTimeout: 30,
            requirePasswordChange: 90,
            twoFactorAuth: false,
            ipWhitelist: [],
            failedAttemptsLock: 5,
            lockoutDuration: 15,
          }
        });
        
        setLoading(false);
        alert('Settings have been reset to defaults.');
      }, 1000);
    }
  };

  // Handle backup
  const handleBackup = () => {
    setLoading(true);
    
    // Simulate backup process
    setTimeout(() => {
      const dataStr = JSON.stringify(settings, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `library-settings-${new Date().toISOString().split('T')[0]}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      setLoading(false);
      alert('Settings backup downloaded successfully!');
    }, 1000);
  };

  // Handle restore
  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const restoredSettings = JSON.parse(event.target?.result as string);
          setSettings(restoredSettings);
          alert('Settings restored successfully!');
        } catch (error) {
          alert('Error: Invalid settings file format.');
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  };

  // Render setting field based on type
  const renderSettingField = (category: string, field: string, value: any, label: string, type: string = 'text') => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      let newValue: any = e.target.value;
      
      if (type === 'number') {
        newValue = parseFloat(newValue) || 0;
      } else if (type === 'checkbox') {
        newValue = (e.target as HTMLInputElement).checked;
      }
      
      handleSettingChange(category, field, newValue);
    };

    return (
      <div style={styles.settingField}>
        <label style={styles.settingLabel}>{label}</label>
        {type === 'textarea' ? (
          <textarea
            value={value}
            onChange={handleChange}
            style={styles.textarea}
            rows={3}
          />
        ) : type === 'checkbox' ? (
          <div style={styles.checkboxContainer}>
            <input
              type="checkbox"
              checked={value}
              onChange={handleChange}
              style={styles.checkbox}
            />
            <span style={{ 
              fontSize: '14px', 
              color: value ? colors.success : colors.textSecondary,
              fontWeight: 500,
            }}>
              {value ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        ) : type === 'select' ? (
          <select
            value={value}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="9:00 AM - 5:00 PM">9:00 AM - 5:00 PM</option>
            <option value="9:00 AM - 8:00 PM">9:00 AM - 8:00 PM</option>
            <option value="10:00 AM - 9:00 PM">10:00 AM - 9:00 PM</option>
            <option value="24/7 (Digital Only)">24/7 (Digital Only)</option>
          </select>
        ) : (
          <input
            type={type}
            value={value}
            onChange={handleChange}
            style={styles.input}
            min={type === 'number' ? 0 : undefined}
            step={type === 'number' ? 0.01 : undefined}
          />
        )}
      </div>
    );
  };

  // Styles - FIXED VERSION (separated background properties)
  const styles = {
    container: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
      gap: '24px',
    },
    titleSection: {
      flex: 1,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      backgroundColor: 'transparent',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0 0 8px 0',
      lineHeight: 1.2,
    },
    subtitle: {
      fontSize: '1.1rem',
      color: colors.textSecondary,
      margin: '0',
      lineHeight: 1.5,
    },
    controls: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap' as const,
      alignItems: 'center',
    },
    controlButton: {
      padding: '12px 24px',
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      backgroundColor: colors.cardBg,
      fontSize: '0.9375rem',
      fontWeight: 500,
      color: colors.text,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s',
    },
    primaryButton: {
      padding: '14px 32px',
      backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: 600,
      color: 'white',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.3s',
      boxShadow: `0 4px 12px ${colors.primary}40`,
    },
    saveButton: {
      padding: '14px 32px',
      backgroundImage: `linear-gradient(135deg, ${colors.success}, ${colors.secondary})`,
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: 600,
      color: 'white',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.3s',
      boxShadow: `0 4px 12px ${colors.success}40`,
    },
    tabsContainer: {
      display: 'flex',
      gap: '8px',
      marginBottom: '32px',
      overflowX: 'auto',
      paddingBottom: '8px',
    },
    tab: {
      padding: '16px 24px',
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      backgroundColor: colors.cardBg,
      fontSize: '0.9375rem',
      fontWeight: 500,
      color: colors.textSecondary,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s',
      whiteSpace: 'nowrap',
    },
    activeTab: {
      backgroundImage: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      backgroundColor: 'transparent',
      color: 'white',
      borderColor: colors.primary,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${colors.primary}30`,
    },
    settingsContent: {
      backgroundColor: colors.cardBg,
      borderRadius: '20px',
      padding: '32px',
      boxShadow: `0 8px 30px ${colors.overlay}`,
      border: `1px solid ${colors.border}`,
      marginBottom: '40px',
    },
    sectionHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
      gap: '20px',
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: colors.text,
      margin: '0',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    sectionDescription: {
      fontSize: '1rem',
      color: colors.textSecondary,
      margin: '8px 0 0 0',
      lineHeight: 1.6,
    },
    settingsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '32px',
    },
    settingField: {
      marginBottom: '24px',
    },
    settingLabel: {
      display: 'block',
      fontSize: '0.9375rem',
      fontWeight: 600,
      color: colors.text,
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '12px 16px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      fontSize: '0.9375rem',
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      color: colors.text,
      transition: 'all 0.2s',
    },
    textarea: {
      width: '100%',
      padding: '12px 16px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      fontSize: '0.9375rem',
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      color: colors.text,
      transition: 'all 0.2s',
      resize: 'vertical',
    },
    select: {
      width: '100%',
      padding: '12px 16px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      fontSize: '0.9375rem',
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      color: colors.text,
      transition: 'all 0.2s',
    },
    checkboxContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    checkbox: {
      width: '20px',
      height: '20px',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    membershipPlans: {
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      marginBottom: '24px',
    },
    planHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '20px',
    },
    planTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0',
    },
    planRow: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px',
      marginBottom: '16px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${colors.border}`,
    },
    planActions: {
      display: 'flex',
      gap: '8px',
      marginTop: '8px',
    },
    addButton: {
      padding: '10px 20px',
      border: `2px dashed ${colors.border}`,
      borderRadius: '10px',
      backgroundColor: 'transparent',
      fontSize: '0.9375rem',
      fontWeight: 500,
      color: colors.textSecondary,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      width: '100%',
      justifyContent: 'center',
    },
    dangerButton: {
      padding: '10px 20px',
      border: `2px solid ${colors.danger}`,
      borderRadius: '10px',
      backgroundColor: 'transparent',
      fontSize: '0.875rem',
      fontWeight: 500,
      color: colors.danger,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    fineReminderDays: {
      display: 'flex',
      gap: '12px',
      flexWrap: 'wrap' as const,
      marginTop: '12px',
    },
    reminderDay: {
      padding: '8px 16px',
      backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
      borderRadius: '8px',
      fontSize: '0.875rem',
      color: colors.text,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    removeReminder: {
      background: 'transparent',
      border: 'none',
      color: colors.danger,
      cursor: 'pointer',
      fontSize: '1.125rem',
      padding: '0',
      display: 'flex',
      alignItems: 'center',
    },
    addReminderButton: {
      padding: '8px 16px',
      border: `2px dashed ${colors.border}`,
      borderRadius: '8px',
      backgroundColor: 'transparent',
      fontSize: '0.875rem',
      color: colors.textSecondary,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
    },
    notificationSettings: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
    },
    notificationItem: {
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      borderRadius: '12px',
      padding: '20px',
      border: `1px solid ${colors.border}`,
    },
    notificationHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '12px',
    },
    notificationTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0',
    },
    notificationDescription: {
      fontSize: '0.875rem',
      color: colors.textSecondary,
      margin: '0',
      lineHeight: 1.5,
    },
    actionsBar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px',
      backgroundColor: darkMode ? '#1e3a8a20' : '#dbeafe',
      borderRadius: '16px',
      border: `2px solid ${colors.primary}`,
      marginTop: '40px',
      flexWrap: 'wrap' as const,
      gap: '20px',
    },
    statusMessage: {
      fontSize: '0.9375rem',
      color: colors.text,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    loadingOverlay: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: `${colors.background}cc`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    loadingSpinner: {
      backgroundColor: colors.cardBg,
      borderRadius: '20px',
      padding: '40px',
      textAlign: 'center' as const,
      boxShadow: `0 8px 32px ${colors.overlay}`,
    },
    spinner: {
      fontSize: '3rem',
      marginBottom: '20px',
      animation: 'spin 1s linear infinite',
    },
    spinnerText: {
      fontSize: '1.125rem',
      color: colors.text,
      margin: '0 0 8px 0',
    },
    spinnerSubtext: {
      fontSize: '0.9375rem',
      color: colors.textSecondary,
    },
    footer: {
      marginTop: '60px',
      paddingTop: '32px',
      borderTop: `1px solid ${colors.border}`,
      color: colors.textSecondary,
      fontSize: '0.875rem',
      textAlign: 'center' as const,
    },
  };

  // Add CSS for spinner animation
  const spinnerStyle = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  // Render current settings tab content
  const renderSettingsContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div>
            <div style={styles.sectionHeader}>
              <div>
                <h3 style={styles.sectionTitle}>
                  ⚙️ General Settings
                </h3>
                <p style={styles.sectionDescription}>
                  Configure basic library information and operational settings
                </p>
              </div>
            </div>
            
            <div style={styles.settingsGrid}>
              {renderSettingField('general', 'libraryName', settings.general.libraryName, 'Library Name')}
              {renderSettingField('general', 'libraryEmail', settings.general.libraryEmail, 'Library Email', 'email')}
              {renderSettingField('general', 'libraryPhone', settings.general.libraryPhone, 'Library Phone', 'tel')}
              {renderSettingField('general', 'address', settings.general.address, 'Address', 'textarea')}
              {renderSettingField('general', 'openingHours', settings.general.openingHours, 'Opening Hours', 'select')}
              {renderSettingField('general', 'maxBooksPerMember', settings.general.maxBooksPerMember, 'Max Books Per Member', 'number')}
              {renderSettingField('general', 'loanPeriod', settings.general.loanPeriod, 'Loan Period (days)', 'number')}
              {renderSettingField('general', 'autoRenewal', settings.general.autoRenewal, 'Auto Renewal', 'checkbox')}
            </div>
          </div>
        );

      case 'borrowing':
        return (
          <div>
            <div style={styles.sectionHeader}>
              <div>
                <h3 style={styles.sectionTitle}>
                  📚 Borrowing Rules
                </h3>
                <p style={styles.sectionDescription}>
                  Configure book borrowing policies, renewals, and reservations
                </p>
              </div>
            </div>
            
            <div style={styles.settingsGrid}>
              {renderSettingField('borrowing', 'lateFeePerDay', settings.borrowing.lateFeePerDay, 'Late Fee Per Day ($)', 'number')}
              {renderSettingField('borrowing', 'maxLateDays', settings.borrowing.maxLateDays, 'Max Late Days', 'number')}
              {renderSettingField('borrowing', 'reservationHoldDays', settings.borrowing.reservationHoldDays, 'Reservation Hold Days', 'number')}
              {renderSettingField('borrowing', 'maxReservations', settings.borrowing.maxReservations, 'Max Reservations Per Member', 'number')}
              {renderSettingField('borrowing', 'allowRenewals', settings.borrowing.allowRenewals, 'Allow Renewals', 'checkbox')}
              {renderSettingField('borrowing', 'renewalDays', settings.borrowing.renewalDays, 'Renewal Period (days)', 'number')}
              {renderSettingField('borrowing', 'gracePeriod', settings.borrowing.gracePeriod, 'Grace Period (days)', 'number')}
            </div>
          </div>
        );

      case 'membership':
        return (
          <div>
            <div style={styles.sectionHeader}>
              <div>
                <h3 style={styles.sectionTitle}>
                  👤 Membership Plans
                </h3>
                <p style={styles.sectionDescription}>
                  Configure membership tiers, pricing, and discount policies
                </p>
              </div>
            </div>
            
            <div style={styles.membershipPlans}>
              <div style={styles.planHeader}>
                <h4 style={styles.planTitle}>Membership Plans</h4>
                <button 
                  onClick={addMembershipPlan}
                  style={{
                    ...styles.controlButton,
                    borderColor: colors.success,
                    color: colors.success,
                  }}
                >
                  ➕ Add Plan
                </button>
              </div>
              
              {settings.membership.membershipPlans.map((plan, index) => (
                <div key={index} style={{ marginBottom: '24px' }}>
                  <div style={styles.planRow}>
                    <div>
                      <label style={styles.settingLabel}>Plan Name</label>
                      <input
                        type="text"
                        value={plan.name}
                        onChange={(e) => handleMembershipPlanChange(index, 'name', e.target.value)}
                        style={styles.input}
                      />
                    </div>
                    <div>
                      <label style={styles.settingLabel}>Max Books</label>
                      <input
                        type="number"
                        value={plan.maxBooks}
                        onChange={(e) => handleMembershipPlanChange(index, 'maxBooks', parseInt(e.target.value) || 0)}
                        style={styles.input}
                        min="1"
                      />
                    </div>
                    <div>
                      <label style={styles.settingLabel}>Annual Price ($)</label>
                      <input
                        type="number"
                        value={plan.price}
                        onChange={(e) => handleMembershipPlanChange(index, 'price', parseFloat(e.target.value) || 0)}
                        style={styles.input}
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  
                  <div style={styles.planActions}>
                    {settings.membership.membershipPlans.length > 1 && (
                      <button 
                        onClick={() => removeMembershipPlan(index)}
                        style={styles.dangerButton}
                      >
                        🗑️ Remove Plan
                      </button>
                    )}
                    <div style={{ flex: 1 }} />
                    <div style={{ 
                      fontSize: '0.875rem', 
                      color: colors.textSecondary,
                      padding: '8px 16px',
                      backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                      borderRadius: '8px',
                    }}>
                      ${plan.price}/year • {plan.maxBooks} books
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div style={styles.settingsGrid}>
              {renderSettingField('membership', 'studentDiscount', settings.membership.studentDiscount, 'Student Discount (%)', 'number')}
              {renderSettingField('membership', 'seniorDiscount', settings.membership.seniorDiscount, 'Senior Discount (%)', 'number')}
              {renderSettingField('membership', 'annualDiscount', settings.membership.annualDiscount, 'Annual Payment Discount (%)', 'number')}
            </div>
          </div>
        );

      case 'fines':
        return (
          <div>
            <div style={styles.sectionHeader}>
              <div>
                <h3 style={styles.sectionTitle}>
                  💰 Fine Policies
                </h3>
                <p style={styles.sectionDescription}>
                  Configure fine calculation, thresholds, and reminder settings
                </p>
              </div>
            </div>
            
            <div style={styles.settingsGrid}>
              {renderSettingField('fines', 'finePerDay', settings.fines.finePerDay, 'Fine Per Day ($)', 'number')}
              {renderSettingField('fines', 'maxFineAmount', settings.fines.maxFineAmount, 'Maximum Fine Amount ($)', 'number')}
              {renderSettingField('fines', 'damageFee', settings.fines.damageFee, 'Damage Fee ($)', 'number')}
              {renderSettingField('fines', 'lostBookFee', settings.fines.lostBookFee, 'Lost Book Fee')}
              {renderSettingField('fines', 'autoWaiveSmallFines', settings.fines.autoWaiveSmallFines, 'Auto-waive Small Fines', 'checkbox')}
              {renderSettingField('fines', 'smallFineThreshold', settings.fines.smallFineThreshold, 'Small Fine Threshold ($)', 'number')}
              
              <div style={styles.settingField}>
                <label style={styles.settingLabel}>Fine Reminder Days</label>
                <div style={styles.fineReminderDays}>
                  {settings.fines.fineReminderDays.map((day, index) => (
                    <div key={index} style={styles.reminderDay}>
                      {day} days
                      <button 
                        onClick={() => {
                          const updatedDays = settings.fines.fineReminderDays.filter((_, i) => i !== index);
                          handleSettingChange('fines', 'fineReminderDays', updatedDays);
                        }}
                        style={styles.removeReminder}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => {
                      const newDay = parseInt(prompt('Enter reminder day:') || '0');
                      if (newDay > 0) {
                        const updatedDays = [...settings.fines.fineReminderDays, newDay].sort((a, b) => a - b);
                        handleSettingChange('fines', 'fineReminderDays', updatedDays);
                      }
                    }}
                    style={styles.addReminderButton}
                  >
                    ➕ Add Reminder Day
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div>
            <div style={styles.sectionHeader}>
              <div>
                <h3 style={styles.sectionTitle}>
                  🔔 Notification Settings
                </h3>
                <p style={styles.sectionDescription}>
                  Configure notification channels, triggers, and preferences
                </p>
              </div>
            </div>
            
            <div style={styles.notificationSettings}>
              {renderSettingField('notifications', 'dueReminderDays', settings.notifications.dueReminderDays, 'Due Reminder (days before)', 'number')}
              {renderSettingField('notifications', 'emailNotifications', settings.notifications.emailNotifications, 'Email Notifications', 'checkbox')}
              {renderSettingField('notifications', 'smsNotifications', settings.notifications.smsNotifications, 'SMS Notifications', 'checkbox')}
              {renderSettingField('notifications', 'pushNotifications', settings.notifications.pushNotifications, 'Push Notifications', 'checkbox')}
            </div>
            
            <div style={{ marginTop: '32px' }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: colors.text, margin: '0 0 20px 0' }}>
                Notification Types
              </h4>
              <div style={styles.notificationSettings}>
                <div style={styles.notificationItem}>
                  <div style={styles.notificationHeader}>
                    <h5 style={styles.notificationTitle}>Due Date Reminders</h5>
                    <input
                      type="checkbox"
                      checked={settings.notifications.dueReminderDays > 0}
                      onChange={(e) => handleSettingChange('notifications', 'dueReminderDays', e.target.checked ? 2 : 0)}
                      style={styles.checkbox}
                    />
                  </div>
                  <p style={styles.notificationDescription}>
                    Send reminders before book due dates
                  </p>
                </div>
                
                <div style={styles.notificationItem}>
                  <div style={styles.notificationHeader}>
                    <h5 style={styles.notificationTitle}>Reservation Ready</h5>
                    <input
                      type="checkbox"
                      checked={settings.notifications.reservationReady}
                      onChange={(e) => handleSettingChange('notifications', 'reservationReady', e.target.checked)}
                      style={styles.checkbox}
                    />
                  </div>
                  <p style={styles.notificationDescription}>
                    Notify when reserved books are available
                  </p>
                </div>
                
                <div style={styles.notificationItem}>
                  <div style={styles.notificationHeader}>
                    <h5 style={styles.notificationTitle}>New Book Alerts</h5>
                    <input
                      type="checkbox"
                      checked={settings.notifications.newBookAlert}
                      onChange={(e) => handleSettingChange('notifications', 'newBookAlert', e.target.checked)}
                      style={styles.checkbox}
                    />
                  </div>
                  <p style={styles.notificationDescription}>
                    Alert members about new arrivals
                  </p>
                </div>
                
                <div style={styles.notificationItem}>
                  <div style={styles.notificationHeader}>
                    <h5 style={styles.notificationTitle}>Newsletter</h5>
                    <input
                      type="checkbox"
                      checked={settings.notifications.newsletterSubscription}
                      onChange={(e) => handleSettingChange('notifications', 'newsletterSubscription', e.target.checked)}
                      style={styles.checkbox}
                    />
                  </div>
                  <p style={styles.notificationDescription}>
                    Monthly library newsletter
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div>
            <div style={styles.sectionHeader}>
              <div>
                <h3 style={styles.sectionTitle}>
                  🔒 Security Settings
                </h3>
                <p style={styles.sectionDescription}>
                  Configure security policies, access controls, and authentication
                </p>
              </div>
            </div>
            
            <div style={styles.settingsGrid}>
              {renderSettingField('security', 'sessionTimeout', settings.security.sessionTimeout, 'Session Timeout (minutes)', 'number')}
              {renderSettingField('security', 'requirePasswordChange', settings.security.requirePasswordChange, 'Require Password Change (days)', 'number')}
              {renderSettingField('security', 'twoFactorAuth', settings.security.twoFactorAuth, 'Two-Factor Authentication', 'checkbox')}
              {renderSettingField('security', 'failedAttemptsLock', settings.security.failedAttemptsLock, 'Failed Attempts Before Lock', 'number')}
              {renderSettingField('security', 'lockoutDuration', settings.security.lockoutDuration, 'Lockout Duration (minutes)', 'number')}
            </div>
          </div>
        );

      case 'backup':
        return (
          <div>
            <div style={styles.sectionHeader}>
              <div>
                <h3 style={styles.sectionTitle}>
                  💾 Backup & Restore
                </h3>
                <p style={styles.sectionDescription}>
                  Manage settings backup, restore, and export operations
                </p>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: darkMode ? '#374151' : '#f9fafb',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center' as const,
              marginBottom: '32px',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💾</div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 600, color: colors.text, margin: '0 0 12px 0' }}>
                Settings Backup
              </h4>
              <p style={{ fontSize: '1rem', color: colors.textSecondary, margin: '0 0 32px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                Backup your current settings to a file that can be restored later. This includes all configuration from all tabs.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={handleBackup}
                  style={styles.primaryButton}
                >
                  📥 Backup Settings
                </button>
                <button 
                  onClick={handleRestore}
                  style={{
                    ...styles.controlButton,
                    borderColor: colors.warning,
                    color: colors.warning,
                  }}
                >
                  📤 Restore Settings
                </button>
              </div>
            </div>
            
            <div style={{ 
              backgroundColor: darkMode ? '#1e293b' : '#fef3c7',
              borderRadius: '16px',
              padding: '24px',
              border: `2px solid ${colors.warning}`,
            }}>
              <h4 style={{ fontSize: '1.125rem', fontWeight: 600, color: colors.text, margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                ⚠️ Reset to Defaults
              </h4>
              <p style={{ fontSize: '0.9375rem', color: colors.textSecondary, margin: '0 0 20px 0' }}>
                This will reset all settings to their default values. This action cannot be undone.
              </p>
              <button 
                onClick={resetToDefaults}
                style={styles.dangerButton}
              >
                🔄 Reset All Settings
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <style>{spinnerStyle}</style>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>⚙️ Library Settings</h1>
            <p style={styles.subtitle}>
              Configure library policies, rules, notifications, and system preferences
            </p>
          </div>
          <div style={styles.controls}>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              style={{
                ...styles.controlButton,
                borderColor: colors.warning,
                color: colors.warning,
              }}
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <Link 
              href="/dashboard"
              style={styles.controlButton}
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Settings Tabs */}
        <div style={styles.tabsContainer}>
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                ...styles.tab,
                ...(activeTab === tab.id ? styles.activeTab : {})
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div style={styles.settingsContent}>
          {renderSettingsContent()}
          
          {/* Actions Bar */}
          <div style={styles.actionsBar}>
            <div style={styles.statusMessage}>
              {saveStatus === 'saving' && (
                <>
                  <span style={{ color: colors.warning }}>⏳</span>
                  Saving changes...
                </>
              )}
              {saveStatus === 'saved' && (
                <>
                  <span style={{ color: colors.success }}>✅</span>
                  Settings saved successfully!
                </>
              )}
              {saveStatus === 'idle' && (
                <>
                  <span style={{ color: colors.textSecondary }}>💡</span>
                  Make changes and click Save
                </>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={resetToDefaults}
                style={{
                  ...styles.controlButton,
                  borderColor: colors.warning,
                  color: colors.warning,
                }}
              >
                🔄 Reset
              </button>
              <button 
                onClick={saveSettings}
                style={styles.saveButton}
                disabled={loading}
              >
                {loading ? '⏳ Saving...' : '💾 Save Settings'}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={{ margin: '0 0 16px 0' }}>
            ⚙️ System Settings • Last saved: Today at 14:30 • Version: 2.1.0
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span>📞 Need help? Contact system administrator</span>
            <span>🔧 Advanced settings require admin access</span>
            <span>💾 Auto-backup: Every 24 hours</span>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingSpinner}>
              <div style={styles.spinner}>⚙️</div>
              <h3 style={styles.spinnerText}>
                {activeTab === 'backup' ? 'Processing Backup...' : 'Saving Settings...'}
              </h3>
              <p style={styles.spinnerSubtext}>
                Please wait while we process your request
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}