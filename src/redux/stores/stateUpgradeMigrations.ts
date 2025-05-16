import { RootState } from '@redux/reducers'
import { MigrationManifest } from 'redux-persist'

/*
  When versions are released with breaking redux changes,
  this file should be updated to fix those changes
*/
const stateUpgradeMigrations: MigrationManifest = {
  0: (prevVersionState: RootState) => {
    return {}
  }
}

export default stateUpgradeMigrations
