import { Sequelize } from 'sequelize'
import {
  LiveTable,
  initLiveTable,
  initLiveTableAssociations,
} from './models/live-table'
import {
  LiveColumn,
  initLiveColumn,
  initLiveColumnAssociations,
} from './models/live-column'
import {
  LiveIndex,
  initLiveIndex,
  initLiveIndexAssociations,
} from './models/live-index'
import {
  LiveConstraint,
  initLiveConstraint,
  initLiveConstraintAssociations,
} from './models/live-constraint'

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'data_center',
  username: String(process.env.DATA_CENTER_RDS_USER),
  password: String(process.env.DATA_CENTER_RDS_PASSWORD),
  host: String(process.env.DATA_CENTER_RDS_HOST),
  port: Number(process.env.DATA_CENTER_RDS_PORT),
  pool: {
    max: 100,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
  timezone: '+09:00',
  logging: process.env.LOGGING === 'true' ? console.log : false,
})

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// sequelize.dialect.supports.schemas = true

const initModels = () => {
  initLiveTable(sequelize)
  initLiveColumn(sequelize)
  initLiveIndex(sequelize)
  initLiveConstraint(sequelize)
}

const initAssociations = () => {
  initLiveTableAssociations()
  initLiveColumnAssociations()
  initLiveIndexAssociations()
  initLiveConstraintAssociations()
}

initModels()
initAssociations()

export { LiveTable, LiveColumn, LiveIndex, LiveConstraint, sequelize }
