import { QueryTypes, Sequelize } from 'sequelize'
import {
  Column,
  TableConstraint,
  Table,
  KeyColumnUsage,
  Statistic,
} from './@types'

const sequelize = new Sequelize({
  dialect: 'mysql',
  username: String(process.env.LIVE_RDS_USER),
  password: String(process.env.LIVE_RDS_PASSWORD),
  host: String(process.env.LIVE_RDS_HOST),
  port: Number(process.env.LIVE_RDS_PORT),
  pool: {
    max: 100,
    min: 0,
    idle: 20000,
    acquire: 20000,
  },
  timezone: '+09:00',
  logging: process.env.LOGGING === 'true' ? console.log : false,
})

export const schemas = ['ncnc_pro', 'payment']

/**
 * 스키마의 테이블 목록을 가져옵니다.
 */
export const getTables = async (schema: string) => {
  const tables = await sequelize.query<Table>(
    `
    SELECT
        TABLE_SCHEMA
      , TABLE_NAME
      , TABLE_COMMENT
    FROM
        information_schema.TABLES
    WHERE
          TABLE_SCHEMA = '${schema}'
  `,
    {
      type: QueryTypes.SELECT,
    },
  )

  return tables.map((table) => ({
    schema: table.TABLE_SCHEMA,
    name: table.TABLE_NAME,
    comment: table.TABLE_COMMENT,
  }))
}

/**
 * 테이블의 간략한 정보를 가져옵니다.
 */
export const getTable = async (schema: string, tableName: string) => {
  const [table] = await sequelize.query<Table>(
    `
    SELECT
        TABLE_SCHEMA
      , TABLE_NAME
      , TABLE_COMMENT
    FROM
        information_schema.TABLES
    WHERE
          TABLE_SCHEMA = '${schema}'
          AND TABLE_NAME = '${tableName}'
  `,
    {
      type: QueryTypes.SELECT,
    },
  )

  return {
    schema: table.TABLE_SCHEMA,
    name: table.TABLE_NAME,
    comment: table.TABLE_COMMENT,
  }
}

/**
 * 테이블의 컬럼의 목록과 정보를 가져옵니다.
 */
export const getColumns = async (schema: string, tableName: string) => {
  const columns = await sequelize.query<Column>(
    `
    SELECT
      TABLE_SCHEMA
    , TABLE_NAME
    , COLUMN_NAME
    , IS_NULLABLE
    , DATA_TYPE
    , COLUMN_TYPE
    , COLUMN_KEY
    , COLUMN_COMMENT
    FROM
        information_schema.COLUMNS
    WHERE
          TABLE_SCHEMA = '${schema}'
          AND TABLE_NAME = '${tableName}'
    ORDER BY
      ORDINAL_POSITION
  `,
    {
      type: QueryTypes.SELECT,
    },
  )

  return columns.map((column) => ({
    tableSchema: column.TABLE_SCHEMA,
    tableName: column.TABLE_NAME,
    name: column.COLUMN_NAME,
    isNullable: column.IS_NULLABLE === 'YES',
    dataType: column.COLUMN_TYPE,
    comment: column.COLUMN_COMMENT,
  }))
}

/**
 * 테이블의 제약 조건을 가져옵니다.
 */
export const getConstraints = async (schema: string, tableName: string) => {
  const constraints = await sequelize.query<TableConstraint & KeyColumnUsage>(
    `
    SELECT
        TABLE_CONSTRAINTS.TABLE_SCHEMA
      , TABLE_CONSTRAINTS.TABLE_NAME
      , KEY_COLUMN_USAGE.COLUMN_NAME
      , TABLE_CONSTRAINTS.CONSTRAINT_NAME
      , TABLE_CONSTRAINTS.CONSTRAINT_TYPE
      , KEY_COLUMN_USAGE.REFERENCED_TABLE_SCHEMA
      , KEY_COLUMN_USAGE.REFERENCED_TABLE_NAME
      , KEY_COLUMN_USAGE.REFERENCED_COLUMN_NAME
    FROM
        information_schema.TABLE_CONSTRAINTS
        LEFT JOIN information_schema.KEY_COLUMN_USAGE
            ON TABLE_CONSTRAINTS.TABLE_SCHEMA = KEY_COLUMN_USAGE.TABLE_SCHEMA
                AND TABLE_CONSTRAINTS.TABLE_NAME = KEY_COLUMN_USAGE.TABLE_NAME
                AND TABLE_CONSTRAINTS.CONSTRAINT_NAME = KEY_COLUMN_USAGE.CONSTRAINT_NAME
    WHERE
          TABLE_CONSTRAINTS.TABLE_SCHEMA = '${schema}'
      AND TABLE_CONSTRAINTS.TABLE_NAME = '${tableName}'
    `,
    {
      type: QueryTypes.SELECT,
    },
  )

  return constraints.map((constraint) => ({
    name: constraint.CONSTRAINT_NAME,
    type: constraint.CONSTRAINT_TYPE,
    tableSchema: constraint.TABLE_SCHEMA,
    tableName: constraint.TABLE_NAME,
    columnName: constraint.COLUMN_NAME,
    referencedTableSchema: constraint.REFERENCED_TABLE_SCHEMA,
    referencedTableName: constraint.REFERENCED_TABLE_NAME,
    referencedColumnName: constraint.REFERENCED_COLUMN_NAME,
  }))
}

/**
 * 테이블의 인덱스를 가져옵니다.
 */
export const getIndexes = async (schema: string, tableName: string) => {
  const indexes = await sequelize.query<Statistic>(
    `
    SELECT
        STATISTICS.TABLE_SCHEMA,
        STATISTICS.TABLE_NAME,
        STATISTICS.COLUMN_NAME,
        STATISTICS.INDEX_NAME
    FROM
        information_schema.STATISTICS
    WHERE
          TABLE_SCHEMA = '${schema}'
      AND TABLE_NAME = '${tableName}'
    `,
    {
      type: QueryTypes.SELECT,
    },
  )

  return indexes.map((index) => ({
    tableSchema: index.TABLE_SCHEMA,
    tableName: index.TABLE_NAME,
    columnName: index.COLUMN_NAME,
    name: index.INDEX_NAME,
  }))

  // group by 할 일 있다면 아래와 같이
  // const indexes = Object.values(
  //   rawIndexes.reduce<
  //     Record<
  //       string,
  //       {
  //         TABLE_SCHEMA: string
  //         TABLE_NAME: string
  //         INDEX_NAME: string
  //         COLUMN_NAMES: string[]
  //       }
  //     >
  //   >((acc, cur) => {
  //     const { TABLE_SCHEMA, TABLE_NAME, INDEX_NAME, COLUMN_NAME } = cur
  //     if (!acc[INDEX_NAME]) {
  //       acc[INDEX_NAME] = {
  //         TABLE_SCHEMA,
  //         TABLE_NAME,
  //         INDEX_NAME,
  //         COLUMN_NAMES: [],
  //       }
  //     }
  //     acc[INDEX_NAME].COLUMN_NAMES.push(COLUMN_NAME)
  //     return acc
  //   }, {}),
  // )

  // return indexes.map((index) => ({
  //   tableSchema: index.TABLE_SCHEMA,
  //   tableName: index.TABLE_NAME,
  //   name: index.INDEX_NAME,
  //   columnNames: index.COLUMN_NAMES,
  // }))
}
