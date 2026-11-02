'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Komiks', [
      {
        title: 'Naruto Shippuden',
        description: 'Perjalanan ninja Uzumaki Naruto dalam menggapai impian menjadi Hokage.',
        author: 'Masashi Kishimoto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'One Piece',
        description: 'Petualangan Monkey D. Luffy dan kru Topi Jerami menjelajahi lautan Grand Line.',
        author: 'Eiichiro Oda',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Detective Conan',
        description: 'Kisah detektif SMA Shinichi Kudo yang memecahkan berbagai kasus kejahatan misterius.',
        author: 'Gosho Aoyama',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Komiks', null, {});
  }
};
