import React, { useState } from 'react'
import './AssetList.css'

export default function AssetList({ assets, service, onAssetChange }) {
  const [editingAsset, setEditingAsset] = useState(null)
  const [error, setError] = useState(null)

  const handleEdit = (asset) => {
    setEditingAsset(asset)
    setError(null)
  }

  const handleCancelEdit = () => {
    setEditingAsset(null)
    setError(null)
  }

  const handleSave = async (updatedAsset) => {
    try {
      setError(null)
      const sysId = typeof updatedAsset.sys_id === 'object' ? 
        updatedAsset.sys_id.value : updatedAsset.sys_id
      
      await service.update(sysId, updatedAsset)
      setEditingAsset(null)
      onAssetChange()
    } catch (error) {
      console.error('Failed to update asset:', error)
      setError(error.message)
    }
  }

  const handleDelete = async (asset) => {
    if (!confirm('Are you sure you want to delete this asset?')) {
      return
    }

    try {
      setError(null)
      const sysId = typeof asset.sys_id === 'object' ? 
        asset.sys_id.value : asset.sys_id
      
      await service.delete(sysId)
      onAssetChange()
    } catch (error) {
      console.error('Failed to delete asset:', error)
      setError(error.message)
    }
  }

  const getStatusClass = (status) => {
    const statusValue = typeof status === 'object' ? status.value : status
    return `status ${statusValue}`
  }

  const getStatusLabel = (status) => {
    if (typeof status === 'object') {
      return status.display_value || status.value
    }
    return status
  }

  const extractValue = (field) => {
    return typeof field === 'object' ? field.display_value || field.value : field
  }

  if (assets.length === 0) {
    return (
      <div className="asset-list-container">
        <h2>Assets</h2>
        <p className="no-assets">No assets found. Add some assets to get started.</p>
      </div>
    )
  }

  return (
    <div className="asset-list-container">
      <h2>Assets ({assets.length})</h2>
      {error && <div className="list-error">{error}</div>}
      
      <div className="asset-grid">
        {assets.map(asset => {
          const sysId = typeof asset.sys_id === 'object' ? 
            asset.sys_id.value : asset.sys_id
          const isEditing = editingAsset && 
            (typeof editingAsset.sys_id === 'object' ? 
              editingAsset.sys_id.value : editingAsset.sys_id) === sysId

          return (
            <div key={sysId} className="asset-card">
              {isEditing ? (
                <AssetEditForm
                  asset={editingAsset}
                  onSave={handleSave}
                  onCancel={handleCancelEdit}
                />
              ) : (
                <AssetDisplay
                  asset={asset}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  extractValue={extractValue}
                  getStatusClass={getStatusClass}
                  getStatusLabel={getStatusLabel}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function AssetDisplay({ asset, onEdit, onDelete, extractValue, getStatusClass, getStatusLabel }) {
  return (
    <>
      <div className="asset-header">
        <h3>{extractValue(asset.asset_name)}</h3>
        <span className={getStatusClass(asset.status)}>
          {getStatusLabel(asset.status)}
        </span>
      </div>
      
      <div className="asset-details">
        <div className="detail-row">
          <span className="label">Tag:</span>
          <span>{extractValue(asset.asset_tag)}</span>
        </div>
        
        {asset.category && (
          <div className="detail-row">
            <span className="label">Category:</span>
            <span>{extractValue(asset.category)}</span>
          </div>
        )}
        
        {asset.assigned_to && (
          <div className="detail-row">
            <span className="label">Assigned To:</span>
            <span>{extractValue(asset.assigned_to)}</span>
          </div>
        )}
        
        {asset.location && (
          <div className="detail-row">
            <span className="label">Location:</span>
            <span>{extractValue(asset.location)}</span>
          </div>
        )}
        
        {asset.manufacturer && (
          <div className="detail-row">
            <span className="label">Manufacturer:</span>
            <span>{extractValue(asset.manufacturer)}</span>
          </div>
        )}
        
        {asset.model && (
          <div className="detail-row">
            <span className="label">Model:</span>
            <span>{extractValue(asset.model)}</span>
          </div>
        )}
      </div>
      
      <div className="asset-actions">
        <button onClick={() => onEdit(asset)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(asset)} className="delete-btn">
          Delete
        </button>
      </div>
    </>
  )
}

function AssetEditForm({ asset, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    asset_tag: typeof asset.asset_tag === 'object' ? 
      asset.asset_tag.display_value || asset.asset_tag.value : asset.asset_tag || '',
    asset_name: typeof asset.asset_name === 'object' ? 
      asset.asset_name.display_value || asset.asset_name.value : asset.asset_name || '',
    category: typeof asset.category === 'object' ? asset.category.value : asset.category || '',
    status: typeof asset.status === 'object' ? asset.status.value : asset.status || '',
    location: typeof asset.location === 'object' ? 
      asset.location.display_value || asset.location.value : asset.location || '',
    manufacturer: typeof asset.manufacturer === 'object' ? 
      asset.manufacturer.display_value || asset.manufacturer.value : asset.manufacturer || '',
    model: typeof asset.model === 'object' ? 
      asset.model.display_value || asset.model.value : asset.model || ''
  })

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({ ...asset, ...formData })
  }

  return (
    <form onSubmit={handleSubmit} className="asset-edit-form">
      <div className="form-group">
        <label>Asset Tag:</label>
        <input
          type="text"
          name="asset_tag"
          value={formData.asset_tag}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Asset Name:</label>
        <input
          type="text"
          name="asset_name"
          value={formData.asset_name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Category:</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">-- None --</option>
          <option value="hardware">Hardware</option>
          <option value="software">Software</option>
          <option value="equipment">Equipment</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="">-- None --</option>
          <option value="in_use">In Use</option>
          <option value="available">Available</option>
          <option value="maintenance">Under Maintenance</option>
          <option value="retired">Retired</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Location:</label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Manufacturer:</label>
        <input
          type="text"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-group">
        <label>Model:</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" className="save-btn">Save</button>
        <button type="button" onClick={onCancel} className="cancel-btn">Cancel</button>
      </div>
    </form>
  )
}