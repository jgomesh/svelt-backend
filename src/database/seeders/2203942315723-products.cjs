module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('products',
      [{
        name: 'Bone Lacoste',
        price: 120.20,
        url_image: 'http://192.168.0.102:3001/images/bone_lacoste.jpg',
        seller_id: 1
      },
      {
        name: 'Moletom Tommy',
        price: 570.50,
        url_image: 'http://192.168.0.102:3001/images/moletom_tommy.jpg',
        seller_id: 1
      },
      {
        name: 'Bolsa Gucci',
        price: 2200.49,
        url_image: 'http://192.168.0.102:3001/images/gucci_bag.jpeg',
        seller_id: 1
      },
      {
        name: 'Chinelo Gucci',
        price: 3500.50,
        url_image: 'http://192.168.0.102:3001/images/chinelo_gucci.jpeg',
        seller_id: 1
      },
      {
        name: 'Cinto Off White',
        price: 800.19,
        url_image: 'http://192.168.0.102:3001/images/cinto_off_white.png',
        seller_id: 1
      },
      {
        name: 'Bermuda Lacoste',
        price: 140.49,
        url_image: 'http://192.168.0.102:3001/images/bermuda_lacoste.jpg',
        seller_id: 1
      },
      {
        name: 'Carteira Prada',
        price: 400.99,
        url_image: 'http://192.168.0.102:3001/images/carteira_prada.jpg',
        seller_id: 1
      },
      {
        name: 'Moletom Hugo Boss',
        price: 400.79,
        url_image: 'http://192.168.0.102:3001/images/moletom_huggo_boss.jpg',
        seller_id: 1
      },
      {
        name: 'Moletom Lacoste',
        price: 300.57,
        url_image: 'http://192.168.0.102:3001/images/moletom_lacoste.jpg',
        seller_id: 1
      },
      {
        name: 'Calça Gucci',
        price: 3540.49,
        url_image: 'http://192.168.0.102:3001/images/calca_gucci.jpeg',
        seller_id: 1
      },
      {
        name: 'Bermuda Hugo Boss',
        price: 280.89,
        url_image: 'http://192.168.0.102:3001/images/bermuda_hugo_boss.jpeg',
        seller_id: 3
      },
      {
        name: 'Chinelo Lacoste',
        price: 200.57,
        url_image: 'http://192.168.0.102:3001/images/chinelo_lacoste.jpeg',
        seller_id: 3
      },
    ], { timestamps: false });
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('products', null, {});
  },
};