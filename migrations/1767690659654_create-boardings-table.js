/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('boardings', {
    id: 'id',
    trip_id: {
      type: 'integer',
      notNull: true,
      references: '"trips"',
      onDelete: 'cascade',
    },
    user_id: {
      type: 'integer',
      notNull: true,
      references: '"users"',
      onDelete: 'cascade',
    },
    boarding_bus_stop_id: {
      type: 'integer',
      notNull: true,
      references: '"bus_stops"',
      onDelete: 'cascade',
    },
    boarded_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('boardings');
};

