import React, { useState } from 'react'
import './AssetForm.css'

export default function AssetForm({ service, onAssetAdded }) {
  const [formData, setFormData] = useState({
    asset_tag: '',
    asset_name: '',
    category: '',
    status: 'available',
    location: '',
    purchase_date: '',
    purchase_cost: '',
    serial_number: '',
    manufacturer: '',
    model: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      await service.create(formData)
      setFormData({
        asset_tag: '',
        asset_name: '',
        category: '',
        status: 'available',
        location: '',
        purchase_date: '',
        purchase_cost: '',
        serial_number: '',
        manufacturer: '',
        model: ''
      })
      onAssetAdded()
    } catch (error) {
      console.error('Failed to create asset:', error)
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="asset-form-container">
      <h2>Add New Asset</h2>
      {error && <div className="form-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="asset-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="asset_tag">Asset Tag *</label>
            <input
              type="text"
              id="asset_tag"
              name="asset_tag"
              value={formData.asset_tag}
              onChange={handleChange}
              required
              maxLength="40"
              placeholder="Enter asset tag"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="asset_name">Asset Name *</label>
            <input
              type="text"
              id="asset_name"
              name="asset_name"
              value={formData.asset_name}
              onChange={handleChange}
              required
              maxLength="80"
              placeholder="Enter asset name"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">-- None --</option>
              <option value="hardware">Hardware</option>
              <option value="software">Software</option>
              <option value="equipment">Equipment</option>
              <option value="furniture">Furniture</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">-- None --</option>
              <option value="in_use">In Use</option>
              <option value="available">Available</option>
              <option value="maintenance">Under Maintenance</option>
              <option value="retired">Retired</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              maxLength="100"
              placeholder="Enter location"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="purchase_date">Purchase Date</label>
            <input
              type="date"
              id="purchase_date"
              name="purchase_date"
              value={formData.purchase_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="purchase_cost">Purchase Cost</label>
            <input
              type="number"
              id="purchase_cost"
              name="purchase_cost"
              value={formData.purchase_cost}
              onChange={handleChange}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="serial_number">Serial Number</label>
            <input
              type="text"
              id="serial_number"
              name="serial_number"
              value={formData.serial_number}
              onChange={handleChange}
              maxLength="100"
              placeholder="Enter serial number"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="manufacturer">Manufacturer</label>
            <input
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              maxLength="100"
              placeholder="Enter manufacturer"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              maxLength="100"
              placeholder="Enter model"
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-btn"
          >
            {isSubmitting ? 'Adding Asset...' : 'Add Asset'}
          </button>
        </div>
      </form>
    </div>
  )
}