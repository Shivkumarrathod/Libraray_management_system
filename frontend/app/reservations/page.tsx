// app/reservations/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReservationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReservations, setSelectedReservations] = useState<number[]>([]);

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
    background: '#111827',
    cardBg: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    overlay: '#00000040',
    success: '#10b981',
    pending: '#f59e0b',
    ready: '#3b82f6',
    cancelled: '#ef4444',
    completed: '#10b981',
  } : {
    primary: '#2563eb',
    secondary: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
    purple: '#7c3aed',
    background: '#f9fafb',
    cardBg: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    overlay: '#00000020',
    success: '#059669',
    pending: '#d97706',
    ready: '#2563eb',
    cancelled: '#dc2626',
    completed: '#059669',
  };

  // Mock reservations data
  const mockReservations = [
    {
      id: 1,
      memberName: 'John Doe',
      memberId: 'MEM2024001',
      bookTitle: 'The Great Gatsby',
      bookId: 'BK001234',
      isbn: '978-0743273565',
      reservationDate: '2024-01-20',
      pickupDate: '2024-01-25',
      expiryDate: '2024-01-27',
      status: 'Ready for Pickup',
      queuePosition: 1,
      estimatedWait: 'Today',
      notes: 'Member requested first edition',
    },
    {
      id: 2,
      memberName: 'Jane Smith',
      memberId: 'MEM2024002',
      bookTitle: 'To Kill a Mockingbird',
      bookId: 'BK001235',
      isbn: '978-0061120084',
      reservationDate: '2024-01-22',
      pickupDate: null,
      expiryDate: '2024-01-29',
      status: 'Pending',
      queuePosition: 3,
      estimatedWait: '3 days',
      notes: '',
    },
    {
      id: 3,
      memberName: 'Alice Brown',
      memberId: 'MEM2024004',
      bookTitle: '1984',
      bookId: 'BK001236',
      isbn: '978-0451524935',
      reservationDate: '2024-01-18',
      pickupDate: '2024-01-24',
      expiryDate: '2024-01-26',
      status: 'Completed',
      queuePosition: 0,
      estimatedWait: 'Completed',
      notes: 'Picked up on time',
    },
    {
      id: 4,
      memberName: 'Charlie Wilson',
      memberId: 'MEM2024005',
      bookTitle: 'The Hobbit',
      bookId: 'BK001237',
      isbn: '978-0547928227',
      reservationDate: '2024-01-23',
      pickupDate: null,
      expiryDate: '2024-01-30',
      status: 'Pending',
      queuePosition: 5,
      estimatedWait: '1 week',
      notes: 'Special illustrated edition',
    },
    {
      id: 5,
      memberName: 'Emma Wilson',
      memberId: 'MEM2024007',
      bookTitle: 'The Catcher in the Rye',
      bookId: 'BK001239',
      isbn: '978-0316769488',
      reservationDate: '2024-01-21',
      pickupDate: null,
      expiryDate: '2024-01-28',
      status: 'Cancelled',
      queuePosition: 0,
      estimatedWait: 'Cancelled',
      notes: 'Member cancelled reservation',
    },
    {
      id: 6,
      memberName: 'Frank Harris',
      memberId: 'MEM2024008',
      bookTitle: 'Brave New World',
      bookId: 'BK001240',
      isbn: '978-0060850524',
      reservationDate: '2024-01-19',
      pickupDate: '2024-01-26',
      expiryDate: '2024-01-28',
      status: 'Ready for Pickup',
      queuePosition: 2,
      estimatedWait: 'Today',
      notes: '',
    },
    {
      id: 7,
      memberName: 'Bob Johnson',
      memberId: 'MEM2024003',
      bookTitle: 'Moby Dick',
      bookId: 'BK001241',
      isbn: '978-1503280786',
      reservationDate: '2024-01-24',
      pickupDate: null,
      expiryDate: '2024-01-31',
      status: 'Pending',
      queuePosition: 8,
      estimatedWait: '2 weeks',
      notes: 'Reserved for book club',
    },
  ];

  // Filter reservations
  const filteredReservations = mockReservations.filter(reservation => {
    const matchesSearch = 
      reservation.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.memberId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.isbn.includes(searchQuery);
    
    const matchesStatus = selectedStatus === 'All' || reservation.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get unique statuses
  const statuses = ['All', ...new Set(mockReservations.map(r => r.status))];

  // Calculate stats
  const totalReservations = mockReservations.length;
  const pendingReservations = mockReservations.filter(r => r.status === 'Pending').length;
  const readyReservations = mockReservations.filter(r => r.status === 'Ready for Pickup').length;
  const completedReservations = mockReservations.filter(r => r.status === 'Completed').length;

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
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
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
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
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
    },
    outlineButton: {
      padding: '12px 24px',
      border: `2px solid ${colors.primary}`,
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: colors.primary,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    card: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '24px',
      boxShadow: `0 4px 6px ${colors.overlay}`,
      marginBottom: '24px',
      border: `1px solid ${colors.border}`,
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
      boxShadow: `0 4px 6px ${colors.overlay}`,
      border: `1px solid ${colors.border}`,
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
      padding: '12px 16px',
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      fontSize: '14px',
      backgroundColor: colors.cardBg,
      color: colors.text,
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
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      color: 'white',
      borderColor: colors.primary,
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
    badge: {
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: 600,
    },
    smallButton: {
      padding: '6px 12px',
      border: `2px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '12px',
      cursor: 'pointer',
      backgroundColor: colors.cardBg,
      color: colors.text,
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      transition: 'all 0.2s',
    },
  };

  // Get status badge style
  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Ready for Pickup': return { background: colors.ready, color: 'white' };
      case 'Pending': return { background: colors.pending, color: 'white' };
      case 'Completed': return { background: colors.completed, color: 'white' };
      case 'Cancelled': return { background: colors.cancelled, color: 'white' };
      default: return { background: colors.textSecondary, color: 'white' };
    }
  };

  // Toggle selection
  const toggleReservationSelection = (id: number) => {
    setSelectedReservations(prev => 
      prev.includes(id) 
        ? prev.filter(reservationId => reservationId !== id)
        : [...prev, id]
    );
  };

  // Select all
  const selectAll = () => {
    const pageReservationIds = filteredReservations.map(r => r.id);
    if (selectedReservations.length === pageReservationIds.length) {
      setSelectedReservations([]);
    } else {
      setSelectedReservations(pageReservationIds);
    }
  };

  // Handle actions
  const handleAction = (action: string, id: number) => {
    const reservation = mockReservations.find(r => r.id === id);
    
    switch(action) {
      case 'markReady':
        alert(`Marking ${reservation?.bookTitle} as ready for ${reservation?.memberName}`);
        break;
      case 'markComplete':
        alert(`Marking ${reservation?.bookTitle} as completed for ${reservation?.memberName}`);
        break;
      case 'cancel':
        const confirmCancel = window.confirm(`Cancel reservation for ${reservation?.bookTitle}?`);
        if (confirmCancel) {
          alert(`Cancelled reservation for ${reservation?.memberName}`);
        }
        break;
      case 'notify':
        alert(`Notifying ${reservation?.memberName} about reservation status`);
        break;
    }
  };

  // Handle bulk action
  const handleBulkAction = (action: string) => {
    if (selectedReservations.length === 0) {
      alert('Please select reservations first');
      return;
    }
    
    switch(action) {
      case 'notify':
        alert(`Notifying ${selectedReservations.length} members`);
        break;
      case 'cancel':
        const confirm = window.confirm(`Cancel ${selectedReservations.length} reservations?`);
        if (confirm) {
          alert(`Cancelled ${selectedReservations.length} reservations`);
        }
        break;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📚 Reservations</h1>
          <p style={styles.subtitle}>
            Manage book reservations and pickup requests
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
            href="/reservations/new"
            style={styles.button}
          >
            ➕ New Reservation
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>📋 Total Reservations</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.primary,
          }}>
            {totalReservations}
          </p>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>⏳ Pending</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.pending,
          }}>
            {pendingReservations}
          </p>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
            Waiting for availability
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>✅ Ready for Pickup</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.ready,
          }}>
            {readyReservations}
          </p>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
            Books available
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>🎯 Completed</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.completed,
          }}>
            {completedReservations}
          </p>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
            Successfully picked up
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={styles.card}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by member name, book title, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            style={styles.outlineButton}
          >
            {showFilters ? '▲ Hide' : '▼ Filters'}
          </button>
        </div>

        {showFilters && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(status)}
                  style={{
                    ...styles.filterButton,
                    ...(selectedStatus === status ? styles.activeFilter : {})
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bulk Actions */}
        {selectedReservations.length > 0 && (
          <div style={{ 
            backgroundColor: darkMode ? '#1e3a8a' : '#dbeafe',
            padding: '16px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: `2px solid ${colors.primary}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: '50%',
                background: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 'bold',
              }}>
                {selectedReservations.length}
              </div>
              <div>
                <div style={{ fontWeight: 600 }}>
                  {selectedReservations.length} reservation{selectedReservations.length > 1 ? 's' : ''} selected
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => handleBulkAction('notify')}
                style={{
                  ...styles.smallButton,
                  background: colors.primary,
                  color: 'white',
                  border: 'none',
                }}
              >
                📧 Notify All
              </button>
              <button 
                onClick={() => handleBulkAction('cancel')}
                style={{
                  ...styles.smallButton,
                  background: colors.danger,
                  color: 'white',
                  border: 'none',
                }}
              >
                ❌ Cancel All
              </button>
              <button 
                onClick={() => setSelectedReservations([])}
                style={styles.smallButton}
              >
                ✕ Clear
              </button>
            </div>
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '20px',
        }}>
          <div style={{ fontSize: '14px', color: colors.textSecondary }}>
            Showing {filteredReservations.length} reservations
            {selectedStatus !== 'All' && ` • Filtered by: ${selectedStatus}`}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="checkbox"
              checked={selectedReservations.length === filteredReservations.length && filteredReservations.length > 0}
              onChange={selectAll}
              style={{ transform: 'scale(1.1)' }}
            />
            <span style={{ fontSize: '13px', color: colors.textSecondary }}>
              Select all {filteredReservations.length}
            </span>
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div style={styles.card}>
        <div style={{ overflowX: 'auto' }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>
                  <input
                    type="checkbox"
                    checked={selectedReservations.length === filteredReservations.length && filteredReservations.length > 0}
                    onChange={selectAll}
                    style={{ marginRight: '8px' }}
                  />
                  Member
                </th>
                <th style={styles.th}>Book Details</th>
                <th style={styles.th}>Dates</th>
                <th style={styles.th}>Queue</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.map(reservation => (
                <tr key={reservation.id}>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={selectedReservations.includes(reservation.id)}
                        onChange={() => toggleReservationSelection(reservation.id)}
                      />
                      <div>
                        <div style={{ fontWeight: 600 }}>{reservation.memberName}</div>
                        <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                          {reservation.memberId}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontWeight: 600 }}>{reservation.bookTitle}</div>
                    <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                      ISBN: {reservation.isbn}
                    </div>
                    {reservation.notes && (
                      <div style={{ fontSize: '12px', color: colors.warning, marginTop: '4px' }}>
                        📝 {reservation.notes}
                      </div>
                    )}
                  </td>
                  <td style={styles.td}>
                    <div style={{ fontSize: '13px' }}>
                      <div>Reserved: {reservation.reservationDate}</div>
                      <div>Pickup by: {reservation.expiryDate}</div>
                      {reservation.pickupDate && (
                        <div style={{ color: colors.success }}>
                          ✅ Picked up: {reservation.pickupDate}
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={styles.td}>
                    {reservation.queuePosition > 0 ? (
                      <div>
                        <div style={{ fontWeight: 600, color: colors.primary }}>
                          Position #{reservation.queuePosition}
                        </div>
                        <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                          Wait: {reservation.estimatedWait}
                        </div>
                      </div>
                    ) : (
                      <div style={{ color: colors.textSecondary, fontSize: '13px' }}>
                        {reservation.estimatedWait}
                      </div>
                    )}
                  </td>
                  <td style={styles.td}>
                    <span style={{ ...styles.badge, ...getStatusStyle(reservation.status) }}>
                      {reservation.status}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {reservation.status === 'Pending' && (
                        <button 
                          onClick={() => handleAction('markReady', reservation.id)}
                          style={{
                            ...styles.smallButton,
                            borderColor: colors.success,
                            color: colors.success,
                          }}
                        >
                          ✅ Mark Ready
                        </button>
                      )}
                      {reservation.status === 'Ready for Pickup' && (
                        <button 
                          onClick={() => handleAction('markComplete', reservation.id)}
                          style={{
                            ...styles.smallButton,
                            borderColor: colors.success,
                            color: colors.success,
                          }}
                        >
                          ✅ Pickup Done
                        </button>
                      )}
                      {(reservation.status === 'Pending' || reservation.status === 'Ready for Pickup') && (
                        <button 
                          onClick={() => handleAction('cancel', reservation.id)}
                          style={{
                            ...styles.smallButton,
                            borderColor: colors.danger,
                            color: colors.danger,
                          }}
                        >
                          ❌ Cancel
                        </button>
                      )}
                      <button 
                        onClick={() => handleAction('notify', reservation.id)}
                        style={styles.smallButton}
                      >
                        📧 Notify
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredReservations.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: colors.textSecondary }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>No reservations found</div>
            <div>Try adjusting your search or filters</div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        marginTop: '40px',
        paddingTop: '24px',
        borderTop: `1px solid ${colors.border}`,
        color: colors.textSecondary,
        fontSize: '14px',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0' }}>
          📚 Reservation System • Hold duration: 3 days • Auto-cancel after: 7 days
        </p>
      </div>
    </div>
  );
}