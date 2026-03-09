import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import assetTrackingPage from '../../client/index.html'

export const asset_tracking_page = UiPage({
  $id: Now.ID['asset_tracking_page'], 
  endpoint: 'x_1908656_cellapp_asset_tracking.do',
  description: 'Modern React-based Asset Tracking Dashboard',
  category: 'general',
  html: assetTrackingPage,
  direct: true
})