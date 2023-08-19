const model = require('../models/homeModel');
const { extractUserIDFromToken } = require('../util/common');
module.exports = {
  getHomepage: async (req, res) => {
    let userId;
    if (process.env.HAS_ACCOUNT === 'true') {
      console.log('user has login');
      userId = extractUserIDFromToken(req);
    }
    const leisureShops = await model.getHomepage(userId, '休閒');
    let leisureArr = [];
    if (process.env.HAS_ACCOUNT === 'true') {
      for (let i = 0; i < leisureShops.length; i++) {
        const obj = {
          id: leisureShops[i].id,
          name: leisureShops[i].shop_name,
          primary_image: leisureShops[i].primary_image,
          address: leisureShops[i].address,
          operating_status: leisureShops[i].operating_status,
          wishlist_item: leisureShops[i].wishlist_item,
          seats: leisureShops[i].seat_info,
        };
        leisureArr.push({ ...obj });
      }
    } else {
      for (let i = 0; i < leisureShops.length; i++) {
        const obj = {
          id: leisureShops[i].id,
          name: leisureShops[i].shop_name,
          primary_image: leisureShops[i].primary_image,
          address: leisureShops[i].address,
          operating_status: leisureShops[i].operating_status,
          wishlist_item: leisureShops[i].wishlist_item,
          seats: leisureShops[i].seat_info,
        };
        leisureArr.push({ ...obj });
      }
    }
    const petShops = await model.getHomepage(userId, '寵物');
    let pstShopsArr = [];
    if (process.env.HAS_ACCOUNT === 'true') {
      for (let i = 0; i < petShops.length; i++) {
        const obj = {
          id: petShops[i].id,
          name: petShops[i].shop_name,
          primary_image: petShops[i].primary_image,
          address: petShops[i].address,
          operating_status: petShops[i].operating_status,
          wishlist_item: petShops[i].wishlist_item,
          seats: petShops[i].seat_info,
        };
        pstShopsArr.push({ ...obj });
      }
    } else {
      for (let i = 0; i < petShops.length; i++) {
        const obj = {
          id: petShops[i].id,
          name: petShops[i].shop_name,
          primary_image: petShops[i].primary_image,
          address: petShops[i].address,
          operating_status: petShops[i].operating_status,
          wishlist_item: petShops[i].wishlist_item,
          seats: petShops[i].seat_info,
        };
        pstShopsArr.push({ ...obj });
      }
    }
    const workShops = await model.getHomepage(userId, '工作');
    let workArr = [];
    if (process.env.HAS_ACCOUNT === 'true') {
      for (let i = 0; i < workShops.length; i++) {
        const obj = {
          id: workShops[i].id,
          name: workShops[i].shop_name,
          primary_image: workShops[i].primary_image,
          address: workShops[i].address,
          operating_status: workShops[i].operating_status,
          wishlist_item: workShops[i].wishlist_item,
          seats: workShops[i].seat_info,
        };
        workArr.push({ ...obj });
      }
    } else {
      for (let i = 0; i < workShops.length; i++) {
        const obj = {
          id: workShops[i].id,
          name: workShops[i].shop_name,
          primary_image: workShops[i].primary_image,
          address: workShops[i].address,
          operating_status: workShops[i].operating_status,
          wishlist_item: workShops[i].wishlist_item,
          seats: workShops[i].seat_info,
        };
        workArr.push({ ...obj });
      }
    }
    res.status(200).json({
      data: {
        shops: {
          leisure: [...leisureArr],
          pet: [...pstShopsArr],
          workspace: [...workArr],
        },
      },
    });
  },
};
