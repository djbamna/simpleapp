import '@servicenow/sdk/global'
import { Table, StringColumn, ReferenceColumn, DateColumn, ChoiceColumn, DecimalColumn, BooleanColumn } from '@servicenow/sdk/core'

export const x_1908656_asset_tr_asset = Table({
  name: 'x_1908656_asset_tr_asset',
  label: 'Asset',
  schema: {
    asset_tag: StringColumn({
      label: 'Asset Tag',
      maxLength: 40,
      mandatory: true
    }),
    asset_name: StringColumn({
      label: 'Asset Name', 
      maxLength: 80,
      mandatory: true
    }),
    category: ChoiceColumn({
      label: 'Category',
      choices: {
        hardware: { label: 'Hardware', sequence: 0 },
        software: { label: 'Software', sequence: 1 },
        equipment: { label: 'Equipment', sequence: 2 },
        furniture: { label: 'Furniture', sequence: 3 }
      },
      dropdown: 'dropdown_with_none'
    }),
    status: ChoiceColumn({
      label: 'Status',
      choices: {
        in_use: { label: 'In Use', sequence: 0 },
        available: { label: 'Available', sequence: 1 },
        maintenance: { label: 'Under Maintenance', sequence: 2 },
        retired: { label: 'Retired', sequence: 3 }
      },
      dropdown: 'dropdown_with_none',
      default: 'available'
    }),
    assigned_to: ReferenceColumn({
      label: 'Assigned To',
      referenceTable: 'sys_user'
    }),
    location: StringColumn({
      label: 'Location',
      maxLength: 100
    }),
    purchase_date: DateColumn({
      label: 'Purchase Date'
    }),
    purchase_cost: DecimalColumn({
      label: 'Purchase Cost'
    }),
    warranty_expires: DateColumn({
      label: 'Warranty Expires'
    }),
    serial_number: StringColumn({
      label: 'Serial Number',
      maxLength: 100
    }),
    manufacturer: StringColumn({
      label: 'Manufacturer',
      maxLength: 100
    }),
    model: StringColumn({
      label: 'Model',
      maxLength: 100
    }),
    active: BooleanColumn({
      label: 'Active',
      default: 'true'
    })
  },
  display: 'asset_name',
  accessible_from: 'public',
  caller_access: 'tracking',
  actions: ['create', 'read', 'update', 'delete'],
  allow_web_service_access: true,
  extensible: true
})