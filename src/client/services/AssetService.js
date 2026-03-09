export class AssetService {
  constructor() {
    this.tableName = 'x_1908656_cellapp_asset'
  }

  async list(filters = {}) {
    try {
      const searchParams = new URLSearchParams(filters)
      searchParams.set('sysparm_display_value', 'all')
      searchParams.set('sysparm_limit', '1000')

      const response = await fetch(`/api/now/table/${this.tableName}?${searchParams.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `Failed to fetch assets: ${response.status}`)
      }

      const data = await response.json()
      return data.result || []
    } catch (error) {
      console.error('Error fetching assets:', error)
      throw error
    }
  }

  async create(assetData) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(assetData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `Failed to create asset: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating asset:', error)
      throw error
    }
  }

  async update(sysId, assetData) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        },
        body: JSON.stringify(assetData)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `Failed to update asset: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error updating asset:', error)
      throw error
    }
  }

  async delete(sysId) {
    try {
      const response = await fetch(`/api/now/table/${this.tableName}/${sysId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-UserToken': window.g_ck
        }
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || `Failed to delete asset: ${response.status}`)
      }

      return true
    } catch (error) {
      console.error('Error deleting asset:', error)
      throw error
    }
  }
}