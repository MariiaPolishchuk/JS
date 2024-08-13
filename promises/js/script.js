
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

let studentIdCounter = 2;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getUserInfo() {
    return new Promise(resolve => {
        setTimeout(() => resolve({ name: 'Vic', age: 21, id: 1, prof: 'student' }), 1000);
    });
}

function getUserAvatar(userInfo) {
    return new Promise(resolve => {
        userInfo.avatar = 'https://previews.123rf.com/images/stockgiu/stockgiu1708/stockgiu170802061/83728179-avatar-sketch-of-a-funny-man-s-haed-with-sunglasses-and-hairstyle-design.jpg';
        setTimeout(() => resolve(userInfo), 1000);
    });
}

function getUserAdditionalInfo(userInfo) {
    return new Promise(resolve => {
        userInfo.interests = ['sport', 'books'];
        setTimeout(() => resolve(userInfo), 1000);
    });
}

const btn = document.querySelector('.button');
const container = document.querySelector('.container');
let confirmDiv;

btn.addEventListener('click', () => {
    btn.classList.toggle('active-btn');
    const userInfoDiv = document.querySelector('.user-info');

    userInfoDiv.innerHTML = '';
    userInfoDiv.classList.remove('active');

    getUserInfo()
        .then(userInfo => {
            userInfoDiv.classList.add('active');
            userInfoDiv.innerHTML = `<h2>${userInfo.id}. ${userInfo.name} (${userInfo.prof})</h2>`;
            return getUserAvatar(userInfo);
        })
        .then(userInfo => {
            userInfoDiv.innerHTML += `<p><strong>Age:</strong> ${userInfo.age}</p>`;
            return getUserAdditionalInfo(userInfo);
        })
        .then(userInfo => {
            userInfoDiv.innerHTML += `<img src="${userInfo.avatar}" alt="Avatar">`;
            return delay(1000).then(() => {
                userInfoDiv.innerHTML += `<p><strong>Interests:</strong> ${userInfo.interests.join(', ')}</p>`;
            });
        })
        .then(() => {
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button fade-in';
            deleteButton.textContent = 'Hide';
            userInfoDiv.appendChild(deleteButton);
            setTimeout(() => deleteButton.classList.add('visible'), 1000);

            deleteButton.addEventListener('click', () => {
                userInfoDiv.classList.remove('active');
                userInfoDiv.innerHTML = ''; 
                btn.classList.remove('active-btn'); 

                if (confirmDiv) {
                    confirmDiv.classList.remove('visible');
                    setTimeout(() => confirmDiv.remove(), 500);
                }
            });
        })
        .then(() => {
            return new Promise((resolve) => {
                confirmDiv = document.createElement('div'); 
                confirmDiv.className = 'confirm-div fade-in';
                confirmDiv.innerHTML = `
                    <p>Is this your student?</p>
                    <button class="confirm-yes">Yes</button>
                    <button class="confirm-no">No</button>
                `;
                container.appendChild(confirmDiv);
                setTimeout(() => confirmDiv.classList.add('visible'), 1000);

                document.querySelector('.confirm-yes').addEventListener('click', () => {
                    resolve('yes');
                });
                document.querySelector('.confirm-no').addEventListener('click', () => {
                    resolve('no');
                });
            });
        })
        .then(answer => {
            if (confirmDiv) {
                confirmDiv.classList.remove('visible');
                setTimeout(() => confirmDiv.remove(), 500);
            }

            if (answer === 'yes') {
                userInfoDiv.innerHTML = `<p>Great!</p>`;

                const deleteButton = document.createElement('button');
                deleteButton.className = 'delete-button fade-in';
                deleteButton.textContent = 'Hide';
                userInfoDiv.appendChild(deleteButton);
                setTimeout(() => deleteButton.classList.add('visible'), 1000);

                deleteButton.addEventListener('click', () => {
                    userInfoDiv.classList.remove('active');
                    userInfoDiv.innerHTML = ''; 
                    btn.classList.remove('active-btn'); 
                });

            } else {
        
                container.querySelector('.student-form')?.remove();
                container.querySelector('.confirm-div')?.remove();

                container.innerHTML += `
                    <p>Would you like to add your own student?</p>
                    <form class="student-form">
                        <input type="text" name="name" placeholder="Name" required>
                        <input type="number" name="age" placeholder="Age" required>
                        <input type="text" name="profession" placeholder="Profession" required>
                        <button type="submit">Add Student</button>
                        <button type="button" class="cancel-button">Cancel</button>
                    </form>
                `;

                document.querySelector('.student-form').addEventListener('submit', (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newStudent = {
                        id: studentIdCounter++,
                        name: formData.get('name'),
                        age: formData.get('age'),
                        prof: formData.get('profession')
                    };

                    const studentDiv = document.createElement('div');
                    studentDiv.className = 'student-item';
                    studentDiv.innerHTML = `
                     <h2>${newStudent.id}. ${newStudent.name} (${newStudent.prof})</h2>
                        <p><strong>Age:</strong> ${newStudent.age}</p>
                    `;
                    const studentsList = document.querySelector('.students-list');
                    
              
                    if (studentsList) {
                        studentsList.appendChild(studentDiv);
                    } else {
                        console.error('Students list container not found');
                    }

                    e.target.reset();
                });

          
                document.querySelector('.cancel-button').addEventListener('click', () => {
               
                    container.querySelector('.student-form')?.remove();
                    container.querySelector('.confirm-div')?.remove();

                    userInfoDiv.innerHTML = ''; 
                    userInfoDiv.classList.remove('active'); 

                    btn.classList.remove('active-btn'); 
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});








//4 отмена/gpt generator (РАЗОБРАТЬ!)

// let studentIdCounter = 2;
// let abortController = new AbortController();

// function delay(ms) {
//     return new Promise((resolve, reject) => {
//         const id = setTimeout(() => {
//             resolve();
//         }, ms);

//         abortController.signal.addEventListener('abort', () => {
//             clearTimeout(id);
//             reject(new Error('Operation aborted'));
//         });
//     });
// }

// function getUserInfo() {
//     return new Promise((resolve, reject) => {
//         const id = setTimeout(() => {
//             resolve({ name: 'Vic', age: 21, id: 1, prof: 'student' });
//         }, 1000);

//         abortController.signal.addEventListener('abort', () => {
//             clearTimeout(id);
//             reject(new Error('Operation aborted'));
//         });
//     });
// }

// function getUserAvatar(userInfo) {
//     return new Promise((resolve, reject) => {
//         userInfo.avatar = 'https://previews.123rf.com/images/stockgiu/stockgiu1708/stockgiu170802061/83728179-avatar-sketch-of-a-funny-man-s-haed-with-sunglasses-and-hairstyle-design.jpg';
//         const id = setTimeout(() => resolve(userInfo), 1000);

//         abortController.signal.addEventListener('abort', () => {
//             clearTimeout(id);
//             reject(new Error('Operation aborted'));
//         });
//     });
// }

// function getUserAdditionalInfo(userInfo) {
//     return new Promise((resolve, reject) => {
//         userInfo.interests = ['sport', 'books'];
//         const id = setTimeout(() => resolve(userInfo), 1000);

//         abortController.signal.addEventListener('abort', () => {
//             clearTimeout(id);
//             reject(new Error('Operation aborted'));
//         });
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     const btn = document.querySelector('.button');
//     const clearBtn = document.querySelector('.clear-button');
//     const container = document.querySelector('.container');
//     let confirmDiv;

//     function clearAll() {
//         if (abortController) {
//             abortController.abort();
//         }

//         const userInfoDiv = document.querySelector('.user-info');
//         const studentsList = document.querySelector('.students-list');

//         userInfoDiv.innerHTML = '';
//         userInfoDiv.classList.remove('active');
//         studentsList.innerHTML = '';

//         container.querySelector('.student-form')?.remove();
//         container.querySelector('.confirm-div')?.remove();
//         container.querySelector('p')?.remove();

//         btn.classList.remove('active-btn');

//         // Сброс счётчика идентификаторов студентов
//         studentIdCounter = 2;

//         // Создаем новый AbortController для следующей операции
//         abortController = new AbortController();
//     }

//     btn.addEventListener('click', () => {
//         clearAll(); // Очистка перед началом новой цепочки

//         btn.classList.toggle('active-btn');
//         const userInfoDiv = document.querySelector('.user-info');

//         userInfoDiv.innerHTML = '';
//         userInfoDiv.classList.remove('active');

//         getUserInfo()
//             .then(userInfo => {
//                 userInfoDiv.classList.add('active');
//                 userInfoDiv.innerHTML = `<h2>${userInfo.id}. ${userInfo.name} (${userInfo.prof})</h2>`;
//                 return getUserAvatar(userInfo);
//             })
//             .then(userInfo => {
//                 userInfoDiv.innerHTML += `<p><strong>Age:</strong> ${userInfo.age}</p>`;
//                 return getUserAdditionalInfo(userInfo);
//             })
//             .then(userInfo => {
//                 userInfoDiv.innerHTML += `<img src="${userInfo.avatar}" alt="Avatar">`;
//                 return delay(1000).then(() => {
//                     userInfoDiv.innerHTML += `<p><strong>Interests:</strong> ${userInfo.interests.join(', ')}</p>`;
//                 });
//             })
//             .then(() => {
//                 const deleteButton = document.createElement('button');
//                 deleteButton.className = 'delete-button fade-in';
//                 deleteButton.textContent = 'Hide';
//                 userInfoDiv.appendChild(deleteButton);
//                 setTimeout(() => deleteButton.classList.add('visible'), 1000);

//                 deleteButton.addEventListener('click', () => {
//                     userInfoDiv.classList.remove('active');
//                     userInfoDiv.innerHTML = ''; 
//                     btn.classList.remove('active-btn');

//                     if (confirmDiv) {
//                         confirmDiv.classList.remove('visible');
//                         setTimeout(() => confirmDiv.remove(), 500);
//                     }
//                 });
//             })
//             .then(() => {
//                 return new Promise((resolve) => {
//                     confirmDiv = document.createElement('div'); 
//                     confirmDiv.className = 'confirm-div fade-in';
//                     confirmDiv.innerHTML = `
//                         <p>Is this your student?</p>
//                         <button class="confirm-yes">Yes</button>
//                         <button class="confirm-no">No</button>
//                     `;
//                     container.appendChild(confirmDiv);
//                     setTimeout(() => confirmDiv.classList.add('visible'), 1000);

//                     document.querySelector('.confirm-yes').addEventListener('click', () => {
//                         resolve('yes');
//                     });
//                     document.querySelector('.confirm-no').addEventListener('click', () => {
//                         resolve('no');
//                     });
//                 });
//             })
//             .then(answer => {
//                 if (confirmDiv) {
//                     confirmDiv.classList.remove('visible');
//                     setTimeout(() => confirmDiv.remove(), 500);
//                 }

//                 if (answer === 'yes') {
//                     userInfoDiv.innerHTML = `<p>Great!</p>`;

//                     const deleteButton = document.createElement('button');
//                     deleteButton.className = 'delete-button fade-in';
//                     deleteButton.textContent = 'Hide';
//                     userInfoDiv.appendChild(deleteButton);
//                     setTimeout(() => deleteButton.classList.add('visible'), 1000);

//                     deleteButton.addEventListener('click', () => {
//                         userInfoDiv.classList.remove('active');
//                         userInfoDiv.innerHTML = ''; 
//                         btn.classList.remove('active-btn'); 
//                     });

//                 } else {
//                     container.querySelector('.student-form')?.remove();
//                     container.querySelector('.confirm-div')?.remove();

//                     const studentForm = document.createElement('form');
//                     studentForm.className = 'student-form';
//                     studentForm.innerHTML = `
//                         <p>Would you like to add your own student?</p>
//                         <input type="text" name="name" placeholder="Name" required>
//                         <input type="number" name="age" placeholder="Age" required>
//                         <input type="text" name="profession" placeholder="Profession" required>
//                         <button type="submit">Add Student</button>
//                         <button type="button" class="cancel-button">Cancel</button>
//                     `;
//                     container.appendChild(studentForm);

//                     studentForm.addEventListener('submit', (e) => {
//                         e.preventDefault();
//                         const formData = new FormData(e.target);
//                         const newStudent = {
//                             id: studentIdCounter++,
//                             name: formData.get('name'),
//                             age: formData.get('age'),
//                             prof: formData.get('profession')
//                         };

//                         const studentDiv = document.createElement('div');
//                         studentDiv.className = 'student-item';
//                         studentDiv.innerHTML = `
//                          <h2>${newStudent.id}. ${newStudent.name} (${newStudent.prof})</h2>
//                             <p><strong>Age:</strong> ${newStudent.age}</p>
//                         `;
//                         const studentsList = document.querySelector('.students-list');
                        
//                         if (studentsList) {
//                             studentsList.appendChild(studentDiv);
//                         } else {
//                             console.error('Students list container not found');
//                         }

//                         e.target.reset();
//                     });

//                     document.querySelector('.cancel-button').addEventListener('click', () => {
//                         studentForm.remove();
//                         userInfoDiv.innerHTML = ''; 
//                         userInfoDiv.classList.remove('active'); 

//                         btn.classList.remove('active-btn');
//                     });
//                 }
//             })
//             .catch(error => {
//                 if (error.message !== 'Operation aborted') {
//                     console.error('Error:', error);
//                 }
//             });
//     });

//     clearBtn.addEventListener('click', clearAll);
// });
