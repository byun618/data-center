import { DataTypes, NonAttribute, Sequelize } from 'sequelize'
import { DataCenterModel, DataCenterAttributes } from '../model.helper'
import { LiveColumn } from './live-column'

export class LiveTable extends DataCenterModel<LiveTable> {
  declare schema: string
  declare name: string
  declare comment: string

  declare liveColumns: NonAttribute<LiveColumn[]>
}

export const initLiveTable = (sequelize: Sequelize) =>
  LiveTable.init(
    {
      ...DataCenterAttributes,
      schema: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_schema_name',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_schema_name',
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'liveTable',
    },
  )

export const initLiveTableAssociations = () => {
  LiveTable.hasMany(LiveColumn)
}
