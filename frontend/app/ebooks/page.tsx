// app/ebooks/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function EBooksPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [darkMode, setDarkMode] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
  };

  // Mock e-books data
  const mockEBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      category: 'Classic',
      format: 'EPUB',
      size: '2.5 MB',
      pages: 180,
      year: 1925,
      downloads: 1560,
      rating: 4.7,
      availableCopies: 5,
      totalCopies: 5,
      description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
      coverColor: '#3b82f6',
      isFeatured: true,
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      category: 'Classic',
      format: 'PDF',
      size: '3.2 MB',
      pages: 281,
      year: 1960,
      downloads: 2340,
      rating: 4.8,
      availableCopies: 3,
      totalCopies: 5,
      description: 'A novel about growing up under extraordinary circumstances in the 1930s.',
      coverColor: '#ec4899',
      isFeatured: true,
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      category: 'Dystopian',
      format: 'EPUB',
      size: '2.8 MB',
      pages: 328,
      year: 1949,
      downloads: 3120,
      rating: 4.6,
      availableCopies: 5,
      totalCopies: 5,
      description: 'A dystopian social science fiction novel and cautionary tale.',
      coverColor: '#10b981',
      isFeatured: false,
    },
    {
      id: 4,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      category: 'Fantasy',
      format: 'EPUB',
      size: '4.5 MB',
      pages: 310,
      year: 1937,
      downloads: 2870,
      rating: 4.9,
      availableCopies: 4,
      totalCopies: 5,
      description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins.',
      coverColor: '#f59e0b',
      isFeatured: false,
    },
    {
      id: 5,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      category: 'Romance',
      format: 'PDF',
      size: '2.1 MB',
      pages: 279,
      year: 1813,
      downloads: 1890,
      rating: 4.5,
      availableCopies: 5,
      totalCopies: 5,
      description: 'A romantic novel of manners that depicts the emotional development of protagonist Elizabeth Bennet.',
      coverColor: '#8b5cf6',
      isFeatured: true,
    },
    {
      id: 6,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      category: 'Coming-of-Age',
      format: 'EPUB',
      size: '1.9 MB',
      pages: 214,
      year: 1951,
      downloads: 1760,
      rating: 4.3,
      availableCopies: 2,
      totalCopies: 5,
      description: 'Story of Holden Caulfield and his experiences in New York City.',
      coverColor: '#ef4444',
      isFeatured: false,
    },
    {
      id: 7,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      category: 'Dystopian',
      format: 'EPUB',
      size: '2.7 MB',
      pages: 268,
      year: 1932,
      downloads: 1540,
      rating: 4.4,
      availableCopies: 5,
      totalCopies: 5,
      description: 'A dystopian novel set in a futuristic World State.',
      coverColor: '#14b8a6',
      isFeatured: false,
    },
    {
      id: 8,
      title: 'Moby Dick',
      author: 'Herman Melville',
      category: 'Adventure',
      format: 'PDF',
      size: '5.2 MB',
      pages: 635,
      year: 1851,
      downloads: 980,
      rating: 4.2,
      availableCopies: 5,
      totalCopies: 5,
      description: 'The voyage of the whaling ship Pequod and its captain Ahab.',
      coverColor: '#6366f1',
      isFeatured: false,
    },
  ];

  // Filter e-books
  const filteredEBooks = mockEBooks.filter(ebook => {
    const matchesSearch = 
      ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ebook.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || ebook.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['All', ...new Set(mockEBooks.map(ebook => ebook.category))];

  // Calculate stats
  const totalEBooks = mockEBooks.length;
  const totalDownloads = mockEBooks.reduce((sum, ebook) => sum + ebook.downloads, 0);
  const availableEBooks = mockEBooks.filter(e => e.availableCopies > 0).length;
  const featuredEBooks = mockEBooks.filter(e => e.isFeatured).length;

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
      background: `linear-gradient(135deg, ${colors.purple}, ${colors.primary})`,
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
      background: `linear-gradient(135deg, ${colors.purple}, ${colors.primary})`,
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
      border: `2px solid ${colors.purple}`,
      borderRadius: '12px',
      fontSize: '14px',
      fontWeight: 500,
      cursor: 'pointer',
      backgroundColor: 'transparent',
      color: colors.purple,
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
      background: `linear-gradient(135deg, ${colors.purple}, ${colors.primary})`,
      color: 'white',
      borderColor: colors.purple,
    },
    gridContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
    },
    ebookCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: `0 4px 6px ${colors.overlay}`,
      border: `1px solid ${colors.border}`,
      transition: 'transform 0.2s',
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
      padding: '4px 12px',
      borderRadius: '12px',
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

  // Handle actions
  const handleAction = (action: string, id: number) => {
    const ebook = mockEBooks.find(e => e.id === id);
    
    switch(action) {
      case 'download':
        alert(`Starting download of "${ebook?.title}"`);
        break;
      case 'preview':
        alert(`Opening preview of "${ebook?.title}"`);
        break;
      case 'edit':
        alert(`Editing "${ebook?.title}"`);
        break;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'Classic': return colors.purple;
      case 'Fantasy': return colors.warning;
      case 'Dystopian': return colors.danger;
      case 'Romance': return colors.pink;
      case 'Adventure': return colors.teal;
      default: return colors.primary;
    }
  };

  // Get format color
  const getFormatColor = (format: string) => {
    switch(format) {
      case 'EPUB': return colors.success;
      case 'PDF': return colors.danger;
      default: return colors.textSecondary;
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>📱 E-Books</h1>
          <p style={styles.subtitle}>
            Digital library collection available for instant download
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
            href="/ebooks/upload"
            style={styles.button}
          >
            📤 Upload E-Book
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>📚 Total E-Books</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.purple,
          }}>
            {totalEBooks}
          </p>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
            {featuredEBooks} featured titles
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>⬇️ Total Downloads</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.primary,
          }}>
            {totalDownloads.toLocaleString()}
          </p>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
            All-time downloads
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>✅ Available Now</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.success,
          }}>
            {availableEBooks}
          </p>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
            Ready for download
          </div>
        </div>
        <div style={styles.statCard}>
          <p style={styles.statTitle}>⭐ Average Rating</p>
          <p style={{ 
            ...styles.statValue,
            color: colors.warning,
          }}>
            4.6
          </p>
          <div style={{ fontSize: '13px', color: colors.textSecondary, marginTop: '4px' }}>
            Based on user reviews
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div style={styles.card}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search by title, author, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchInput}
          />
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
          <button 
            onClick={() => setShowFilters(!showFilters)}
            style={styles.outlineButton}
          >
            {showFilters ? '▲ Hide' : '▼ Filters'}
          </button>
        </div>

        {showFilters && (
          <div style={{ marginBottom: '20px' }}>
            <div style={{ marginBottom: '12px', fontSize: '14px', color: colors.text }}>
              Filter by Category:
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  style={{
                    ...styles.filterButton,
                    ...(selectedCategory === category ? {
                      background: `linear-gradient(135deg, ${getCategoryColor(category)}, ${getCategoryColor(category)}dd)`,
                      color: 'white',
                      borderColor: getCategoryColor(category),
                    } : {})
                  }}
                >
                  {category}
                </button>
              ))}
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
            Showing {filteredEBooks.length} e-books
            {selectedCategory !== 'All' && ` • Category: ${selectedCategory}`}
          </div>
        </div>
      </div>

      {/* E-Books Display */}
      {filteredEBooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: colors.textSecondary }}>
          <div style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }}>📱</div>
          <div style={{ fontSize: '24px', color: colors.text, marginBottom: '12px' }}>
            No e-books found
          </div>
          <div>Try adjusting your search or filters</div>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div style={styles.gridContainer}>
          {filteredEBooks.map(ebook => (
            <div key={ebook.id} style={styles.ebookCard}>
              {/* Header */}
              <div style={{ 
                padding: '24px', 
                background: `linear-gradient(135deg, ${ebook.coverColor}, ${ebook.coverColor}dd)`,
                position: 'relative',
              }}>
                {ebook.isFeatured && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    right: '16px',
                    background: colors.warning,
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}>
                    ⭐ Featured
                  </div>
                )}
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '80px',
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: ebook.coverColor,
                    fontWeight: 'bold',
                    fontSize: '24px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}>
                    📖
                  </div>
                  <div>
                    <div style={{ 
                      fontSize: '18px', 
                      fontWeight: 'bold', 
                      color: 'white',
                      marginBottom: '4px',
                    }}>
                      {ebook.title}
                    </div>
                    <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.9)' }}>
                      {ebook.author}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                {/* Description */}
                <div style={{ 
                  fontSize: '14px', 
                  color: colors.textSecondary,
                  marginBottom: '20px',
                  lineHeight: '1.5',
                }}>
                  {ebook.description}
                </div>

                {/* Details */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Category</span>
                    <span style={{ 
                      fontSize: '13px', 
                      fontWeight: 600,
                      color: getCategoryColor(ebook.category),
                    }}>
                      {ebook.category}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Format</span>
                    <span style={{ 
                      fontSize: '13px', 
                      fontWeight: 600,
                      color: getFormatColor(ebook.format),
                    }}>
                      {ebook.format}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Size</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{ebook.size}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Downloads</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>{ebook.downloads.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '13px', color: colors.textSecondary }}>Rating</span>
                    <span style={{ fontSize: '13px', fontWeight: 600 }}>
                      ⭐ {ebook.rating} / 5.0
                    </span>
                  </div>
                </div>

                {/* Availability */}
                <div style={{ 
                  backgroundColor: darkMode ? '#374151' : '#f9fafb',
                  padding: '12px',
                  borderRadius: '8px',
                  marginBottom: '20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '13px', color: colors.textSecondary }}>
                        Available Copies
                      </div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
                        {ebook.availableCopies}/{ebook.totalCopies}
                      </div>
                    </div>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      backgroundColor: ebook.availableCopies > 0 ? colors.success : colors.danger,
                    }} />
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handleAction('download', ebook.id)}
                    style={{
                      ...styles.smallButton,
                      flex: 1,
                      background: ebook.availableCopies > 0 
                        ? `linear-gradient(135deg, ${colors.success}, ${colors.secondary})`
                        : colors.border,
                      color: ebook.availableCopies > 0 ? 'white' : colors.textSecondary,
                      border: 'none',
                      cursor: ebook.availableCopies > 0 ? 'pointer' : 'not-allowed',
                    }}
                    disabled={ebook.availableCopies === 0}
                  >
                    ⬇️ {ebook.availableCopies > 0 ? 'Download' : 'Unavailable'}
                  </button>
                  <button 
                    onClick={() => handleAction('preview', ebook.id)}
                    style={{
                      ...styles.smallButton,
                      borderColor: colors.primary,
                      color: colors.primary,
                    }}
                  >
                    👁️ Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div style={styles.card}>
          <div style={{ overflowX: 'auto' }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Book Details</th>
                  <th style={styles.th}>Category</th>
                  <th style={styles.th}>Format</th>
                  <th style={styles.th}>Downloads</th>
                  <th style={styles.th}>Rating</th>
                  <th style={styles.th}>Availability</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEBooks.map(ebook => (
                  <tr key={ebook.id}>
                    <td style={styles.td}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px' }}>
                          {ebook.title}
                        </div>
                        <div style={{ fontSize: '13px', color: colors.textSecondary }}>
                          {ebook.author} • {ebook.year} • {ebook.pages} pages
                        </div>
                        {ebook.isFeatured && (
                          <span style={{ 
                            ...styles.badge,
                            background: colors.warning,
                            color: 'white',
                            marginTop: '4px',
                          }}>
                            ⭐ Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{ 
                        ...styles.badge,
                        background: `${getCategoryColor(ebook.category)}20`,
                        color: getCategoryColor(ebook.category),
                        border: `1px solid ${getCategoryColor(ebook.category)}40`,
                      }}>
                        {ebook.category}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <span style={{ 
                        ...styles.badge,
                        background: `${getFormatColor(ebook.format)}20`,
                        color: getFormatColor(ebook.format),
                        border: `1px solid ${getFormatColor(ebook.format)}40`,
                      }}>
                        {ebook.format}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600 }}>
                        {ebook.downloads.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '12px', color: colors.textSecondary }}>
                        {ebook.size}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ fontWeight: 600 }}>
                        ⭐ {ebook.rating}
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div>
                        <div style={{ fontWeight: 600 }}>
                          {ebook.availableCopies}/{ebook.totalCopies}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          color: ebook.availableCopies > 0 ? colors.success : colors.danger,
                        }}>
                          {ebook.availableCopies > 0 ? 'Available' : 'Unavailable'}
                        </div>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button 
                          onClick={() => handleAction('download', ebook.id)}
                          style={{
                            ...styles.smallButton,
                            background: ebook.availableCopies > 0 
                              ? `linear-gradient(135deg, ${colors.success}, ${colors.secondary})`
                              : colors.border,
                            color: ebook.availableCopies > 0 ? 'white' : colors.textSecondary,
                            border: 'none',
                            cursor: ebook.availableCopies > 0 ? 'pointer' : 'not-allowed',
                          }}
                          disabled={ebook.availableCopies === 0}
                        >
                          ⬇️
                        </button>
                        <button 
                          onClick={() => handleAction('preview', ebook.id)}
                          style={styles.smallButton}
                        >
                          👁️
                        </button>
                        <button 
                          onClick={() => handleAction('edit', ebook.id)}
                          style={{
                            ...styles.smallButton,
                            borderColor: colors.primary,
                            color: colors.primary,
                          }}
                        >
                          ✏️
                        </button>
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
        borderTop: `1px solid ${colors.border}`,
        color: colors.textSecondary,
        fontSize: '14px',
        textAlign: 'center',
      }}>
        <p style={{ margin: '0' }}>
          📱 Digital Library • Supported formats: EPUB, PDF • Max loan period: 14 days
        </p>
      </div>
    </div>
  );
}