// app/fines/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function FinesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedFines, setSelectedFines] = useState<number[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState<{[key: number]: number}>({});

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
    background: '#111827',
    cardBg: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    overlay: '#00000040',
    success: '#10b981',
    active: '#22c55e',
    inactive: '#ef4444',
    overdue: '#f97316',
    partial: '#eab308',
    settled: '#22c55e',
    pending: '#3b82f6',
  } : {
    primary: '#2563eb',
    secondary: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
    purple: '#7c3aed',
    pink: '#db2777',
    teal: '#0d9488',
    background: '#f9fafb',
    cardBg: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    overlay: '#00000020',
    success: '#059669',
    active: '#16a34a',
    inactive: '#dc2626',
    overdue: '#ea580c',
    partial: '#ca8a04',
    settled: '#16a34a',
    pending: '#2563eb',
  };

  // Mock fines data
  const mockFines = [
    {
      id: 1,
      memberId: 'MEM2024001',
      memberName: 'John Doe',
      memberEmail: 'john.doe@example.com',
      bookTitle: 'The Great Gatsby',
      bookId: 'BK001234',
      borrowDate: '2024-01-15',
      dueDate: '2024-01-22',
      returnDate: '2024-01-25',
      fineAmount: 150,
      paidAmount: 100,
      remainingAmount: 50,
      status: 'Partially Paid',
      fineType: 'Late Return',
      daysOverdue: 3,
      finePerDay: 50,
      issuedDate: '2024-01-25',
      paymentHistory: [
        { date: '2024-01-26', amount: 100, method: 'Credit Card' }
      ],
      avatarColor: '#3b82f6',
    },
    {
      id: 2,
      memberId: 'MEM2024002',
      memberName: 'Jane Smith',
      memberEmail: 'jane.smith@example.com',
      bookTitle: 'To Kill a Mockingbird',
      bookId: 'BK001235',
      borrowDate: '2024-01-10',
      dueDate: '2024-01-17',
      returnDate: '2024-01-20',
      fineAmount: 150,
      paidAmount: 150,
      remainingAmount: 0,
      status: 'Settled',
      fineType: 'Late Return',
      daysOverdue: 3,
      finePerDay: 50,
      issuedDate: '2024-01-20',
      paymentHistory: [
        { date: '2024-01-21', amount: 150, method: 'Cash' }
      ],
      avatarColor: '#ec4899',
    },
    {
      id: 3,
      memberId: 'MEM2024004',
      memberName: 'Alice Brown',
      memberEmail: 'alice.brown@example.com',
      bookTitle: '1984',
      bookId: 'BK001236',
      borrowDate: '2024-01-18',
      dueDate: '2024-01-25',
      returnDate: '2024-01-30',
      fineAmount: 250,
      paidAmount: 0,
      remainingAmount: 250,
      status: 'Overdue',
      fineType: 'Late Return',
      daysOverdue: 5,
      finePerDay: 50,
      issuedDate: '2024-01-30',
      paymentHistory: [],
      avatarColor: '#f59e0b',
    },
    {
      id: 4,
      memberId: 'MEM2024005',
      memberName: 'Charlie Wilson',
      memberEmail: 'charlie.wilson@example.com',
      bookTitle: 'The Hobbit',
      bookId: 'BK001237',
      borrowDate: '2024-01-12',
      dueDate: '2024-01-19',
      returnDate: '2024-01-19',
      fineAmount: 0,
      paidAmount: 0,
      remainingAmount: 0,
      status: 'No Fine',
      fineType: 'None',
      daysOverdue: 0,
      finePerDay: 0,
      issuedDate: null,
      paymentHistory: [],
      avatarColor: '#8b5cf6',
    },
    {
      id: 5,
      memberId: 'MEM2024006',
      memberName: 'David Miller',
      memberEmail: 'david.miller@example.com',
      bookTitle: 'Pride and Prejudice',
      bookId: 'BK001238',
      borrowDate: '2024-01-05',
      dueDate: '2024-01-12',
      returnDate: null,
      fineAmount: 400,
      paidAmount: 0,
      remainingAmount: 400,
      status: 'Pending',
      fineType: 'Lost Book',
      daysOverdue: 18,
      finePerDay: 50,
      issuedDate: '2024-01-15',
      paymentHistory: [],
      avatarColor: '#ef4444',
    },
    {
      id: 6,
      memberId: 'MEM2024007',
      memberName: 'Emma Wilson',
      memberEmail: 'emma.wilson@example.com',
      bookTitle: 'The Catcher in the Rye',
      bookId: 'BK001239',
      borrowDate: '2024-01-20',
      dueDate: '2024-01-27',
      returnDate: '2024-01-29',
      fineAmount: 100,
      paidAmount: 0,
      remainingAmount: 100,
      status: 'Pending',
      fineType: 'Late Return',
      daysOverdue: 2,
      finePerDay: 50,
      issuedDate: '2024-01-29',
      paymentHistory: [],
      avatarColor: '#14b8a6',
    },
    {
      id: 7,
      memberId: 'MEM2024008',
      memberName: 'Frank Harris',
      memberEmail: 'frank.harris@example.com',
      bookTitle: 'Brave New World',
      bookId: 'BK001240',
      borrowDate: '2024-01-15',
      dueDate: '2024-01-22',
      returnDate: '2024-01-24',
      fineAmount: 100,
      paidAmount: 50,
      remainingAmount: 50,
      status: 'Partially Paid',
      fineType: 'Damage',
      daysOverdue: 2,
      finePerDay: 50,
      issuedDate: '2024-01-24',
      paymentHistory: [
        { date: '2024-01-25', amount: 50, method: 'Debit Card' }
      ],
      avatarColor: '#6366f1',
    },
    {
      id: 8,
      memberId: 'MEM2024003',
      memberName: 'Bob Johnson',
      memberEmail: 'bob.johnson@example.com',
      bookTitle: 'Moby Dick',
      bookId: 'BK001241',
      borrowDate: '2024-01-08',
      dueDate: '2024-01-15',
      returnDate: '2024-01-18',
      fineAmount: 150,
      paidAmount: 150,
      remainingAmount: 0,
      status: 'Settled',
      fineType: 'Late Return',
      daysOverdue: 3,
      finePerDay: 50,
      issuedDate: '2024-01-18',
      paymentHistory: [
        { date: '2024-01-19', amount: 150, method: 'Online' }
      ],
      avatarColor: '#10b981',
    },
  ];

  // Filter fines
  const filteredFines = mockFines.filter(fine => {
    const matchesSearch = 
      fine.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.memberEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fine.bookId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'All' || fine.status === selectedStatus;
    const matchesType = selectedType === 'All' || fine.fineType === selectedType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  // Get unique statuses and types
  const statuses = ['All', ...new Set(mockFines.map(fine => fine.status))];
  const types = ['All', ...new Set(mockFines.filter(fine => fine.fineType !== 'None').map(fine => fine.fineType))];

  // Calculate stats
  const totalFines = mockFines.filter(f => f.fineAmount > 0).length;
  const totalAmount = mockFines.reduce((sum, fine) => sum + fine.fineAmount, 0);
  const totalPaid = mockFines.reduce((sum, fine) => sum + fine.paidAmount, 0);
  const totalPending = mockFines.reduce((sum, fine) => sum + fine.remainingAmount, 0);
  const overdueFines = mockFines.filter(f => f.status === 'Overdue').length;
  const pendingFines = mockFines.filter(f => f.status === 'Pending').length;

  // Styles
  const styles = {
    container: {
      padding: '24px',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      backgroundColor: colors.background,
      color: colors.text,
      minHeight: '100vh',
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
      gap: '16px',
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      background: `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0',
    },
    subtitle: {
      fontSize: '16px',
      color: colors.textSecondary,
      marginTop: '8px',
    },
    button: {
      background: `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`,
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      boxShadow: `0 4px 6px ${colors.overlay}`,
    },
    secondaryButton: {
      background: `linear-gradient(135deg, ${colors.secondary}, ${colors.teal})`,
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      boxShadow: `0 4px 6px ${colors.overlay}`,
    },
    dangerButton: {
      background: `linear-gradient(135deg, ${colors.danger}, #b91c1c)`,
      color: 'white',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      boxShadow: `0 4px 6px ${colors.overlay}`,
    },
    outlineButton: {
      padding: '12px 24px',
      border: `2px solid ${colors.warning}`,
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: colors.warning,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: `0 4px 12px ${colors.overlay}`,
      marginBottom: '24px',
      border: `1px solid ${colors.border}`,
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 600,
      color: colors.text,
      margin: '0 0 20px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statsContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '20px',
      marginBottom: '32px',
    },
    statCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: `0 4px 12px ${colors.overlay}`,
      border: `1px solid ${colors.border}`,
      transition: 'transform 0.2s',
    },
    statTitle: {
      fontSize: '14px',
      color: colors.textSecondary,
      margin: '0 0 12px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    statValue: {
      fontSize: '28px',
      fontWeight: 'bold',
      margin: '0',
    },
    searchContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
    },
    searchInput: {
      flex: 1,
      minWidth: '300px',
      padding: '14px 20px',
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '14px',
      backgroundColor: colors.cardBg,
      color: colors.text,
      transition: 'all 0.2s',
    },
    filterContainer: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
    },
    filterButton: {
      padding: '10px 20px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      backgroundColor: colors.cardBg,
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s',
      color: colors.textSecondary,
    },
    activeFilter: {
      background: `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`,
      color: 'white',
      borderColor: colors.warning,
      transform: 'translateY(-2px)',
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '24px',
    },
    fineCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: `0 4px 12px ${colors.overlay}`,
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s',
    },
    fineHeader: {
      padding: '24px',
      position: 'relative',
    },
    fineInfo: {
      padding: '0 24px 24px 24px',
    },
    memberName: {
      fontSize: '20px',
      fontWeight: 600,
      color: colors.text,
      margin: '0 0 4px 0',
    },
    memberId: {
      fontSize: '14px',
      color: colors.textSecondary,
      margin: '0 0 16px 0',
    },
    fineDetails: {
      display: 'grid',
      gap: '12px',
      marginBottom: '20px',
    },
    detailRow: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    detailLabel: {
      fontSize: '13px',
      color: colors.textSecondary,
    },
    detailValue: {
      fontSize: '14px',
      fontWeight: 500,
      color: colors.text,
    },
    badge: {
      display: 'inline-block',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
      letterSpacing: '0.5px',
    },
    overdueBadge: {
      background: `linear-gradient(135deg, ${colors.overdue}, #ea580c)`,
      color: 'white',
    },
    settledBadge: {
      background: `linear-gradient(135deg, ${colors.settled}, #16a34a)`,
      color: 'white',
    },
    partialBadge: {
      background: `linear-gradient(135deg, ${colors.partial}, #ca8a04)`,
      color: 'white',
    },
    pendingBadge: {
      background: `linear-gradient(135deg, ${colors.pending}, #1d4ed8)`,
      color: 'white',
    },
    noFineBadge: {
      background: `linear-gradient(135deg, ${colors.secondary}, ${colors.teal})`,
      color: 'white',
    },
    progressBar: {
      width: '100%',
      height: '8px',
      backgroundColor: colors.border,
      borderRadius: '4px',
      overflow: 'hidden',
    },
    progressFill: (percentage: number, color: string) => ({
      width: `${percentage}%`,
      height: '100%',
      background: `linear-gradient(90deg, ${color}, ${color}dd)`,
      borderRadius: '4px',
    }),
    actionButtons: {
      display: 'flex',
      gap: '8px',
      marginTop: '20px',
    },
    smallButton: {
      flex: 1,
      padding: '10px',
      border: `2px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '12px',
      cursor: 'pointer',
      backgroundColor: colors.cardBg,
      color: colors.text,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '6px',
      transition: 'all 0.2s',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse' as const,
    },
    th: {
      padding: '16px',
      textAlign: 'left' as const,
      borderBottom: `2px solid ${colors.border}`,
      fontSize: '13px',
      fontWeight: 600,
      color: colors.textSecondary,
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
    },
    td: {
      padding: '16px',
      borderBottom: `1px solid ${colors.border}`,
      fontSize: '14px',
      color: colors.text,
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '60px 20px',
      color: colors.textSecondary,
    },
    bulkActions: {
      backgroundColor: darkMode ? '#92400e' : '#fef3c7',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '24px',
      border: `2px solid ${colors.warning}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap' as const,
      gap: '16px',
    },
    paymentInput: {
      width: '100px',
      padding: '8px 12px',
      border: `1px solid ${colors.border}`,
      borderRadius: '6px',
      fontSize: '14px',
      backgroundColor: colors.cardBg,
      color: colors.text,
      margin: '0 8px',
    },
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Overdue': return styles.overdueBadge;
      case 'Settled': return styles.settledBadge;
      case 'Partially Paid': return styles.partialBadge;
      case 'Pending': return styles.pendingBadge;
      case 'No Fine': return styles.noFineBadge;
      default: return {};
    }
  };

  // Get fine type color
  const getTypeColor = (type: string) => {
    switch(type) {
      case 'Late Return': return colors.warning;
      case 'Damage': return colors.danger;
      case 'Lost Book': return colors.overdue;
      case 'None': return colors.textSecondary;
      default: return colors.primary;
    }
  };

  // Toggle fine selection
  const toggleFineSelection = (id: number) => {
    setSelectedFines(prev => 
      prev.includes(id) 
        ? prev.filter(fineId => fineId !== id)
        : [...prev, id]
    );
  };

  // Select all on current page
  const selectAll = () => {
    const pageFineIds = filteredFines.map(fine => fine.id);
    if (selectedFines.length === pageFineIds.length) {
      setSelectedFines([]);
    } else {
      setSelectedFines(pageFineIds);
    }
  };

  // Handle bulk actions
  const handleBulkAction = (action: string) => {
    if (selectedFines.length === 0) {
      alert('Please select fines first');
      return;
    }
    
    switch(action) {
      case 'export':
        alert(`Exporting ${selectedFines.length} fines...`);
        break;
      case 'reminder':
        alert(`Sending reminder for ${selectedFines.length} fines...`);
        break;
      case 'waive':
        const confirm = window.confirm(`Waive selected ${selectedFines.length} fines?`);
        if (confirm) {
          alert(`Waiving ${selectedFines.length} fines...`);
        }
        break;
      case 'process':
        alert(`Processing payments for ${selectedFines.length} fines...`);
        break;
    }
  };

  // Handle payment
  const handlePayment = (id: number) => {
    const amount = paymentAmount[id] || 0;
    if (amount <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    
    const fine = mockFines.find(f => f.id === id);
    if (fine && amount > fine.remainingAmount) {
      alert(`Payment cannot exceed remaining amount of ₹${fine.remainingAmount}`);
      return;
    }
    
    alert(`Processing payment of ₹${amount} for fine #${id}...`);
    setPaymentAmount({...paymentAmount, [id]: 0});
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedStatus('All');
    setSelectedType('All');
    setSelectedFines([]);
    setPaymentAmount({});
  };

  // Calculate payment percentage
  const getPaymentPercentage = (fine: any) => {
    if (fine.fineAmount === 0) return 100;
    return Math.round((fine.paidAmount / fine.fineAmount) * 100);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>💰 Fines Management</h1>
          <p style={styles.subtitle}>
            Track, manage, and collect fines for overdue, damaged, or lost books
            <span style={{ 
              marginLeft: '12px', 
              fontSize: '14px', 
              padding: '4px 12px', 
              background: `linear-gradient(135deg, ${colors.warning}20, ${colors.danger}20)`,
              borderRadius: '20px',
              border: `1px solid ${colors.warning}40`
            }}>
              ₹{totalPending.toLocaleString()} pending
            </span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            style={{
              ...styles.outlineButton,
              borderColor: colors.warning,
              color: colors.warning,
            }}
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <Link 
            href="/fines/settings"
            style={styles.outlineButton}
          >
            ⚙️ Fine Settings
          </Link>
          <Link 
            href="/fines/add"
            style={styles.button}
          >
            ➕ Add Manual Fine
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>📋 Total Fines</p>
          <p style={{ 
            ...styles.statValue,
            background: `linear-gradient(135deg, ${colors.warning}, ${colors.overdue})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            {totalFines}
          </p>
          <div style={{ 
            fontSize: '13px', 
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '8px'
          }}>
            <span>↑ {overdueFines} overdue</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>💰 Total Amount</p>
          <p style={{ 
            ...styles.statValue,
            background: `linear-gradient(135deg, ${colors.danger}, ${colors.overdue})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ₹{totalAmount.toLocaleString()}
          </p>
          <div style={{ 
            fontSize: '13px', 
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '8px'
          }}>
            <span>Avg: ₹{Math.round(totalAmount / totalFines)} per fine</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>✅ Amount Collected</p>
          <p style={{ 
            ...styles.statValue,
            background: `linear-gradient(135deg, ${colors.settled}, ${colors.secondary})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ₹{totalPaid.toLocaleString()}
          </p>
          <div style={{ 
            fontSize: '13px', 
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '8px'
          }}>
            <span>{Math.round((totalPaid / totalAmount) * 100) || 0}% collected</span>
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>⏳ Pending Collection</p>
          <p style={{ 
            ...styles.statValue,
            background: `linear-gradient(135deg, ${colors.overdue}, ${colors.danger})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            ₹{totalPending.toLocaleString()}
          </p>
          <div style={{ 
            fontSize: '13px', 
            color: colors.textSecondary,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginTop: '8px'
          }}>
            <span>From {pendingFines} pending fines</span>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedFines.length > 0 && (
        <div style={styles.bulkActions}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.warning}, ${colors.danger})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}>
              {selectedFines.length}
            </div>
            <div>
              <div style={{ fontWeight: 600, color: colors.text }}>
                {selectedFines.length} fine{selectedFines.length > 1 ? 's' : ''} selected
              </div>
              <div style={{ fontSize: '13px', color: colors.textSecondary }}>
                Total amount: ₹{
                  selectedFines.reduce((sum, id) => {
                    const fine = mockFines.find(f => f.id === id);
                    return sum + (fine?.remainingAmount || 0);
                  }, 0).toLocaleString()
                }
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button 
              onClick={() => handleBulkAction('export')}
              style={styles.secondaryButton}
            >
              📥 Export Selected
            </button>
            <button 
              onClick={() => handleBulkAction('reminder')}
              style={styles.button}
            >
              📧 Send Reminder
            </button>
            <button 
              onClick={() => handleBulkAction('process')}
              style={{
                ...styles.button,
                background: `linear-gradient(135deg, ${colors.settled}, ${colors.secondary})`,
              }}
            >
              💳 Process Payments
            </button>
            <button 
              onClick={() => handleBulkAction('waive')}
              style={styles.dangerButton}
            >
              🎗️ Waive Fines
            </button>
            <button 
              onClick={() => setSelectedFines([])}
              style={styles.outlineButton}
            >
              ✕ Clear
            </button>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={styles.sectionTitle}>
            🔍 Search & Filter Fines
          </h2>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            style={styles.outlineButton}
          >
            {showFilters ? '▲ Hide Filters' : '▼ Show Filters'}
          </button>
        </div>

        {/* Search Bar */}
        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search by member name, email, book title, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button 
            onClick={resetFilters}
            style={styles.outlineButton}
          >
            🔄 Reset Filters
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setViewMode('grid')}
              style={{
                ...styles.filterButton,
                ...(viewMode === 'grid' ? styles.activeFilter : {})
              }}
            >
              📱 Grid
            </button>
            <button 
              onClick={() => setViewMode('list')}
              style={{
                ...styles.filterButton,
                ...(viewMode === 'list' ? styles.activeFilter : {})
              }}
            >
              📋 List
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div style={{ 
            padding: '24px', 
            backgroundColor: darkMode ? '#374151' : '#f9fafb',
            borderRadius: '12px',
            marginTop: '16px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {/* Status Filter */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '12px' }}>
                  Status
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {statuses.map(status => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      style={{
                        ...styles.filterButton,
                        ...(selectedStatus === status ? styles.activeFilter : {}),
                        ...getStatusBadge(status)
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: colors.text, marginBottom: '12px' }}>
                  Fine Type
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      style={{
                        ...styles.filterButton,
                        ...(selectedType === type ? {
                          background: `linear-gradient(135deg, ${getTypeColor(type)}, ${getTypeColor(type)}dd)`,
                          color: 'white',
                          borderColor: getTypeColor(type),
                        } : {})
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Info */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: `1px solid ${colors.border}`
        }}>
          <div style={{ fontSize: '14px', color: colors.textSecondary }}>
            Showing {filteredFines.length} fines
            {selectedStatus !== 'All' && ` • Filtered by: ${selectedStatus}`}
            {selectedType !== 'All' && ` • Type: ${selectedType}`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              checked={selectedFines.length === filteredFines.length && filteredFines.length > 0}
              onChange={selectAll}
              style={{ transform: 'scale(1.2)' }}
            />
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>
              Select all {filteredFines.length} fines
            </span>
          </div>
        </div>
      </div>

      {/* Fines Display */}
      {filteredFines.length === 0 ? (
        <div style={styles.emptyState}>
          <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>💰</div>
          <h3 style={{ fontSize: '24px', color: colors.text, marginBottom: '12px' }}>
            No fines found
          </h3>
          <p style={{ marginBottom: '24px' }}>Try adjusting your search or filters</p>
          <button 
            onClick={resetFilters}
            style={styles.button}
          >
            🔄 Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div style={styles.gridContainer}>
          {filteredFines.map(fine => {
            const paymentPercentage = getPaymentPercentage(fine);
            
            return (
              <div key={fine.id} style={styles.fineCard}>
                {/* Fine Header */}
                <div style={styles.fineHeader}>
                  {/* Selection Checkbox */}
                  <input
                    type="checkbox"
                    checked={selectedFines.includes(fine.id)}
                    onChange={() => toggleFineSelection(fine.id)}
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '16px',
                      transform: 'scale(1.3)',
                    }}
                  />
                  
                  {/* Member Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ 
                      width: '50px', 
                      height: '50px', 
                      borderRadius: '50%',
                      background: `linear-gradient(135deg, ${fine.avatarColor}, ${fine.avatarColor}dd)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '20px',
                    }}>
                      {fine.memberName.charAt(0)}
                    </div>
                    <div>
                      <h3 style={styles.memberName}>{fine.memberName}</h3>
                      <p style={styles.memberId}>ID: {fine.memberId}</p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <span style={{ ...styles.badge, ...getStatusBadge(fine.status) }}>
                    {fine.status}
                  </span>
                  
                  {/* Book Info */}
                  <div style={{ marginTop: '16px', padding: '12px', backgroundColor: darkMode ? '#374151' : '#f9fafb', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 600, fontSize: '14px', color: colors.text }}>
                      📚 {fine.bookTitle}
                    </div>
                    <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                      ID: {fine.bookId} • Type: <span style={{ color: getTypeColor(fine.fineType) }}>{fine.fineType}</span>
                    </div>
                  </div>
                </div>

                {/* Fine Info */}
                <div style={styles.fineInfo}>
                  {/* Details Grid */}
                  <div style={styles.fineDetails}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>📅 Borrowed</span>
                      <span style={styles.detailValue}>{fine.borrowDate}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>📅 Due Date</span>
                      <span style={styles.detailValue}>{fine.dueDate}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>📅 Returned</span>
                      <span style={styles.detailValue}>{fine.returnDate || 'Not returned'}</span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>⏱️ Days Overdue</span>
                      <span style={{ ...styles.detailValue, color: fine.daysOverdue > 0 ? colors.danger : colors.success }}>
                        {fine.daysOverdue} days
                      </span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>💰 Fine/Day</span>
                      <span style={styles.detailValue}>₹{fine.finePerDay}</span>
                    </div>
                  </div>

                  {/* Amount Details */}
                  <div style={{ marginBottom: '20px' }}>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Total Fine</span>
                      <span style={{ ...styles.detailValue, fontSize: '18px', fontWeight: 'bold', color: colors.danger }}>
                        ₹{fine.fineAmount}
                      </span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Paid Amount</span>
                      <span style={{ ...styles.detailValue, color: colors.success }}>
                        ₹{fine.paidAmount}
                      </span>
                    </div>
                    <div style={styles.detailRow}>
                      <span style={styles.detailLabel}>Remaining</span>
                      <span style={{ ...styles.detailValue, color: colors.warning, fontWeight: 'bold' }}>
                        ₹{fine.remainingAmount}
                      </span>
                    </div>
                    
                    {/* Payment Progress */}
                    {fine.fineAmount > 0 && (
                      <div style={{ marginTop: '12px' }}>
                        <div style={styles.progressBar}>
                          <div style={styles.progressFill(
                            paymentPercentage,
                            paymentPercentage === 100 ? colors.success : 
                            paymentPercentage > 50 ? colors.secondary : colors.danger
                          )} />
                        </div>
                        <div style={{ ...styles.detailRow, marginTop: '4px' }}>
                          <span style={styles.detailLabel}>Payment Progress</span>
                          <span style={styles.detailValue}>{paymentPercentage}%</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Payment Input and Action Buttons */}
                  {fine.remainingAmount > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={styles.detailLabel}>Enter Payment:</span>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <span style={{ fontSize: '14px', color: colors.textSecondary }}>₹</span>
                          <input
                            type="number"
                            placeholder="Amount"
                            value={paymentAmount[fine.id] || ''}
                            onChange={(e) => setPaymentAmount({
                              ...paymentAmount,
                              [fine.id]: parseInt(e.target.value) || 0
                            })}
                            min="0"
                            max={fine.remainingAmount}
                            style={styles.paymentInput}
                          />
                          <span style={{ fontSize: '12px', color: colors.textSecondary }}>
                            / ₹{fine.remainingAmount}
                          </span>
                        </div>
                        <button 
                          onClick={() => handlePayment(fine.id)}
                          style={{
                            ...styles.smallButton,
                            background: `linear-gradient(135deg, ${colors.success}, ${colors.secondary})`,
                            color: 'white',
                            border: 'none',
                            padding: '8px 16px',
                          }}
                        >
                          💳 Pay
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div style={styles.actionButtons}>
                    <button style={styles.smallButton}>
                      👁️ View Details
                    </button>
                    <button style={{
                      ...styles.smallButton,
                      borderColor: colors.primary,
                      color: colors.primary,
                    }}>
                      📧 Send Reminder
                    </button>
                    {fine.remainingAmount > 0 && (
                      <button style={{
                        ...styles.smallButton,
                        borderColor: colors.secondary,
                        color: colors.secondary,
                      }}>
                        🎗️ Waive Fine
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div style={{ ...styles.card, padding: '0', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>
                    <input
                      type="checkbox"
                      checked={selectedFines.length === filteredFines.length && filteredFines.length > 0}
                      onChange={selectAll}
                      style={{ marginRight: '8px', transform: 'scale(1.1)' }}
                    />
                    Member
                  </th>
                  <th style={styles.th}>Book Details</th>
                  <th style={styles.th}>Dates</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Amount</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFines.map(fine => (
                  <tr key={fine.id} style={{
                    backgroundColor: selectedFines.includes(fine.id) 
                      ? (darkMode ? '#92400e20' : '#fef3c7') 
                      : 'transparent',
                  }}>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <input
                          type="checkbox"
                          checked={selectedFines.includes(fine.id)}
                          onChange={() => toggleFineSelection(fine.id)}
                          style={{ transform: 'scale(1.1)' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${fine.avatarColor}, ${fine.avatarColor}dd)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontWeight: 'bold',
                          }}>
                            {fine.memberName.charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '15px' }}>{fine.memberName}</div>
                            <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                              {fine.memberId}
                            </div>
                            <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                              {fine.memberEmail}
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{fine.bookTitle}</div>
                      <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                        ID: {fine.bookId}
                      </div>
                      <div style={{ fontSize: '12px', color: getTypeColor(fine.fineType) }}>
                        Type: {fine.fineType}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontSize: '13px' }}>
                        <div>📅 Borrowed: {fine.borrowDate}</div>
                        <div>📅 Due: {fine.dueDate}</div>
                        <div>📅 Returned: {fine.returnDate || 'Not returned'}</div>
                        <div style={{ color: fine.daysOverdue > 0 ? colors.danger : colors.success }}>
                          ⏱️ {fine.daysOverdue} days overdue
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ ...styles.badge, ...getStatusBadge(fine.status), fontSize: '11px' }}>
                        {fine.status}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div>
                        <div style={{ fontWeight: 600, color: colors.danger, marginBottom: '2px' }}>
                          ₹{fine.fineAmount}
                        </div>
                        <div style={{ fontSize: '12px', color: colors.success }}>
                          Paid: ₹{fine.paidAmount}
                        </div>
                        {fine.remainingAmount > 0 && (
                          <div style={{ fontSize: '12px', color: colors.warning, fontWeight: 500 }}>
                            Due: ₹{fine.remainingAmount}
                          </div>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {fine.remainingAmount > 0 ? (
                          <>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{
                                ...styles.smallButton,
                                padding: '6px 12px',
                                fontSize: '12px',
                                borderColor: colors.success,
                                color: colors.success,
                              }}>
                                💳 Pay
                              </button>
                              <button style={{
                                ...styles.smallButton,
                                padding: '6px 12px',
                                fontSize: '12px',
                              }}>
                                👁️
                              </button>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <button style={{
                                ...styles.smallButton,
                                padding: '6px 12px',
                                fontSize: '12px',
                                borderColor: colors.primary,
                                color: colors.primary,
                              }}>
                                📧
                              </button>
                              <button style={{
                                ...styles.smallButton,
                                padding: '6px 12px',
                                fontSize: '12px',
                                borderColor: colors.secondary,
                                color: colors.secondary,
                              }}>
                                🎗️
                              </button>
                            </div>
                          </>
                        ) : (
                          <button style={{
                            ...styles.smallButton,
                            padding: '6px 12px',
                            fontSize: '12px',
                          }}>
                            👁️ View Details
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        paddingTop: '24px',
        borderTop: `2px solid ${colors.border}`,
        color: colors.textSecondary,
        fontSize: '14px',
        textAlign: 'center',
        opacity: 0.8,
      }}>
        <p style={{ margin: '0 0 8px 0' }}>
          💰 Fines Management System • ₹{totalPending.toLocaleString()} pending collection • Last updated: Today
        </p>
        <p style={{ margin: 0 }}>
          Fine rate: ₹50/day • Max fine: ₹500 • <Link href="/fines/settings" style={{ 
            color: colors.warning, 
            textDecoration: 'none',
            fontWeight: 500,
          }}>Update Settings</Link>
        </p>
      </div>
    </div>
  );
}


