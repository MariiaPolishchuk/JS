
//1
function orderPizza() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const pizzaIsReady = true;
            if (pizzaIsReady) {
                resolve('Pizza is ready')
            } else {
                reject('It cant be ready')
            }
        }, 2000);
    })
}

orderPizza()
    .then(message => {
        console.log(message);
        console.log('We can eat!')
    })
    .catch(error => {
        console.log(error)
    })

//2

function areYouSure() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const statusPizza = true;
            if (statusPizza) {
                resolve('Pizza will be ready soon')
            } else {
                reject('You have cancelled')
            }
        }, 1000);
    })
}

areYouSure('Do you confirm your order?')
    .then(message => {
        console.log(message);
        console.log('You have confirmed your order')
    })
    .catch(error => {
        console.log(error)
    })




//3

function delay(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, ms)
    });
}

delay(2000)
    .then(() => console.log('Hello!'))

// --- # 
function getUserInfo() {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve({ name: 'Vic', age: 21, id: 1 } ), 1000);
    });
}

function getUserAvatar(userInfo) {
    return new Promise(function(resolve, reject) {
        userInfo.avatar = 'https://previews.123rf.com/images/stockgiu/stockgiu1708/stockgiu170802061/83728179-avatar-sketch-of-a-funny-man-s-haed-with-sunglasses-and-hairstyle-design.jpg'
        setTimeout(() => resolve(userInfo), 1000);
    });
}

function getUserAdditionalInfo(userInfo) {
    return new Promise(function(resolve, reject) {
        userInfo.interests = ['sport', 'books'];
        setTimeout(() => resolve(userInfo), 1000);
    });
}

getUserInfo()
    .then((userInfo) => userInfo)
    .then((userInfo1) => getUserAvatar(userInfo1))
    .then((userInfo2) => getUserAdditionalInfo(userInfo2))
    .then((finalRes) => console.log(finalRes))

//--- # 
new Promise(function(resolve, reject) {
    setTimeout(() => resolve({ name: 'Vic', age: 21, id: 1 } ), 1000);
})
.then(function(userInfo) {
    return new Promise(function(resolve, reject) {
        setTimeout(() => reject(new Error('wrong data') ), 1000);
    });
})
.catch((err) => {
    console.warn(err);
})