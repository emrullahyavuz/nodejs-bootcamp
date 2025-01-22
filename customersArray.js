const customers = [
    { id: 1, name: "Ahmet", age: 32, city: "Ankara", orders: [100, 200, 150] },
    { id: 2, name: "Ayşe", age: 27, city: "İstanbul", orders: [300, 50] },
    { id: 3, name: "Mehmet", age: 40, city: "İzmir", orders: [500, 100, 200] },
    { id: 4, name: "Fatma", age: 35, city: "Ankara", orders: [300] },
    { id: 5, name: "Zeynep", age: 28, city: "Bursa", orders: [] }
  ];


// Soru: İstanbul'da yaşayan müşterilerin isimlerini bir dizi olarak döndür.
// const customersLivingInIstanbul = customers
//                             .filter(customer => customer.city === "İstanbul")
//                             .map(customer => customer.name);
// console.log(customersLivingInIstanbul)

// ------------------------------------------------------------------------------------

// Soru: Siparişleri toplamda 300 TL’den fazla olan ilk müşterinin adını döndür.
// const orderTotal300 = customers.find(({ orders }) => (orders.reduce((sum, order) => sum + order, 0) > 300  )).name;

// console.log(orderTotal300)

// ------------------------------------------------------------------------------------

// Soru: Şehir bazında toplam sipariş miktarlarını döndür.
// const cityTotalOrder = customers.reduce((acc, customer) => {
//     const city = customer.city;
//     const totalOrder = customer.orders.reduce((sum, order) => sum + order, 0);
//     acc[city] = (acc[city] || 0) + totalOrder;
//     return acc;
//   }, {});
//   console.log(cityTotalOrder)



// Soru: Her müşterinin toplam sipariş miktarını ve yaşını bir string olarak şu formatta döndür:
// Ahmet (32): 450 TL
// const customerNameAndAge = customers
// .map(({name, age, orders}) => ({name, age, orders}))
// .map(customer => `${customer.name} (${customer.age}) ${customer.orders.reduce((sum, order) => sum + order, 0)}`)
// ;
// console.log(customerNameAndAge)


// Soru: Tüm müşterilerin siparişlerini en yüksekten en düşüğe sıralayıp tek bir dizi olarak döndür.
// const sortedOrders = customers
//     .flatMap(({ orders }) => orders)  
//     .sort((a, b) => b - a);            

// console.log(sortedOrders);
