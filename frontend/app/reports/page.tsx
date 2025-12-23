"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ReportsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedReport, setSelectedReport] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [loading, setLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState('pdf');

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
    chart1: '#3b82f6',
    chart2: '#10b981',
    chart3: '#8b5cf6',
    chart4: '#f59e0b',
    chart5: '#ec4899',
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
    chart1: '#2563eb',
    chart2: '#059669',
    chart3: '#7c3aed',
    chart4: '#d97706',
    chart5: '#db2777',
  };

  // Mock data for reports
  const reportData = {
    overview: {
      title: "📊 Library Overview",
      description: "Complete library performance and usage statistics",
      stats: [
        { label: "Total Books", value: "10,245", change: "+12%", icon: "📚", color: colors.chart1 },
        { label: "Active Members", value: "2,843", change: "+8%", icon: "👥", color: colors.chart2 },
        { label: "Books Borrowed", value: "8,912", change: "+15%", icon: "📖", color: colors.chart3 },
        { label: "Total Revenue", value: "$45,820", change: "+22%", icon: "💰", color: colors.chart4 },
        { label: "New Members", value: "324", change: "+5%", icon: "🆕", color: colors.chart5 },
        { label: "E-Book Downloads", value: "5,672", change: "+18%", icon: "📱", color: colors.teal },
      ],
      charts: [
        {
          type: "bar",
          title: "Monthly Book Borrowing Trends",
          data: [
            { month: "Jan", physical: 1200, ebook: 800 },
            { month: "Feb", physical: 1400, ebook: 900 },
            { month: "Mar", physical: 1600, ebook: 1100 },
            { month: "Apr", physical: 1800, ebook: 1300 },
            { month: "May", physical: 2000, ebook: 1500 },
            { month: "Jun", physical: 2200, ebook: 1700 },
          ]
        },
        {
          type: "pie",
          title: "Book Category Distribution",
          data: [
            { category: "Fiction", value: 35, color: colors.chart1 },
            { category: "Non-Fiction", value: 25, color: colors.chart2 },
            { category: "Science", value: 15, color: colors.chart3 },
            { category: "Technology", value: 12, color: colors.chart4 },
            { category: "Art & Design", value: 8, color: colors.chart5 },
            { category: "Others", value: 5, color: colors.teal },
          ]
        }
      ]
    },
    members: {
      title: "👤 Member Analytics",
      description: "Member acquisition, retention, and activity patterns",
      stats: [
        { label: "Total Members", value: "2,843", change: "+8%", icon: "👥", color: colors.chart1 },
        { label: "Active Today", value: "324", change: "+12%", icon: "✅", color: colors.chart2 },
        { label: "New This Month", value: "142", change: "+5%", icon: "🆕", color: colors.chart3 },
        { label: "Premium Members", value: "856", change: "+15%", icon: "⭐", color: colors.chart4 },
        { label: "Avg. Books/Member", value: "3.2", change: "+0.4", icon: "📚", color: colors.chart5 },
        { label: "Member Satisfaction", value: "4.7/5", change: "+0.2", icon: "😊", color: colors.teal },
      ],
      charts: [
        {
          type: "line",
          title: "Member Growth Over Time",
          data: [
            { month: "Jan", new: 120, total: 2400 },
            { month: "Feb", new: 135, total: 2535 },
            { month: "Mar", new: 142, total: 2677 },
            { month: "Apr", new: 156, total: 2833 },
            { month: "May", new: 168, total: 3001 },
            { month: "Jun", new: 175, total: 3176 },
          ]
        },
        {
          type: "donut",
          title: "Membership Plan Distribution",
          data: [
            { plan: "Premium", value: 45, color: colors.chart1 },
            { plan: "Standard", value: 35, color: colors.chart2 },
            { plan: "Basic", value: 15, color: colors.chart3 },
            { plan: "Student", value: 5, color: colors.chart4 },
          ]
        }
      ]
    },
    financial: {
      title: "💰 Financial Reports",
      description: "Revenue, expenses, and financial performance analysis",
      stats: [
        { label: "Total Revenue", value: "$45,820", change: "+22%", icon: "💰", color: colors.chart1 },
        { label: "Membership Fees", value: "$28,500", change: "+15%", icon: "👥", color: colors.chart2 },
        { label: "Late Fees", value: "$4,320", change: "-8%", icon: "⏰", color: colors.chart3 },
        { label: "E-Book Sales", value: "$9,800", change: "+32%", icon: "📱", color: colors.chart4 },
        { label: "Operational Costs", value: "$18,240", change: "+5%", icon: "📊", color: colors.chart5 },
        { label: "Net Profit", value: "$27,580", change: "+28%", icon: "📈", color: colors.teal },
      ],
      charts: [
        {
          type: "area",
          title: "Monthly Revenue Breakdown",
          data: [
            { month: "Jan", membership: 4200, fees: 680, ebooks: 1200 },
            { month: "Feb", membership: 4800, fees: 720, ebooks: 1400 },
            { month: "Mar", membership: 5200, fees: 810, ebooks: 1600 },
            { month: "Apr", membership: 5800, fees: 890, ebooks: 1900 },
            { month: "May", membership: 6200, fees: 950, ebooks: 2200 },
            { month: "Jun", membership: 6800, fees: 1020, ebooks: 2500 },
          ]
        },
        {
          type: "bar",
          title: "Revenue Sources Distribution",
          data: [
            { source: "Membership", value: 62, color: colors.chart1 },
            { source: "E-Books", value: 21, color: colors.chart2 },
            { source: "Late Fees", value: 9, color: colors.chart3 },
            { source: "Events", value: 5, color: colors.chart4 },
            { source: "Other", value: 3, color: colors.chart5 },
          ]
        }
      ]
    },
    inventory: {
      title: "📚 Inventory Analysis",
      description: "Book circulation, availability, and usage patterns",
      stats: [
        { label: "Total Books", value: "10,245", change: "+12%", icon: "📚", color: colors.chart1 },
        { label: "Available Now", value: "8,124", change: "+8%", icon: "✅", color: colors.chart2 },
        { label: "Currently Borrowed", value: "1,892", change: "+15%", icon: "📖", color: colors.chart3 },
        { label: "Popularity Index", value: "87%", change: "+5%", icon: "🔥", color: colors.chart4 },
        { label: "Avg. Borrow Time", value: "14 days", change: "-2", icon: "⏱️", color: colors.chart5 },
        { label: "Reservations", value: "324", change: "+12%", icon: "📅", color: colors.teal },
      ],
      charts: [
        {
          type: "line",
          title: "Book Circulation Trends",
          data: [
            { month: "Jan", borrowed: 1200, returned: 1180 },
            { month: "Feb", borrowed: 1400, returned: 1350 },
            { month: "Mar", borrowed: 1600, returned: 1550 },
            { month: "Apr", borrowed: 1800, returned: 1750 },
            { month: "May", borrowed: 2000, returned: 1950 },
            { month: "Jun", borrowed: 2200, returned: 2150 },
          ]
        },
        {
          type: "horizontal-bar",
          title: "Top 5 Most Borrowed Books",
          data: [
            { book: "The Great Gatsby", count: 245, color: colors.chart1 },
            { book: "To Kill a Mockingbird", count: 218, color: colors.chart2 },
            { book: "1984", count: 192, color: colors.chart3 },
            { book: "The Hobbit", count: 176, color: colors.chart4 },
            { book: "Pride & Prejudice", count: 154, color: colors.chart5 },
          ]
        }
      ]
    }
  };

  // Date range options
  const dateRanges = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
    { value: 'custom', label: 'Custom Range' },
  ];

  // Report types
  const reportTypes = [
    { id: 'overview', label: '📊 Overview', description: 'Complete library analytics' },
    { id: 'members', label: '👤 Members', description: 'Member insights & growth' },
    { id: 'financial', label: '💰 Financial', description: 'Revenue & financial reports' },
    { id: 'inventory', label: '📚 Inventory', description: 'Book usage & circulation' },
    { id: 'performance', label: '🚀 Performance', description: 'Operational metrics' },
    { id: 'custom', label: '🔧 Custom', description: 'Build custom reports' },
  ];

  // Export formats
  const exportFormats = [
    { value: 'pdf', label: 'PDF', icon: '📄' },
    { value: 'excel', label: 'Excel', icon: '📊' },
    { value: 'csv', label: 'CSV', icon: '📋' },
    { value: 'print', label: 'Print', icon: '🖨️' },
  ];

  // Handle report generation
  const generateReport = () => {
    setLoading(true);
    setTimeout(() => {
      alert(`Generating ${selectedReport} report in ${exportFormat.toUpperCase()} format for ${dateRange}...`);
      setLoading(false);
    }, 1500);
  };

  // Handle export
  const handleExport = () => {
    setLoading(true);
    setTimeout(() => {
      alert(`Exporting ${selectedReport} report as ${exportFormat.toUpperCase()}...`);
      setLoading(false);
    }, 1000);
  };

  // Handle date range change
  const handleDateRangeChange = (range: string) => {
    setDateRange(range);
    if (range === 'custom') {
      const startDate = prompt('Enter start date (YYYY-MM-DD):', '2024-01-01');
      const endDate = prompt('Enter end date (YYYY-MM-DD):', '2024-06-30');
      if (startDate && endDate) {
        alert(`Custom range set: ${startDate} to ${endDate}`);
      }
    }
  };

  // Improved chart rendering with proper layout
  const renderChart = (chart: any) => {
    const maxValue = Math.max(...chart.data.map((d: any) => 
      d.value || Math.max(d.physical || 0, d.ebook || 0, d.new || 0, d.total || 0)
    ));

    if (chart.type === 'pie' || chart.type === 'donut') {
      // Fixed pie/donut chart
      const total = chart.data.reduce((sum: number, d: any) => sum + d.value, 0);
      let currentAngle = 0;
      const chartSize = 150;
      const donutSize = chart.type === 'donut' ? 60 : 0;
      
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          height: '300px',
          padding: '20px',
          gap: '30px',
          flexWrap: 'wrap' as const,
        }}>
          {/* Chart Visualization */}
          <div style={{
            position: 'relative',
            width: `${chartSize}px`,
            height: `${chartSize}px`,
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              background: `conic-gradient(${chart.data.map((d: any, i: number) => 
                `${d.color} ${currentAngle}deg ${currentAngle += (d.value / total) * 360}deg`
              ).join(', ')})`,
              overflow: 'hidden',
            }} />
            
            {chart.type === 'donut' && (
              <div style={{
                position: 'absolute',
                top: `${donutSize/2}px`,
                left: `${donutSize/2}px`,
                width: `${chartSize - donutSize}px`,
                height: `${chartSize - donutSize}px`,
                borderRadius: '50%',
                backgroundColor: darkMode ? '#374151' : '#f9fafb',
              }} />
            )}
            
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontSize: '14px',
              color: colors.textSecondary,
              fontWeight: 'bold',
            }}>
              {chart.type === 'donut' && 'Total'}
            </div>
          </div>
          
          {/* Legend */}
          <div style={{
            flex: 1,
            minWidth: '200px',
            maxWidth: '300px',
          }}>
            {chart.data.map((item: any, idx: number) => (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '12px',
                padding: '8px',
                backgroundColor: darkMode ? '#374151' : '#f9fafb',
                borderRadius: '8px',
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                  backgroundColor: item.color,
                  marginRight: '12px',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, fontSize: '14px', color: colors.text }}>
                  {item.category || item.plan || item.source}
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: colors.text }}>
                  {item.value}%
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (chart.type === 'horizontal-bar') {
      return (
        <div style={{
          padding: '20px',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          {chart.data.map((item: any, index: number) => {
            const percentage = (item.count / Math.max(...chart.data.map((d: any) => d.count))) * 100;
            
            return (
              <div key={index} style={{ 
                marginBottom: '16px',
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '6px',
                }}>
                  <div style={{
                    flex: 1,
                    fontSize: '14px',
                    color: colors.text,
                    fontWeight: '500',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {item.book}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    color: colors.text,
                    marginLeft: '12px',
                  }}>
                    {item.count}
                  </div>
                </div>
                <div style={{
                  width: '100%',
                  height: '20px',
                  backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                  borderRadius: '10px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${percentage}%`,
                    height: '100%',
                    backgroundColor: item.color,
                    borderRadius: '10px',
                    transition: 'width 0.5s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    // Bar/Line/Area chart
    return (
      <div style={{
        padding: '20px',
        height: '300px',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '40px',
          right: '20px',
          bottom: '40px',
          display: 'flex',
          alignItems: 'flex-end',
          gap: chart.type === 'bar' ? '16px' : '0',
          justifyContent: 'space-between',
        }}>
          {chart.data.map((item: any, index: number) => {
            const physicalValue = item.physical || 0;
            const ebookValue = item.ebook || 0;
            const newValue = item.new || 0;
            const totalValue = item.total || 0;
            const membershipValue = item.membership || 0;
            const feesValue = item.fees || 0;
            const ebooksValue = item.ebooks || 0;
            const borrowedValue = item.borrowed || 0;
            const returnedValue = item.returned || 0;
            
            const maxBarValue = Math.max(
              physicalValue, ebookValue, newValue, totalValue,
              membershipValue, feesValue, ebooksValue,
              borrowedValue, returnedValue
            );
            
            const barHeight = (value: number) => (value / maxBarValue) * 100;

            return (
              <div key={index} style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                flex: 1,
                height: '100%',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  width: '100%',
                  justifyContent: 'flex-end',
                  gap: '2px',
                }}>
                  {/* Multiple bars for stacked data */}
                  {physicalValue > 0 && ebookValue > 0 && (
                    <>
                      <div style={{
                        width: '70%',
                        height: `${barHeight(physicalValue)}%`,
                        backgroundColor: colors.chart1,
                        borderRadius: '4px 4px 0 0',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '12px',
                          color: colors.text,
                          fontWeight: 'bold',
                        }}>
                          {physicalValue}
                        </div>
                      </div>
                      <div style={{
                        width: '70%',
                        height: `${barHeight(ebookValue)}%`,
                        backgroundColor: colors.chart2,
                        borderRadius: '0 0 4px 4px',
                        position: 'relative',
                      }}>
                        <div style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          fontSize: '12px',
                          color: colors.text,
                          fontWeight: 'bold',
                        }}>
                          {ebookValue}
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Single value bars */}
                  {item.value && !physicalValue && !ebookValue && (
                    <div style={{
                      width: '70%',
                      height: `${(item.value / Math.max(...chart.data.map((d: any) => d.value))) * 100}%`,
                      backgroundColor: item.color || colors.primary,
                      borderRadius: '4px',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: '12px',
                        color: colors.text,
                        fontWeight: 'bold',
                      }}>
                        {item.value}%
                      </div>
                    </div>
                  )}
                  
                  {/* Line/Area chart points */}
                  {chart.type === 'line' || chart.type === 'area' ? (
                    <div style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                    }}>
                      <div style={{
                        position: 'absolute',
                        bottom: `${barHeight(totalValue || membershipValue || borrowedValue)}%`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: colors.chart1,
                        border: `2px solid ${colors.background}`,
                      }} />
                    </div>
                  ) : null}
                </div>
                <div style={{
                  marginTop: '10px',
                  fontSize: '12px',
                  color: colors.textSecondary,
                  textAlign: 'center',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                }}>
                  {item.month || item.category || item.source || item.book || item.plan}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Y-axis labels */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '20px',
          bottom: '40px',
          width: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          paddingRight: '8px',
        }}>
          {[0, 25, 50, 75, 100].map((percent, idx) => (
            <div key={idx} style={{
              fontSize: '11px',
              color: colors.textSecondary,
            }}>
              {percent}%
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Styles - Fixed border properties
  const styles = {
    container: {
      padding: '24px',
      maxWidth: '1600px',
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
      fontSize: '0.9375rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s',
      backgroundColor: colors.cardBg,
      color: colors.text,
    },
    primaryButton: {
      padding: '14px 32px',
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
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
    reportSelector: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '20px',
      marginBottom: '40px',
    },
    reportTypeCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '24px',
      border: `2px solid ${colors.border}`,
      cursor: 'pointer',
      transition: 'all 0.3s',
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '16px',
    },
    activeReportType: {
      border: `2px solid ${colors.primary}`,
      backgroundColor: darkMode ? '#1e3a8a20' : '#dbeafe',
      transform: 'translateY(-4px)',
      boxShadow: `0 8px 24px ${colors.overlay}`,
    },
    reportTypeIcon: {
      fontSize: '2rem',
      marginBottom: '8px',
    },
    reportTypeTitle: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0',
    },
    reportTypeDescription: {
      fontSize: '0.9375rem',
      color: colors.textSecondary,
      margin: '0',
      lineHeight: 1.5,
    },
    dateRangeSelector: {
      display: 'flex',
      gap: '10px',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
    },
    dateRangeButton: {
      padding: '10px 20px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s',
      backgroundColor: colors.cardBg,
      color: colors.textSecondary,
    },
    activeDateRange: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      color: 'white',
      border: `2px solid ${colors.primary}`,
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '24px',
      marginBottom: '40px',
    },
    statCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '24px',
      border: `1px solid ${colors.border}`,
      transition: 'all 0.3s',
    },
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    statIcon: {
      fontSize: '2rem',
      width: '60px',
      height: '60px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
    },
    statInfo: {
      textAlign: 'right' as const,
    },
    statLabel: {
      fontSize: '0.875rem',
      color: colors.textSecondary,
      margin: '0 0 8px 0',
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: colors.text,
      margin: '0 0 4px 0',
    },
    statChange: {
      fontSize: '0.875rem',
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    chartsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
      gap: '32px',
      marginBottom: '40px',
    },
    chartCard: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '0',
      border: `1px solid ${colors.border}`,
      overflow: 'hidden',
    },
    chartHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '24px 24px 16px 24px',
      borderBottom: `1px solid ${colors.border}`,
    },
    chartTitle: {
      fontSize: '1.125rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0',
    },
    exportSection: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '32px',
      border: `1px solid ${colors.border}`,
      marginBottom: '40px',
    },
    exportHeader: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0 0 24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    exportOptions: {
      display: 'flex',
      gap: '16px',
      marginBottom: '32px',
      flexWrap: 'wrap' as const,
    },
    exportOption: {
      padding: '12px 24px',
      border: `2px solid ${colors.border}`,
      borderRadius: '10px',
      fontSize: '0.9375rem',
      fontWeight: 500,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      transition: 'all 0.2s',
      backgroundColor: colors.cardBg,
      color: colors.text,
    },
    activeExportOption: {
      background: `linear-gradient(135deg, ${colors.primary}, ${colors.purple})`,
      color: 'white',
      border: `2px solid ${colors.primary}`,
    },
    exportActions: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap' as const,
    },
    secondaryButton: {
      padding: '14px 32px',
      border: `2px solid ${colors.secondary}`,
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: 600,
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      transition: 'all 0.3s',
      backgroundColor: 'transparent',
      color: colors.secondary,
    },
    insightsSection: {
      backgroundColor: colors.cardBg,
      borderRadius: '16px',
      padding: '32px',
      border: `1px solid ${colors.border}`,
      marginBottom: '40px',
    },
    insightsHeader: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0 0 24px 0',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
    },
    insightsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '24px',
    },
    insightCard: {
      backgroundColor: darkMode ? '#374151' : '#f9fafb',
      borderRadius: '12px',
      padding: '20px',
      borderLeft: `4px solid ${colors.primary}`,
    },
    insightTitle: {
      fontSize: '1rem',
      fontWeight: 600,
      color: colors.text,
      margin: '0 0 12px 0',
    },
    insightText: {
      fontSize: '0.9375rem',
      color: colors.textSecondary,
      margin: '0',
      lineHeight: 1.6,
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

  // Current report data
  const currentReport = reportData[selectedReport as keyof typeof reportData] || reportData.overview;

  return (
    <>
      <style>{spinnerStyle}</style>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.titleSection}>
            <h1 style={styles.title}>📈 Library Analytics & Reports</h1>
            <p style={styles.subtitle}>
              Comprehensive insights, analytics, and performance reports for data-driven decision making
            </p>
          </div>
          <div style={styles.controls}>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              style={{
                ...styles.controlButton,
                border: `2px solid ${colors.warning}`,
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

        {/* Report Type Selector */}
        <div style={styles.reportSelector}>
          {reportTypes.map((report) => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              style={{
                ...styles.reportTypeCard,
                ...(selectedReport === report.id ? styles.activeReportType : {})
              }}
            >
              <div style={styles.reportTypeIcon}>
                {report.label.split(' ')[0]}
              </div>
              <h3 style={styles.reportTypeTitle}>
                {report.label.split(' ').slice(1).join(' ')}
              </h3>
              <p style={styles.reportTypeDescription}>
                {report.description}
              </p>
            </div>
          ))}
        </div>

        {/* Date Range Selector */}
        <div style={styles.dateRangeSelector}>
          {dateRanges.map((range) => (
            <button
              key={range.value}
              onClick={() => handleDateRangeChange(range.value)}
              style={{
                ...styles.dateRangeButton,
                ...(dateRange === range.value ? styles.activeDateRange : {})
              }}
            >
              {range.label}
            </button>
          ))}
        </div>

        {/* Main Report Content */}
        <div>
          {/* Report Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            flexWrap: 'wrap',
            gap: '20px',
          }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: colors.text, margin: '0 0 8px 0' }}>
                {currentReport.title}
              </h2>
              <p style={{ fontSize: '1rem', color: colors.textSecondary, margin: 0 }}>
                {currentReport.description} • {dateRanges.find(r => r.value === dateRange)?.label}
              </p>
            </div>
            <button 
              onClick={generateReport}
              style={styles.primaryButton}
              disabled={loading}
            >
              {loading ? '⏳ Generating...' : '📊 Generate Report'}
            </button>
          </div>

          {/* Key Stats */}
          <div style={styles.statsGrid}>
            {currentReport.stats.map((stat: any, index: number) => (
              <div key={index} style={styles.statCard}>
                <div style={styles.statHeader}>
                  <div style={{
                    ...styles.statIcon,
                    backgroundColor: `${stat.color}20`,
                    color: stat.color,
                  }}>
                    {stat.icon}
                  </div>
                  <div style={styles.statInfo}>
                    <p style={styles.statLabel}>{stat.label}</p>
                    <h3 style={styles.statValue}>{stat.value}</h3>
                    <div style={{
                      ...styles.statChange,
                      color: stat.change.startsWith('+') ? colors.success : 
                             stat.change.startsWith('-') ? colors.danger : colors.textSecondary,
                    }}>
                      {stat.change.startsWith('+') ? '↗' : 
                       stat.change.startsWith('-') ? '↘' : '→'} {stat.change}
                    </div>
                  </div>
                </div>
                <div style={{
                  height: '4px',
                  backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: '75%',
                    height: '100%',
                    background: `linear-gradient(90deg, ${stat.color}, ${stat.color}dd)`,
                    borderRadius: '2px',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {/* Charts - Fixed layout */}
          <div style={styles.chartsGrid}>
            {currentReport.charts.map((chart: any, index: number) => (
              <div key={index} style={styles.chartCard}>
                <div style={styles.chartHeader}>
                  <h3 style={styles.chartTitle}>{chart.title}</h3>
                  <span style={{
                    fontSize: '0.875rem',
                    color: colors.textSecondary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    fontWeight: 600,
                  }}>
                    {chart.type} chart
                  </span>
                </div>
                <div style={{
                  height: '320px',
                  overflow: 'hidden',
                }}>
                  {renderChart(chart)}
                </div>
              </div>
            ))}
          </div>

          {/* Export Section */}
          <div style={styles.exportSection}>
            <h3 style={styles.exportHeader}>
              📤 Export Report
              <span style={{ fontSize: '0.875rem', color: colors.textSecondary, fontWeight: 'normal' }}>
                • Choose format and export options
              </span>
            </h3>
            
            <div style={styles.exportOptions}>
              {exportFormats.map((format) => (
                <button
                  key={format.value}
                  onClick={() => setExportFormat(format.value)}
                  style={{
                    ...styles.exportOption,
                    ...(exportFormat === format.value ? styles.activeExportOption : {})
                  }}
                >
                  {format.icon} {format.label}
                </button>
              ))}
            </div>

            <div style={styles.exportActions}>
              <button 
                onClick={handleExport}
                style={styles.primaryButton}
                disabled={loading}
              >
                {loading ? '⏳ Exporting...' : '📥 Export Now'}
              </button>
              <button 
                onClick={() => window.print()}
                style={styles.secondaryButton}
              >
                🖨️ Print Preview
              </button>
              <button 
                onClick={() => alert('Schedule feature coming soon!')}
                style={{
                  ...styles.controlButton,
                  border: `2px solid ${colors.warning}`,
                  color: colors.warning,
                }}
              >
                ⏰ Schedule Export
              </button>
            </div>
          </div>

          {/* Insights & Recommendations */}
          <div style={styles.insightsSection}>
            <h3 style={styles.insightsHeader}>
              💡 Key Insights & Recommendations
              <span style={{ fontSize: '0.875rem', color: colors.textSecondary, fontWeight: 'normal' }}>
                • Based on current data trends
              </span>
            </h3>
            
            <div style={styles.insightsGrid}>
              <div style={styles.insightCard}>
                <h4 style={styles.insightTitle}>📈 Growth Opportunity</h4>
                <p style={styles.insightText}>
                  Member acquisition has increased by 15% this quarter. Consider expanding 
                  marketing efforts during peak hours to capitalize on this trend.
                </p>
              </div>
              
              <div style={{...styles.insightCard, borderLeft: `4px solid ${colors.success}`}}>
                <h4 style={styles.insightTitle}>💰 Revenue Boost</h4>
                <p style={styles.insightText}>
                  E-book revenue grew by 32% this month. Invest in digital collection 
                  expansion and promote premium e-book subscriptions.
                </p>
              </div>
              
              <div style={{...styles.insightCard, borderLeft: `4px solid ${colors.warning}`}}>
                <h4 style={styles.insightTitle}>📚 Inventory Alert</h4>
                <p style={styles.insightText}>
                  Fiction books show 92% utilization rate. Consider ordering additional 
                  copies of popular titles to meet growing demand.
                </p>
              </div>
              
              <div style={{...styles.insightCard, borderLeft: `4px solid ${colors.teal}`}}>
                <h4 style={styles.insightTitle}>👥 Member Engagement</h4>
                <p style={styles.insightText}>
                  Premium members borrow 3x more books than basic members. 
                  Launch a targeted upgrade campaign to increase premium conversions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          <p style={{ margin: '0 0 16px 0' }}>
            📈 Advanced Analytics Dashboard • Last updated: Today at 14:30 • Data refreshed every 24 hours
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <span>📞 Need help? Contact support</span>
            <span>📊 Data accuracy: 99.8%</span>
            <span>⏰ Next auto-report: 00:00</span>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.loadingSpinner}>
              <div style={styles.spinner}>📊</div>
              <h3 style={styles.spinnerText}>Processing Report...</h3>
              <p style={styles.spinnerSubtext}>
                Generating {selectedReport} report with {dateRange} data
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}