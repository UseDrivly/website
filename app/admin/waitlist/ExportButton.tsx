'use client';

import React from 'react';

interface ExportButtonProps {
  data: any[];
  filename: string;
}

export default function ExportButton({ data, filename }: ExportButtonProps) {
  const exportToCSV = () => {
    if (!data || data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = ['Name', 'Email', 'Phone', 'Role', 'City', 'Vehicle Type', 'Service Type', 'Address', 'Company', 'Fleet Size', 'Date'];
    
    const csvContent = [
      headers.join(','),
      ...data.map(entry => [
        `"${entry.name || ''}"`,
        `"${entry.email || ''}"`,
        `"${entry.phone || ''}"`,
        `"${entry.role || ''}"`,
        `"${entry.city || ''}"`,
        `"${entry.vehicle_type || ''}"`,
        `"${entry.service_type || ''}"`,
        `"${entry.address || ''}"`,
        `"${entry.company || ''}"`,
        `"${entry.fleet_size || ''}"`,
        `"${new Date(entry.created_at).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  return (
    <button
      onClick={exportToCSV}
      className="bg-[#7AB800] text-white px-4 py-2 rounded-lg hover:bg-[#5F9908] transition-colors text-sm font-semibold"
    >
      Export to Excel
    </button>
  );
}
