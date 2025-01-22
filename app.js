// fonksiyon parametresinde destructuring işlemi yaparak arrow function içinde kullanımı
const userInfoFunc = ({ name, surname, hobbies }) => {
    
    // Spread operatörü kullanımı
    const allHobbies = [...hobbies, "Reading"];

    // Template literals kullanımı
    return `Name: ${name}, Surname: ${surname}, Hobbies: ${allHobbies.join(', ')}`;
};

// Örnek kullanıcı verisi
const user = {
    name: "Emrullah",
    surname:"Yavuz",
    hobbies: ["Coding", "Gaming"]
};


console.log(userInfoFunc(user));
