import React from 'react'
import './AssetStats.css'

export default function AssetStats({ assets }) {
  const stats = {
    total: assets.length,
    inUse: assets.filter(asset => {
      const status = typeof asset.status === 'object' ? asset.status.value : asset.status
      return status === 'in_use'
    }).length,
    available: assets.filter(asset => {
      const status = typeof asset.status === 'object' ? asset.status.value : asset.status
      return status === 'available'
    }).length,
    maintenance: assets.filter(asset => {
      const status = typeof asset.status === 'object' ? asset.status.value : asset.status
      return status === 'maintenance'
    }).length
  }

  return (
    <div className="asset-stats">
      <h2>Asset Overview</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>{stats.total}</h3>
          <p>Total Assets</p>
        </div>
        <div className="stat-card in-use">
          <h3>{stats.inUse}</h3>
          <p>In Use</p>
        </div>
        <div className="stat-card available">
          <h3>{stats.available}</h3>
          <p>Available</p>
        </div>
        <div className="stat-card maintenance">
          <h3>{stats.maintenance}</h3>
          <p>Under Maintenance</p>
        </div>
      </div>
    </div>
  )
}