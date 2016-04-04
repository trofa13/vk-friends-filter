VK.init({
  apiId: 5380999
});
VK.Auth.login(function(response) {
  if (response.session) {
    console.log('successful auth')
  } else {
<<<<<<< HEAD
  	throw new Error ('Ошибка авторизации')
=======
    throw new Error('Ошибка авторизации')
>>>>>>> master
  }
})

function genereateMarkup(friendsArr, list) {
  for (var i = 0; i < friendsArr.length; i++) {
    var li = document.createElement('li'),
      img = document.createElement('img'),
      span = document.createElement('span'),
      cross = document.createElement('a');
<<<<<<< HEAD
    li.setAttribute('draggable', true);
    li.setAttribute("ondragstart", 'return dragStart(event)' )
=======
    // li.setAttribute('draggable', true);
>>>>>>> master
    li.setAttribute('data-id', friendsArr[i].uid);
    li.className = 'friend-list-item';

    img.setAttribute('src', friendsArr[i].photo_50);
    img.className = 'friend-img';
    li.appendChild(img);

    span.textContent = friendsArr[i].first_name + ' ' + friendsArr[i].last_name;
    span.className = 'friend-name';
    li.appendChild(span);

    cross.textContent = '+';
    cross.setAttribute('href', '#')
    cross.className = 'cross';
    li.appendChild(cross);

    list.appendChild(li);
  }
}

//посылаем запрос в ВК
VK.api('friends.get', {
  'name_case': 'nom',
  'fields': 'photo_50'
}, function(response) {
  if (response.error) {
    console.log('response errror')
  } else {
<<<<<<< HEAD
//Проверяем есть ли уже сохраненный локально список друзей?
if (localStorage.getItem('savedFriendsList')) {
  var savedFriendsList = localStorage.getItem('savedFriendsList');
  savedFriendsList = JSON.parse(savedFriendsList);
//Если уже есть скохраненный список, то записываем его в лист отфильтрованных друзей
  var filteredFriends = savedFriendsList;
} else {
//Если нет  сохраненного списка друзей, то создаем пустой массив
  var filteredFriends = [];
}

    var vkResponse = response.response;
//Пробегамемся по ответу от ВК и если в ответе есть те же друзья, что и в сохраненном списке, то удаляем их из ответа ВК
    for(var i = 0; i<vkResponse.length; i++){
      for(var j = 0; j<filteredFriends.length; j++){
        if(vkResponse[i].uid == filteredFriends[j].uid){
          vkResponse.splice(i,1);
=======
    //Проверяем есть ли уже сохраненный локально список друзей?
    if (localStorage.getItem('savedFriendsList')) {
      var savedFriendsList = localStorage.getItem('savedFriendsList');
      savedFriendsList = JSON.parse(savedFriendsList);
      //Если уже есть скохраненный список, то записываем его в лист отфильтрованных друзей
      var filteredFriends = savedFriendsList;
    } else {
      //Если нет  сохраненного списка друзей, то создаем пустой массив
      var filteredFriends = [];
    }

    var vkResponse = response.response;
    //Пробегамемся по ответу от ВК и если в ответе есть те же друзья, что и в сохраненном списке, то удаляем их из ответа ВК
    for (var i = 0; i < vkResponse.length; i++) {
      for (var j = 0; j < filteredFriends.length; j++) {
        if (vkResponse[i].uid == filteredFriends[j].uid) {
          vkResponse.splice(i, 1);
>>>>>>> master
        }
      }
    }
  }
  //Отрисовываем разметку
<<<<<<< HEAD
     genereateMarkup (vkResponse, friendsList)
     if(filteredFriends.length>0){genereateMarkup (filteredFriends, rightList)}

function toRightCol(e) {
=======
  genereateMarkup(vkResponse, friendsList)
  if (filteredFriends.length > 0) {
    genereateMarkup(filteredFriends, rightList)
  }

  function toRightCol(e) {
>>>>>>> master
    if (e.target.tagName === 'A') {
      e.preventDefault();
      var userId = e.target.parentNode.dataset.id;
      rightList.appendChild(e.target.parentNode);

      for (i = 0; i < vkResponse.length; i++) {
        if (vkResponse[i].uid == userId) {
          filteredFriends.push(vkResponse[i])
          vkResponse.splice(i, 1)
<<<<<<< HEAD
          console.log(vkResponse)
=======
>>>>>>> master
        }
      }
    }
  }
  //Навешиваем обработчик на левую колонку. Он удаляет элемент из массива ответа ВК и добавляет в массив отфильтрованных друзей
  friendsList.addEventListener('click', toRightCol);

<<<<<<< HEAD
  function toLeftCol (e) {
=======
  function toLeftCol(e) {
>>>>>>> master
    if (e.target.tagName === 'A') {
      e.preventDefault();
      var userId = e.target.parentNode.dataset.id;
      friendsList.insertBefore(e.target.parentNode, friendsList.childNodes[0])

      for (i = 0; i < filteredFriends.length; i++) {
        if (filteredFriends[i].uid == userId) {
          vkResponse.push(filteredFriends[i])
          filteredFriends.splice(i, 1)
<<<<<<< HEAD
        
=======

>>>>>>> master
        }
      }
    }
  }

<<<<<<< HEAD
//Навешиваем обработчик на правую колонку. Он удаляет элемент из массива отфильтрованных друзей и возвращает его в массив ответа от ВК
  rightCol.addEventListener('click', toLeftCol);
//Drag And Drop
/*------------  -------------*/
function mover (id){
  for (var i = 0; i<vkResponse.length; i++){
    if (vkResponse[i].uid.indexOf(id) > -1) {
        console.log('meass')
        } 
  }

}
// Поиск
//Объявим функцию, рисующую разметку по результатам поиска
function searchResultGenerateMarkup (input, friendsArr, list) {
   //Объявим переменную результатов поиска - массив с объектами
      var searchResult = [];
      //Обнулим разметку в листе, если поиск не дал совпадений
       list.innerHTML = '';
       //Пробежим по массиву в левом столбце
      for (var i = 0; i<friendsArr.length; i++) {
        //объявим переменные для сравнения
        var inputValue = input.value.trim().toLowerCase();
        var friendName = friendsArr[i].first_name + friendsArr[i].last_name;
        friendName = friendName.toLowerCase();
        //Сравним значения
        if (friendName.indexOf(inputValue) > -1) {
          //обнулим разметку
=======
  //Навешиваем обработчик на правую колонку. Он удаляет элемент из массива отфильтрованных друзей и возвращает его в массив ответа от ВК
  rightCol.addEventListener('click', toLeftCol);
  //Drag And Drop
  /*------------  -------------*/

  var draggable, dragItem;
  document.addEventListener('mousedown', function(e) {

    if (e.target.tagName === 'LI') {
      draggable = true;
      dragItem = e;
      var pos = dragItem.target.getBoundingClientRect();
      dragItem.target.style.position = "absolute";
    }

    document.addEventListener('mousemove', function(e) {
      var mousePos = e;
      if (draggable) {
        dragItem.target.style.top = e.clientY + window.scrollY - pos.height / 2 + 'px';
        dragItem.target.style.left = e.clientX + window.scrollX - pos.width / 2 + 'px';

        document.addEventListener('mouseup', function(e) {

          var rightColPos = rightCol.getBoundingClientRect(),
            rightColLeft = rightColPos.left,
            rightColRight = rightColPos.right,
            rightColTop = rightColPos.top,
            rightColBottom = rightColPos.bottom,
            fitsRightColWidth = ((mousePos.clientX > rightColLeft) && (mousePos.clientX < rightColRight)),
            fitsRightColHeight = ((mousePos.clientY < rightColBottom) && (mousePos.clientY > rightColTop));

          if (fitsRightColWidth && fitsRightColHeight) {
            var userId = e.target.parentNode.dataset.id;

            for (i = 0; i < vkResponse.length; i++) {
              if (vkResponse[i].uid == userId) {
                filteredFriends.push(vkResponse[i])
                vkResponse.splice(i, 1)
              }
            }
            friendsList.innerHTML = '';
            rightList.innerHTML = '';
            genereateMarkup(vkResponse, friendsList)
            if (filteredFriends.length > 0) {
              genereateMarkup(filteredFriends, rightList)
            }
          } else {
            friendsList.innerHTML = '';
            rightList.innerHTML = '';
            genereateMarkup(vkResponse, friendsList)
            if (filteredFriends.length > 0) {
              genereateMarkup(filteredFriends, rightList)
            }
          }

          var leftColPos = friendsList.getBoundingClientRect(),
            leftColLeft = leftColPos.left,
            leftColRight = leftColPos.right,
            leftColTop = leftColPos.top,
            leftColBottom = leftColPos.bottom,
            fitsLeftColWidth = ((mousePos.clientX > leftColLeft) && (mousePos.clientX < leftColRight)),
            fitsLeftColHeight = ((mousePos.clientY < leftColBottom) && (mousePos.clientY > leftColTop));

          if (fitsLeftColWidth && fitsLeftColHeight) {
            var userId = e.target.parentNode.dataset.id;

            for (i = 0; i < filteredFriends.length; i++) {
              if (filteredFriends[i].uid == userId) {
                vkResponse.push(filteredFriends[i])
                filteredFriends.splice(i, 1)
              }
            }
            friendsList.innerHTML = '';
            rightList.innerHTML = '';
            genereateMarkup(vkResponse, friendsList)
            if (filteredFriends.length > 0) {
              genereateMarkup(filteredFriends, rightList)
            }
          } else {
            friendsList.innerHTML = '';
            rightList.innerHTML = '';
            genereateMarkup(vkResponse, friendsList)
            if (filteredFriends.length > 0) {
              genereateMarkup(filteredFriends, rightList)
            }
          }
          draggable = null;
        })

      }

    })

  })

  // Поиск
  //Объявим функцию, рисующую разметку по результатам поиска
  function searchResultGenerateMarkup(input, friendsArr, list) {
    //Объявим переменную результатов поиска - массив с объектами
    var searchResult = [];
    //Обнулим разметку в листе, если поиск не дал совпадений
    list.innerHTML = '';
    //Пробежим по массиву в левом столбце
    for (var i = 0; i < friendsArr.length; i++) {
      //объявим переменные для сравнения
      var inputValue = input.value.trim().toLowerCase();
      var friendName = friendsArr[i].first_name + friendsArr[i].last_name;
      friendName = friendName.toLowerCase();
      //Сравним значения
      if (friendName.indexOf(inputValue) > -1) {
        //обнулим разметку
>>>>>>> master
        list.innerHTML = '';
        //запушим в массив с результатами посика
        searchResult.push(friendsArr[i]);
        //Нарисуем новую разметку
<<<<<<< HEAD
        genereateMarkup (searchResult, list);
        } 
      }
}
  //Навешиваем обработчик на строку 2 поисков
  document.querySelector('.search-line').addEventListener('input', function (e){
    //Определим в каком именно столбце идет поиск
    var theInput = e.target;
    // Обработаем левый столбец
    if (theInput == leftSearch){
        searchResultGenerateMarkup (leftSearch, vkResponse, friendsList);
    } else {
      //Если в правом столбце есть элементы, то
      if (filteredFriends.length>0) {
        searchResultGenerateMarkup (rightSearch, filteredFriends, rightList);  
=======
        genereateMarkup(searchResult, list);
      }
    }
  }
  //Навешиваем обработчик на строку 2 поисков
  document.querySelector('.search-line').addEventListener('input', function(e) {
    //Определим в каком именно столбце идет поиск
    var theInput = e.target;
    // Обработаем левый столбец
    if (theInput == leftSearch) {
      searchResultGenerateMarkup(leftSearch, vkResponse, friendsList);
    } else {
      //Если в правом столбце есть элементы, то
      if (filteredFriends.length > 0) {
        searchResultGenerateMarkup(rightSearch, filteredFriends, rightList);
>>>>>>> master
      }
    }
  });

  // Сохранение в LocalStorage 
  saveButton.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('savedFriendsList', JSON.stringify(filteredFriends));
  })

<<<<<<< HEAD
});

function dragStart (e) {
  e.dataTransfer.effectAllowed="move";
  e.dataTransfer.setData('text', e.target.dataset.id);
  console.log(e.target.dataset.id)
  return true;
}

function  dragEnter (e) {
  e.preventDefault();
  return true;
}

function dragOver (e){
  e.preventDefault();
}

function dragDrop (e) {
  var data = e.dataTransfer.getData('text');
  
  console.log(data)
  //e.stopPropagination();
  return false;
}


=======
});
>>>>>>> master
