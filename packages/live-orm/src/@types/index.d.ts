export type Table = {
  TABLE_CATALOG: string
  TABLE_SCHEMA: string
  TABLE_NAME: string
  TABLE_TYPE: string
  ENGINE: string
  VERSION: number
  ROW_FORMAT: string
  TABLE_ROWS: number
  AVG_ROW_LENGTH: number
  DATA_LENGTH: number
  MAX_DATA_LENGTH: number
  INDEX_LENGTH: number
  DATA_FREE: number
  AUTO_INCREMENT: number
  CREATE_TIME: Date
  UPDATE_TIME: Date
  CHECK_TIME: Date
  TABLE_COLLATION: string
  CHECKSUM: number
  CREATE_OPTIONS: string
  TABLE_COMMENT: string
}

export type Column = {
  TABLE_CATALOG: string
  TABLE_SCHEMA: string
  TABLE_NAME: string
  COLUMN_NAME: string
  ORDINAL_POSITION: number
  COLUMN_DEFAULT: string
  IS_NULLABLE: string
  DATA_TYPE: string
  CHARACTER_MAXIMUM_LENGTH: number
  CHARACTER_OCTET_LENGTH: number
  NUMERIC_PRECISION: number
  NUMERIC_SCALE: number
  DATETIME_PRECISION: number
  CHARACTER_SET_NAME: string
  COLLATION_NAME: string
  COLUMN_TYPE: string
  COLUMN_KEY: string
  EXTRA: string
  PRIVILEGES: string
  COLUMN_COMMENT: string
  GENERATION_EXPRESSION: string
  SRS_ID: number
}

export type TableConstraint = {
  CONSTRAINT_CATALOG: string
  CONSTRAINT_SCHEMA: string
  CONSTRAINT_NAME: string
  TABLE_SCHEMA: string
  TABLE_NAME: string
  CONSTRAINT_TYPE: string
  ENFORCED: string
}

export type KeyColumnUsage = {
  CONSTRAINT_CATALOG: string
  CONSTRAINT_SCHEMA: string
  CONSTRAINT_NAME: string
  TABLE_CATALOG: string
  TABLE_SCHEMA: string
  TABLE_NAME: string
  COLUMN_NAME: string
  ORDINAL_POSITION: number
  POSITION_IN_UNIQUE_CONSTRAINT: number
  REFERENCED_TABLE_SCHEMA: string
  REFERENCED_TABLE_NAME: string
  REFERENCED_COLUMN_NAME: string
}

export type Statistic = {
  TABLE_CATALOG: string
  TABLE_SCHEMA: string
  TABLE_NAME: string
  NON_UNIQUE: number
  INDEX_SCHEMA: string
  INDEX_NAME: string
  SEQ_IN_INDEX: number
  COLUMN_NAME: string
  COLLATION: string
  CARDINALITY: number
  SUB_PART: number
  PACKED: string // binary
  NULLABLE: string
  INDEX_TYPE: string
  COMMENT: string
  INDEX_COMMENT: string
  IS_VISIBLE: string
  EXPRESSION: string
}
