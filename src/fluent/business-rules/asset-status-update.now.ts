import '@servicenow/sdk/global'
import { BusinessRule } from '@servicenow/sdk/core'
import { updateAssetStatus } from '../../server/asset-status-handler.js'

BusinessRule({
  $id: Now.ID['asset_status_br'],
  name: 'Asset Assignment Status Update',
  table: 'x_1908656_asset_tr_asset',
  when: 'before',
  action: ['update'],
  script: updateAssetStatus,
  order: 100,
  active: true,
  description: 'Automatically updates asset status when assigned to or unassigned from a user'
})