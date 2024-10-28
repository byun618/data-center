import { DataTypes, ForeignKey, Sequelize } from 'sequelize'
import { DataCenterModel, DataCenterAttributes } from '../model.helper'
import { LiveColumn } from './live-column'
import { LiveTable } from './live-table'

export class LiveConstraint extends DataCenterModel<LiveConstraint> {
  declare name: string
  declare type: string

  declare liveTableId: ForeignKey<LiveTable['id']>
  declare liveColumnId: ForeignKey<LiveColumn['id']>
  declare referencedLiveTableId: ForeignKey<LiveTable['id']> | null
  declare referencedLiveColumnId: ForeignKey<LiveColumn['id']> | null
}

export const initLiveConstraint = (sequelize: Sequelize) =>
  LiveConstraint.init(
    {
      ...DataCenterAttributes,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_table_column_constraint',
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: 'unique_table_column_constraint',
      },
      liveTableId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_table_column_constraint',
      },
      liveColumnId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: 'unique_table_column_constraint',
      },
      referencedLiveTableId: {
        type: DataTypes.INTEGER,
      },
      referencedLiveColumnId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'liveConstraint',
    },
  )

export const initLiveConstraintAssociations = () => {
  LiveConstraint.belongsTo(LiveTable)
  LiveConstraint.belongsTo(LiveColumn)
  LiveConstraint.belongsTo(LiveTable, {
    as: 'referencedLiveTable',
  })
  LiveConstraint.belongsTo(LiveColumn, {
    as: 'referencedLiveColumn',
  })
}
