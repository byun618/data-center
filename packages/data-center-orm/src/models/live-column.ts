import {
  BelongsToGetAssociationMixin,
  DataTypes,
  ForeignKey,
  NonAttribute,
  Sequelize,
} from 'sequelize'
import { DataCenterModel, DataCenterAttributes } from '../model.helper'
import { LiveTable } from './live-table'

export class LiveColumn extends DataCenterModel<LiveColumn> {
  declare name: string
  declare isNullable: boolean
  declare dataType: string
  declare comment: string

  declare liveTableId: ForeignKey<LiveTable['id']>

  declare liveTable: NonAttribute<LiveTable>

  declare getLiveTable: BelongsToGetAssociationMixin<LiveTable>
}

export const initLiveColumn = (sequelize: Sequelize) =>
  LiveColumn.init(
    {
      ...DataCenterAttributes,
      liveTableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_table_column',
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_table_column',
      },
      isNullable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      dataType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'liveColumn',
    },
  )

export const initLiveColumnAssociations = () => {
  LiveColumn.belongsTo(LiveTable)
}
