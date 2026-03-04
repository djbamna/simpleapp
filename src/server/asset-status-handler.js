import { gs } from '@servicenow/glide'

export function updateAssetStatus(current, previous) {
  // Check if the assigned_to field changed
  if (current.assigned_to.changes()) {
    const currentAssignee = current.getValue('assigned_to')
    const previousAssignee = previous.getValue('assigned_to')
    
    if (currentAssignee && !previousAssignee) {
      // Asset was assigned - set status to 'in_use' if currently available
      if (current.getValue('status') === 'available') {
        current.setValue('status', 'in_use')
        gs.addInfoMessage('Asset status updated to "In Use" as it has been assigned.')
      }
    } else if (!currentAssignee && previousAssignee) {
      // Asset was unassigned - set status to 'available' if currently in_use
      if (current.getValue('status') === 'in_use') {
        current.setValue('status', 'available')
        gs.addInfoMessage('Asset status updated to "Available" as it has been unassigned.')
      }
    }
  }
}