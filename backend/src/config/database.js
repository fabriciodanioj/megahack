module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'megahack',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
