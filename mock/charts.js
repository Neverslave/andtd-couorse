const charts_data =
 [  
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
  ]

  
  export default {
    'get /dev/charts_data': function (req, res) {
      const responseObj = charts_data;
      setTimeout(() => {
        res.json(responseObj);
      }, 1000);
    },
  };