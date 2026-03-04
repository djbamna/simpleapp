import React, { useEffect, useState, useMemo } from 'react'
import { AssetService } from './services/AssetService.js'
import AssetForm from './components/AssetForm.jsx'
import AssetList from './components/AssetList.jsx'
import AssetStats from './components/AssetStats.jsx'
import './app.css'

export default function App() {
  const assetService = useMemo(() => new AssetService(), [])
  const [assets, setAssets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadAssets = async () => {
    try {
      setLoading(true)
      setError(null)
      const assetsData = await assetService.list()
      setAssets(assetsData)
    } catch (err) {
      console.error('Failed to load assets:', err)
      setError('Failed to load assets. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAssets()
  }, [])

  const handleAssetChange = () => {
    loadAssets()
  }

  if (loading) {
    return <div className="loading">Loading assets...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="asset-tracking-app">
      <header className="app-header">
        <h1>Asset Tracking Dashboard</h1>
        <p>Manage and track organizational assets</p>
      </header>
      
      <main className="app-main">
        <AssetStats assets={assets} />
        <AssetForm service={assetService} onAssetAdded={handleAssetChange} />
        <AssetList assets={assets} service={assetService} onAssetChange={handleAssetChange} />
      </main>
    </div>
  )
}