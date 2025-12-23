// app/search/page.tsx
"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { searchAPI } from '@/lib/api';

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any>({
    books: [],
    members: [],
    ebooks: [],
    reservations: [],
    total: 0
  });
  const [isSearching, setIsSearching] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchType, setSearchType] = useState<'all' | 'books' | 'members' | 'ebooks' | 'reservations'>('all');
  const [recentSearches, setRecentSearches] = useState([
    { term: 'fiction', type: 'books', count: 24 },
    { term: 'science', type: 'books', count: 18 },
    { term: 'john', type: 'members', count: 3 },
    { term: '2024', type: 'all', count: 45 },
    { term: 'pdf', type: 'ebooks', count: 12 }
  ]);
  const [popularSearches, setPopularSearches] = useState([
    { term: 'harry potter', count: 156 },
    { term: 'stephen king', count: 89 },
    { term: 'sci-fi', count: 67 },
    { term: 'biography', count: 54 },
    { term: 'romance', count: 43 }
  ]);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: 'any',
    year: 'any',
    category: 'any'
  });
  const searchInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  // Focus search input on mount
  useEffect(() => {
    // Auth Check
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    if (!token) {
      router.push('/login');
      return;
    }
    searchInputRef.current?.focus();
  }, [router]);

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
    background: '#111827',
    cardBg: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#d1d5db',
    border: '#374151',
    overlay: '#00000040',
    success: '#10b981',
    book: '#3b82f6',
    member: '#10b981',
    ebook: '#8b5cf6',
    reservation: '#f59e0b'
  } : {
    primary: '#2563eb',
    secondary: '#059669',
    danger: '#dc2626',
    warning: '#d97706',
    purple: '#7c3aed',
    pink: '#db2777',
    teal: '#0d9488',
    orange: '#ea580c',
    background: '#f9fafb',
    cardBg: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
    border: '#e5e7eb',
    overlay: '#00000020',
    success: '#059669',
    book: '#2563eb',
    member: '#059669',
    ebook: '#7c3aed',
    reservation: '#d97706'
  };

  // Mock data for search
  const mockData = {
    books: [
      { id: 1, type: 'book', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Classic Fiction', year: 1925, isbn: '978-0743273565', status: 'Available', copies: 5, location: 'Fiction Section A', rating: 4.7 },
      { id: 2, type: 'book', title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic Fiction', year: 1960, isbn: '978-0061120084', status: 'Borrowed', copies: 3, location: 'Fiction Section A', rating: 4.8 },
      { id: 3, type: 'book', title: '1984', author: 'George Orwell', category: 'Dystopian Fiction', year: 1949, isbn: '978-0451524935', status: 'Available', copies: 4, location: 'Fiction Section B', rating: 4.6 },
      { id: 4, type: 'book', title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy', year: 1937, isbn: '978-0547928227', status: 'Available', copies: 2, location: 'Fantasy Section', rating: 4.9 },
    ],
    members: [
      { id: 1, type: 'member', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234-567-8901', status: 'Active', membershipId: 'MEM2024001', plan: 'Premium', joinDate: '2024-01-15', borrowed: 2 },
      { id: 2, type: 'member', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1 234-567-8902', status: 'Active', membershipId: 'MEM2024002', plan: 'Standard', joinDate: '2024-01-10', borrowed: 1 },
      { id: 3, type: 'member', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '+1 234-567-8903', status: 'Active', membershipId: 'MEM2024003', plan: 'Premium', joinDate: '2024-01-20', borrowed: 3 },
    ],
    ebooks: [
      { id: 1, type: 'ebook', title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Classic Romance', format: 'PDF', size: '2.1 MB', downloads: 1890, available: true, rating: 4.5, pages: 279 },
      { id: 2, type: 'ebook', title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Coming-of-Age', format: 'EPUB', size: '1.9 MB', downloads: 1760, available: true, rating: 4.3, pages: 214 },
      { id: 3, type: 'ebook', title: 'Brave New World', author: 'Aldous Huxley', category: 'Dystopian', format: 'EPUB', size: '2.7 MB', downloads: 1540, available: true, rating: 4.4, pages: 268 },
    ],
    reservations: [
      { id: 1, type: 'reservation', member: 'Alice Johnson', memberId: 'MEM2024003', book: '1984', bookId: 'BK003', status: 'Pending', date: '2024-01-25', pickupBy: '2024-01-28', queue: 2 },
      { id: 2, type: 'reservation', member: 'John Doe', memberId: 'MEM2024001', book: 'The Hobbit', bookId: 'BK004', status: 'Ready', date: '2024-01-24', pickupBy: '2024-01-27', queue: 1 },
    ]
  };

  // Perform search
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults({ books: [], members: [], ebooks: [], reservations: [], total: 0 });
      return;
    }

    setIsSearching(true);

    try {
      const data = await searchAPI.semanticSearch(query);

      // Map API data to UI format
      const mappedBooks = data.books.map((book: any) => ({
        id: book.id,
        type: 'book',
        title: book.title,
        author: book.author,
        category: book.category,
        year: book.publication_year,
        isbn: book.isbn,
        status: book.available_copies > 0 ? 'Available' : 'Borrowed',
        copies: book.total_copies,
        location: 'Main Hall',
        rating: 4.5
      }));

      setSearchResults({
        books: mappedBooks,
        members: [], // Placeholder as we don't have member search yet
        ebooks: [],
        reservations: [],
        total: mappedBooks.length
      });

      // Add to recent searches
      if (!recentSearches.some(s => s.term === query.toLowerCase())) {
        setRecentSearches(prev => [{ term: query.toLowerCase(), type: searchType, count: mappedBooks.length }, ...prev.slice(0, 4)]);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
    if (e.key === 'Escape') {
      clearSearch();
    }
  };

  // Handle recent search click
  const handleRecentSearch = (term: string) => {
    setSearchQuery(term);
    performSearch(term);
  };

  // Handle popular search click
  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    setSearchType('all');
    performSearch(term);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({ books: [], members: [], ebooks: [], reservations: [], total: 0 });
    setFilters({ status: 'any', year: 'any', category: 'any' });
    searchInputRef.current?.focus();
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({ status: 'any', year: 'any', category: 'any' });
    if (searchQuery) performSearch(searchQuery);
  };

  // Get type color
  const getTypeColor = (type: string) => {
    return colors[type as keyof typeof colors] || colors.primary;
  };

  // Get type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'book': return '📚';
      case 'member': return '👤';
      case 'ebook': return '📱';
      case 'reservation': return '📅';
      default: return '🔍';
    }
  };

  // Get view link
  const getViewLink = (type: string, id: number) => {
    switch (type) {
      case 'book': return `/books/${id}`;
      case 'member': return `/members/${id}`;
      case 'ebook': return `/ebooks/${id}`;
      case 'reservation': return `/reservations/${id}`;
      default: return '#';
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'available':
      case 'active':
      case 'ready':
        return colors.success;
      case 'borrowed':
      case 'pending':
        return colors.warning;
      default:
        return colors.danger;
    }
  };

  // Get unique categories from data
  const getCategories = () => {
    const categories = new Set<string>();
    mockData.books.forEach(book => categories.add(book.category));
    mockData.ebooks.forEach(ebook => categories.add(ebook.category));
    return Array.from(categories);
  };

  // Get unique years from data
  const getYears = () => {
    const years = new Set<string>();
    mockData.books.forEach(book => years.add(book.year.toString()));
    return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
  };

  // Get unique statuses from data
  const getStatuses = () => {
    const statuses = new Set<string>();
    mockData.books.forEach(book => statuses.add(book.status));
    mockData.members.forEach(member => statuses.add(member.status));
    mockData.reservations.forEach(res => statuses.add(res.status));
    return Array.from(statuses);
  };

  // Styles
  const styles = {
    container: {
      padding: '20px',
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
      gap: '20px',
    },
    titleSection: {
      flex: 1,
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
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
    stats: {
      display: 'flex',
      gap: '20px',
      backgroundColor: colors.cardBg,
      padding: '16px 24px',
      borderRadius: '16px',
      border: `1px solid ${colors.border}`,
      minWidth: '300px',
    },
    statItem: {
      textAlign: 'center' as const,
    },
    statValue: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: colors.primary,
      margin: '0 0 4px 0',
    },
    statLabel: {
      fontSize: '0.875rem',
      color: colors.textSecondary,
      margin: '0',
    },
    searchSection: {
      backgroundColor: colors.cardBg,
      borderRadius: '20px',
      padding: '40px',
      boxShadow: `0 8px 30px ${colors.overlay}`,
      marginBottom: '40px',
      border: `1px solid ${colors.border}`,
      position: 'relative' as const,
      overflow: 'hidden',
    },
    searchBackground: {
      position: 'absolute' as const,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: `linear-gradient(135deg, ${colors.primary}15, ${colors.purple}15)`,
      opacity: 0.3,
    },
    searchBox: {
      position: 'relative' as const,
      maxWidth: '800px',
      margin: '0 auto 24px',
    },
    searchInput: {
      width: '100%',
      padding: '20px 70px 20px 70px',
      border: `2px solid ${colors.border}`,
      borderRadius: '16px',
      fontSize: '1.125rem',
      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
      color: colors.text,
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 12px ${colors.overlay}`,
    },
    searchIcon: {
      position: 'absolute' as const,
      left: '24px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '1.5rem',
      color: colors.primary,
    },
    clearButton: {
      position: 'absolute' as const,
      right: '130px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      fontSize: '1.25rem',
      color: colors.textSecondary,
      cursor: 'pointer',
      padding: '8px',
      opacity: searchQuery ? 1 : 0,
      transition: 'opacity 0.2s',
    },
    searchButton: {
      position: 'absolute' as const,
      right: '8px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      color: 'white',
      padding: '14px 32px',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 12px ${colors.primary}40`,
    },
    typeSelector: {
      display: 'flex',
      justifyContent: 'center',
      gap: '12px',
      marginBottom: '24px',
      flexWrap: 'wrap' as const,
    },
    typeButton: {
      padding: '12px 24px',
      border: `2px solid ${colors.border}`,
      borderRadius: '12px',
      backgroundColor: colors.cardBg,
      fontSize: '0.9375rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      color: colors.textSecondary,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    activeType: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      color: 'white',
      borderColor: colors.primary,
      transform: 'translateY(-2px)',
      boxShadow: `0 4px 12px ${colors.primary}30`,
    },
    filterButton: {
      padding: '10px 20px',
      border: `2px solid ${colors.warning}`,
      borderRadius: '10px',
      backgroundColor: 'transparent',
      fontSize: '0.9375rem',
      fontWeight: 500,
      cursor: 'pointer',
      color: colors.warning,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
    },
    filtersPanel: {
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      borderRadius: '12px',
      padding: '24px',
      marginTop: '24px',
      border: `1px solid ${colors.border}`,
    },
    filterGroup: {
      marginBottom: '20px',
    },
    filterLabel: {
      fontSize: '0.875rem',
      fontWeight: 600,
      color: colors.text,
      marginBottom: '12px',
      display: 'block',
    },
    filterOptions: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap' as const,
    },
    filterOption: {
      padding: '8px 16px',
      border: `1px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '0.875rem',
      backgroundColor: colors.cardBg,
      color: colors.textSecondary,
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    activeFilter: {
      backgroundColor: colors.primary,
      color: 'white',
      borderColor: colors.primary,
    },
    trendingSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    trendingCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${colors.border}`,
    },
    cardTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0 0 20px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    },
    trendingList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '12px',
    },
    trendingItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'all 0.2s',
    },
    trendingTerm: {
      fontSize: '0.9375rem',
      color: colors.text,
      fontWeight: 500,
    },
    trendingCount: {
      fontSize: '0.8125rem',
      color: colors.textSecondary,
      backgroundColor: darkMode ? '#4b5563' : '#e5e7eb',
      padding: '4px 10px',
      borderRadius: '12px',
    },
    resultsContainer: {
      backgroundColor: colors.cardBg,
      borderRadius: '20px',
      padding: '32px',
      boxShadow: `0 8px 30px ${colors.overlay}`,
      border: `1px solid ${colors.border}`,
      marginBottom: '40px',
    },
    resultsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
      gap: '16px',
    },
    resultsTitle: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: colors.text,
      margin: 0,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    resultsCount: {
      fontSize: '0.9375rem',
      color: colors.textSecondary,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    resultTypeSection: {
      marginBottom: '32px',
    },
    typeHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '20px',
    },
    typeIcon: {
      fontSize: '1.5rem',
    },
    typeTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: colors.text,
      margin: 0,
    },
    typeCount: {
      fontSize: '0.9375rem',
      color: colors.textSecondary,
      backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
      padding: '4px 12px',
      borderRadius: '12px',
    },
    resultGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
      gap: '20px',
    },
    resultCard: {
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      borderRadius: '14px',
      padding: '20px',
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none',
      display: 'block',
      color: 'inherit',
    },
    resultCardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
    },
    resultCardTitle: {
      fontSize: '1.125rem',
      fontWeight: 700,
      color: colors.text,
      margin: '0 0 6px 0',
      lineHeight: 1.3,
    },
    resultCardSubtitle: {
      fontSize: '0.9375rem',
      color: colors.textSecondary,
      margin: 0,
      lineHeight: 1.4,
    },
    resultCardMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '16px',
      flexWrap: 'wrap' as const,
    },
    metaTag: {
      fontSize: '0.8125rem',
      padding: '4px 10px',
      borderRadius: '8px',
      fontWeight: 500,
    },
    resultCardFooter: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '16px',
      borderTop: `1px solid ${colors.border}`,
    },
    statusBadge: {
      fontSize: '0.8125rem',
      padding: '4px 12px',
      borderRadius: '12px',
      fontWeight: 600,
    },
    viewButton: {
      padding: '8px 16px',
      backgroundColor: 'transparent',
      border: `2px solid ${colors.border}`,
      borderRadius: '8px',
      fontSize: '0.8125rem',
      fontWeight: 500,
      color: colors.text,
      cursor: 'pointer',
      transition: 'all 0.2s',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
    },
    emptyState: {
      textAlign: 'center' as const,
      padding: '80px 20px',
      color: colors.textSecondary,
    },
    emptyIcon: {
      fontSize: '4rem',
      marginBottom: '24px',
      opacity: 0.5,
    },
    emptyTitle: {
      fontSize: '1.5rem',
      color: colors.text,
      margin: '0 0 12px 0',
    },
    emptyText: {
      fontSize: '1rem',
      margin: '0 0 32px 0',
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
      lineHeight: 1.6,
    },
    loadingSpinner: {
      textAlign: 'center' as const,
      padding: '80px 20px',
    },
    spinner: {
      fontSize: '3rem',
      marginBottom: '24px',
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
    quickActions: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap' as const,
      marginBottom: '24px',
    },
    actionButton: {
      padding: '12px 24px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      backgroundColor: colors.cardBg,
      fontSize: '0.9375rem',
      fontWeight: 500,
      color: colors.text,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      transition: 'all 0.2s',
      textDecoration: 'none',
    },
    footer: {
      marginTop: '60px',
      paddingTop: '32px',
      borderTop: `1px solid ${colors.border}`,
      color: colors.textSecondary,
      fontSize: '0.875rem',
      textAlign: 'center' as const,
    },
    keyboardHints: {
      display: 'flex',
      justifyContent: 'center',
      gap: '24px',
      marginTop: '16px',
      flexWrap: 'wrap' as const,
    },
    keyboardHint: {
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
    },
  };

  // Add CSS for spinner animation
  const spinnerStyle = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;

  return (
    <>
      <style>{spinnerStyle}</style>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>🔍 Advanced Library Search</h1>
            <p style={styles.subtitle}>
              Search across 10,000+ books, 500+ members, and digital collections instantly
            </p>
          </div>
          <div style={styles.stats}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>10K+</div>
              <div style={styles.statLabel}>Books</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>500+</div>
              <div style={styles.statLabel}>Members</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>2K+</div>
              <div style={styles.statLabel}>E-Books</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div style={styles.searchSection}>
          <div style={styles.searchBackground}></div>

          <form onSubmit={handleSearch}>
            <div style={styles.searchBox}>
              <div style={styles.searchIcon}>🔍</div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="What are you looking for? Try book titles, author names, member IDs, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyPress}
                style={styles.searchInput}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={clearSearch}
                  style={styles.clearButton}
                  title="Clear search"
                >
                  ✕
                </button>
              )}
              <button type="submit" style={styles.searchButton}>
                Search
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>⏎</span>
              </button>
            </div>
          </form>

          {/* Search Type Selector */}
          <div style={styles.typeSelector}>
            {(['all', 'books', 'members', 'ebooks', 'reservations'] as const).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setSearchType(type);
                  if (searchQuery) performSearch(searchQuery);
                }}
                style={{
                  ...styles.typeButton,
                  ...(searchType === type ? styles.activeType : {})
                }}
              >
                {type === 'all' && '🌐 All Categories'}
                {type === 'books' && '📚 Physical Books'}
                {type === 'members' && '👤 Library Members'}
                {type === 'ebooks' && '📱 Digital E-Books'}
                {type === 'reservations' && '📅 Book Reservations'}
              </button>
            ))}
          </div>

          {/* Filter Toggle */}
          <div style={{ textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              style={styles.filterButton}
            >
              {showFilters ? '▲ Hide Filters' : '▼ Advanced Filters'}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div style={styles.filtersPanel}>
              <div style={styles.quickActions}>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={styles.actionButton}
                >
                  🔄 Reset All Filters
                </button>
                <Link href="/books" style={styles.actionButton}>
                  📚 Browse All Books
                </Link>
                <Link href="/members" style={styles.actionButton}>
                  👤 View All Members
                </Link>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Status</label>
                  <div style={styles.filterOptions}>
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, status: 'any' })}
                      style={{
                        ...styles.filterOption,
                        ...(filters.status === 'any' ? styles.activeFilter : {})
                      }}
                    >
                      Any Status
                    </button>
                    {getStatuses().map(status => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFilters({ ...filters, status })}
                        style={{
                          ...styles.filterOption,
                          ...(filters.status === status ? {
                            ...styles.activeFilter,
                            backgroundColor: getStatusColor(status),
                            borderColor: getStatusColor(status),
                          } : {})
                        }}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Publication Year</label>
                  <div style={styles.filterOptions}>
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, year: 'any' })}
                      style={{
                        ...styles.filterOption,
                        ...(filters.year === 'any' ? styles.activeFilter : {})
                      }}
                    >
                      Any Year
                    </button>
                    {getYears().slice(0, 5).map(year => (
                      <button
                        key={year}
                        type="button"
                        onClick={() => setFilters({ ...filters, year })}
                        style={{
                          ...styles.filterOption,
                          ...(filters.year === year ? styles.activeFilter : {})
                        }}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={styles.filterGroup}>
                  <label style={styles.filterLabel}>Category</label>
                  <div style={styles.filterOptions}>
                    <button
                      type="button"
                      onClick={() => setFilters({ ...filters, category: 'any' })}
                      style={{
                        ...styles.filterOption,
                        ...(filters.category === 'any' ? styles.activeFilter : {})
                      }}
                    >
                      Any Category
                    </button>
                    {getCategories().slice(0, 4).map(category => (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setFilters({ ...filters, category })}
                        style={{
                          ...styles.filterOption,
                          ...(filters.category === category ? styles.activeFilter : {})
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trending Searches */}
        {!searchQuery && searchResults.total === 0 && (
          <div style={styles.trendingSection}>
            <div style={styles.trendingCard}>
              <h3 style={styles.cardTitle}>
                🔥 Trending Searches
                <span style={{ fontSize: '0.875rem', color: colors.textSecondary, fontWeight: 'normal' }}>
                  • This Week
                </span>
              </h3>
              <div style={styles.trendingList}>
                {popularSearches.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handlePopularSearch(item.term)}
                    style={styles.trendingItem}
                  >
                    <span style={styles.trendingTerm}>{item.term}</span>
                    <span style={styles.trendingCount}>{item.count} searches</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.trendingCard}>
              <h3 style={styles.cardTitle}>
                ⏰ Recent Searches
                <span style={{ fontSize: '0.875rem', color: colors.textSecondary, fontWeight: 'normal' }}>
                  • Your Activity
                </span>
              </h3>
              <div style={styles.trendingList}>
                {recentSearches.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => handleRecentSearch(item.term)}
                    style={styles.trendingItem}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '0.875rem',
                        color: getTypeColor(item.type),
                        backgroundColor: `${getTypeColor(item.type)}20`,
                        padding: '2px 8px',
                        borderRadius: '6px',
                      }}>
                        {getTypeIcon(item.type)}
                      </span>
                      <span style={styles.trendingTerm}>{item.term}</span>
                    </div>
                    <span style={styles.trendingCount}>{item.count} results</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Search Results */}
        {isSearching ? (
          <div style={styles.loadingSpinner}>
            <div style={styles.spinner}>🔍</div>
            <h3 style={styles.spinnerText}>Searching Library Database...</h3>
            <p style={styles.spinnerSubtext}>
              Scanning through {searchType === 'all' ? 'all collections' : searchType} for "{searchQuery}"
            </p>
          </div>
        ) : searchResults.total > 0 ? (
          <div style={styles.resultsContainer}>
            <div style={styles.resultsHeader}>
              <h2 style={styles.resultsTitle}>
                🔍 Search Results
                <span style={{
                  fontSize: '0.9375rem',
                  fontWeight: 'normal',
                  color: colors.textSecondary,
                }}>
                  for "{searchQuery}"
                </span>
              </h2>
              <div style={styles.resultsCount}>
                <span style={{
                  backgroundColor: colors.primary,
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  fontWeight: 600,
                }}>
                  {searchResults.total} result{searchResults.total !== 1 ? 's' : ''}
                </span>
                <span>found in {searchType === 'all' ? 'all categories' : searchType}</span>
              </div>
            </div>

            {/* Books Results */}
            {searchResults.books.length > 0 && (searchType === 'all' || searchType === 'books') && (
              <div style={styles.resultTypeSection}>
                <div style={styles.typeHeader}>
                  <div style={styles.typeIcon}>📚</div>
                  <h3 style={styles.typeTitle}>Physical Books</h3>
                  <span style={styles.typeCount}>{searchResults.books.length} books</span>
                </div>
                <div style={styles.resultGrid}>
                  {searchResults.books.map((book: any) => (
                    <Link key={book.id} href={getViewLink('book', book.id)} style={styles.resultCard}>
                      <div style={styles.resultCardHeader}>
                        <div>
                          <h4 style={styles.resultCardTitle}>{book.title}</h4>
                          <p style={styles.resultCardSubtitle}>by {book.author}</p>
                        </div>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: `${getStatusColor(book.status)}20`,
                          color: getStatusColor(book.status),
                        }}>
                          {book.status}
                        </span>
                      </div>
                      <div style={styles.resultCardMeta}>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: `${colors.book}20`,
                          color: colors.book,
                        }}>
                          {book.category}
                        </span>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                          color: colors.textSecondary,
                        }}>
                          {book.year}
                        </span>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                          color: colors.textSecondary,
                        }}>
                          ISBN: {book.isbn}
                        </span>
                      </div>
                      <div style={styles.resultCardFooter}>
                        <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                          📍 {book.location} • 📊 {book.copies} copies
                        </div>
                        <span style={{
                          ...styles.viewButton,
                          borderColor: colors.book,
                          color: colors.book,
                        }}>
                          View Details →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Members Results */}
            {searchResults.members.length > 0 && (searchType === 'all' || searchType === 'members') && (
              <div style={styles.resultTypeSection}>
                <div style={styles.typeHeader}>
                  <div style={styles.typeIcon}>👤</div>
                  <h3 style={styles.typeTitle}>Library Members</h3>
                  <span style={styles.typeCount}>{searchResults.members.length} members</span>
                </div>
                <div style={styles.resultGrid}>
                  {searchResults.members.map((member: any) => (
                    <Link key={member.id} href={getViewLink('member', member.id)} style={styles.resultCard}>
                      <div style={styles.resultCardHeader}>
                        <div>
                          <h4 style={styles.resultCardTitle}>{member.name}</h4>
                          <p style={styles.resultCardSubtitle}>{member.email}</p>
                        </div>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: `${getStatusColor(member.status)}20`,
                          color: getStatusColor(member.status),
                        }}>
                          {member.status}
                        </span>
                      </div>
                      <div style={styles.resultCardMeta}>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: `${colors.member}20`,
                          color: colors.member,
                        }}>
                          ID: {member.membershipId}
                        </span>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                          color: colors.textSecondary,
                        }}>
                          {member.plan}
                        </span>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                          color: colors.textSecondary,
                        }}>
                          Joined: {member.joinDate}
                        </span>
                      </div>
                      <div style={styles.resultCardFooter}>
                        <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                          📞 {member.phone} • 📚 {member.borrowed} books borrowed
                        </div>
                        <span style={{
                          ...styles.viewButton,
                          borderColor: colors.member,
                          color: colors.member,
                        }}>
                          View Profile →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* E-Books Results */}
            {searchResults.ebooks.length > 0 && (searchType === 'all' || searchType === 'ebooks') && (
              <div style={styles.resultTypeSection}>
                <div style={styles.typeHeader}>
                  <div style={styles.typeIcon}>📱</div>
                  <h3 style={styles.typeTitle}>Digital E-Books</h3>
                  <span style={styles.typeCount}>{searchResults.ebooks.length} e-books</span>
                </div>
                <div style={styles.resultGrid}>
                  {searchResults.ebooks.map((ebook: any) => (
                    <Link key={ebook.id} href={getViewLink('ebook', ebook.id)} style={styles.resultCard}>
                      <div style={styles.resultCardHeader}>
                        <div>
                          <h4 style={styles.resultCardTitle}>{ebook.title}</h4>
                          <p style={styles.resultCardSubtitle}>by {ebook.author}</p>
                        </div>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: ebook.available ? `${colors.success}20` : `${colors.danger}20`,
                          color: ebook.available ? colors.success : colors.danger,
                        }}>
                          {ebook.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                      <div style={styles.resultCardMeta}>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: `${colors.ebook}20`,
                          color: colors.ebook,
                        }}>
                          {ebook.category}
                        </span>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                          color: colors.textSecondary,
                        }}>
                          {ebook.format}
                        </span>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                          color: colors.textSecondary,
                        }}>
                          ⭐ {ebook.rating}
                        </span>
                      </div>
                      <div style={styles.resultCardFooter}>
                        <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                          📄 {ebook.size} • 📥 {ebook.downloads.toLocaleString()} downloads
                        </div>
                        <span style={{
                          ...styles.viewButton,
                          borderColor: colors.ebook,
                          color: colors.ebook,
                        }}>
                          Download →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Reservations Results */}
            {searchResults.reservations.length > 0 && (searchType === 'all' || searchType === 'reservations') && (
              <div style={styles.resultTypeSection}>
                <div style={styles.typeHeader}>
                  <div style={styles.typeIcon}>📅</div>
                  <h3 style={styles.typeTitle}>Book Reservations</h3>
                  <span style={styles.typeCount}>{searchResults.reservations.length} reservations</span>
                </div>
                <div style={styles.resultGrid}>
                  {searchResults.reservations.map((res: any) => (
                    <Link key={res.id} href={getViewLink('reservation', res.id)} style={styles.resultCard}>
                      <div style={styles.resultCardHeader}>
                        <div>
                          <h4 style={styles.resultCardTitle}>{res.book}</h4>
                          <p style={styles.resultCardSubtitle}>Reserved by {res.member}</p>
                        </div>
                        <span style={{
                          ...styles.statusBadge,
                          backgroundColor: `${getStatusColor(res.status)}20`,
                          color: getStatusColor(res.status),
                        }}>
                          {res.status}
                        </span>
                      </div>
                      <div style={styles.resultCardMeta}>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: `${colors.reservation}20`,
                          color: colors.reservation,
                        }}>
                          Member ID: {res.memberId}
                        </span>
                        <span style={{
                          ...styles.metaTag,
                          backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                          color: colors.textSecondary,
                        }}>
                          Book ID: {res.bookId}
                        </span>
                      </div>
                      <div style={styles.resultCardFooter}>
                        <div style={{ fontSize: '0.875rem', color: colors.textSecondary }}>
                          📅 Reserved: {res.date} • 🎯 Pickup by: {res.pickupBy}
                        </div>
                        <span style={{
                          ...styles.viewButton,
                          borderColor: colors.reservation,
                          color: colors.reservation,
                        }}>
                          Manage →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : searchQuery && !isSearching ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔍</div>
            <h3 style={styles.emptyTitle}>No results found for "{searchQuery}"</h3>
            <p style={styles.emptyText}>
              We couldn't find any matches in our library database. Try adjusting your search terms,
              using different keywords, or browse by category instead.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                onClick={clearSearch}
                style={{
                  padding: '14px 28px',
                  border: `2px solid ${colors.primary}`,
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  color: colors.primary,
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                ✕ Clear Search
              </button>
              <button
                onClick={() => setSearchType('all')}
                style={{
                  padding: '14px 28px',
                  border: 'none',
                  borderRadius: '12px',
                  backgroundColor: colors.primary,
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                🔄 Search All Categories
              </button>
            </div>
          </div>
        ) : null}

        {/* Footer */}
        <div style={styles.footer}>
          <p style={{ margin: '0 0 16px 0' }}>
            🔍 Advanced Library Search • Real-time database scanning • Powered by Next.js
          </p>
          <div style={styles.keyboardHints}>
            <div style={styles.keyboardHint}>
              <span style={{
                backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}>⏎ Enter</span>
              <span>to search</span>
            </div>
            <div style={styles.keyboardHint}>
              <span style={{
                backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}>Esc</span>
              <span>to clear</span>
            </div>
            <div style={styles.keyboardHint}>
              <span style={{
                backgroundColor: darkMode ? '#4b5563' : '#f3f4f6',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontFamily: 'monospace',
              }}>/</span>
              <span>to focus search</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}