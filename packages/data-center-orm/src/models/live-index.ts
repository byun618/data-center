import { DataTypes, ForeignKey, Sequelize } from 'sequelize'
import { DataCenterModel, DataCenterAttributes } from '../model.helper'
import { LiveColumn } from './live-column'
import { LiveTable } from './live-table'

export class LiveIndex extends DataCenterModel<LiveIndex> {
  declare name: string

  declare liveTableId: ForeignKey<LiveTable['id']>
  declare liveColumnId: ForeignKey<LiveColumn['id']>
}

export const initLiveIndex = (sequelize: Sequelize) =>
  LiveIndex.init(
    {
      ...DataCenterAttributes,
      liveTableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_table_column_index',
      },
      liveColumnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_table_column_index',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_table_column_index',
      },
    },
    {
      sequelize,
      modelName: 'liveIndex',
    },
  )

export const initLiveIndexAssociations = () => {
  LiveIndex.belongsTo(LiveTable)
  LiveIndex.belongsTo(LiveColumn)
}
