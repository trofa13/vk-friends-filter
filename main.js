var connectLink = document.querySelector('.connect-vk-link');
var connectBlock = document.querySelector('.connect-vk');
var mainContent = document.querySelector('.mr-wrapper');
connectLink.addEventListener('click', function (e){
  connectBlock.style.display = "none";
  mainContent.style.display = "block"
VK.Auth.login(function(response) {
  if (response.session) {
    console.log('successful auth')
  } else {
    throw new Error('Ошибка авторизации')
  }
})

})

  VK.init({
  apiId: 5380999
});





function genereateMarkup(friendsArr, list) {
  for (var i = 0; i < friendsArr.length; i++) {
    var li = document.createElement('li'),
      img = document.createElement('img'),
      span = document.createElement('span'),
      cross = document.createElement('a');
    // li.setAttribute('draggable', true);
    li.setAttribute('data-id', friendsArr[i].uid);
    li.className = 'friend-list-item';
    li.className += ' draggable';

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
        }
      }
    }
  }
  //Отрисовываем разметку
  genereateMarkup(vkResponse, friendsList)
  if (filteredFriends.length > 0) {
    genereateMarkup(filteredFriends, rightList)
  }

  function toRightCol(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      var userId = e.target.parentNode.dataset.id;
      rightList.appendChild(e.target.parentNode);

      for (i = 0; i < vkResponse.length; i++) {
        if (vkResponse[i].uid == userId) {
          filteredFriends.push(vkResponse[i])
          vkResponse.splice(i, 1)
        }
      }
    }
  }
  //Навешиваем обработчик на левую колонку. Он удаляет элемент из массива ответа ВК и добавляет в массив отфильтрованных друзей
  friendsList.addEventListener('click', toRightCol);

  function toLeftCol(e) {
    if (e.target.tagName === 'A') {
      e.preventDefault();
      var userId = e.target.parentNode.dataset.id;
      friendsList.insertBefore(e.target.parentNode, friendsList.childNodes[0])

      for (i = 0; i < filteredFriends.length; i++) {
        if (filteredFriends[i].uid == userId) {
          vkResponse.push(filteredFriends[i])
          filteredFriends.splice(i, 1)

        }
      }
    }
  }

  //Навешиваем обработчик на правую колонку. Он удаляет элемент из массива отфильтрованных друзей и возвращает его в массив ответа от ВК
  rightCol.addEventListener('click', toLeftCol);

  /*------------ Drag And Drop -------------*/
  allLi = document.querySelectorAll('LI');
  for (var i = 0; i < allLi.length; i++) {
    var oneLi = allLi[i];
    var dragObject = {};
    oneLi.addEventListener('mousedown', function(e) {
      e.preventDefault();
      if (e.target.tagName != "LI") {
        var elem = e.target.parentNode;
      } else {
        var elem = e.target;
      }
      dragObject.elem = elem;
      dragObject.downX = e.pageX;
      dragObject.downY = e.pageY;
      dragObject.parent = elem.parentNode;

    })

    document.addEventListener('mousemove', function(e) {
      //Проверяем зажат ли элемент
      if (!dragObject.elem) {
        return;
      }
      if (!dragObject.avatar) {
        var moveX = e.pageX - dragObject.downX;
        var moveY = e.pageY - dragObject.downY;
        if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
          return;
        }
        dragObject.avatar = createAvatar(e);
        if (!dragObject.avatar) {
          dragObject = {};
          return;
        }
        var coords = getCoords(dragObject.avatar);
        dragObject.shiftX = dragObject.downX - coords.left;
        dragObject.shiftY = dragObject.downY - coords.top;

        startDrag(e);
      }
      dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
      dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

      return false;
    })

    document.addEventListener('mouseup', function(e) {
      if (dragObject.avatar) {
        finishDrag(e);
      }
      dragObject = {};
    })

    function createAvatar(e) {

      // запомнить старые свойства, чтобы вернуться к ним при отмене переноса
      var avatar = dragObject.elem;
      var old = {
        parent: avatar.parentNode,
        nextSibling: avatar.nextSibling,
        position: avatar.position || '',
        left: avatar.left || '',
        top: avatar.top || '',
        zIndex: avatar.zIndex || ''
      };

      // функция для отмены переноса
      avatar.rollback = function() {
        old.parent.insertBefore(avatar, old.nextSibling);
        avatar.style.position = old.position;
        avatar.style.left = old.left;
        avatar.style.top = old.top;
        avatar.style.zIndex = old.zIndex
      };

      return avatar;
    }

    function startDrag(e) {
      var avatar = dragObject.avatar;

      document.body.appendChild(avatar);
      avatar.style.zIndex = 9999;
      avatar.style.position = 'absolute';
    }

    function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
      };
    }

    function mouseIsOver(col, mousePos) {
      var ColPos = col.getBoundingClientRect(),
        ColLeft = ColPos.left,
        ColRight = ColPos.right,
        ColTop = ColPos.top,
        ColBottom = ColPos.bottom,
        fitsColWidth = ((mousePos.clientX > ColLeft) && (mousePos.clientX < ColRight)),
        fitsColHeight = ((mousePos.clientY < ColBottom) && (mousePos.clientY > ColTop));

      if (fitsColWidth && fitsColHeight) {
        return true;
      }
      return false;
    };

    function finishDrag(e) {
      ///Переносим из левой колонки в правую
      if (dragObject.parent == friendsList) {
        if (mouseIsOver(rightCol, e)) {

          var userId = dragObject.elem.dataset.id;
          rightList.appendChild(dragObject.elem);
          dragObject.elem.style = '';

          for (i = 0; i < vkResponse.length; i++) {
            if (vkResponse[i].uid == userId) {

              filteredFriends.push(vkResponse[i])
              vkResponse.splice(i, 1)
            }
          }
        } else {
          dragObject.avatar.rollback();
        }
      }
      //переносим из правой колонки в левую
      if (dragObject.parent == rightList) {
        if (mouseIsOver(allFriends, e)) {
          var userId = dragObject.elem.dataset.id;
          friendsList.insertBefore(dragObject.elem, friendsList.childNodes[0])
          dragObject.elem.style = '';

          for (i = 0; i < filteredFriends.length; i++) {
            if (filteredFriends[i].uid == userId) {
              vkResponse.push(filteredFriends[i])
              filteredFriends.splice(i, 1)

            }
          }

        } else {
          dragObject.avatar.rollback();
        }
      }
    }
  }

  /*------------ ПОИСК -------------*/
  //Объявим функцию, рисующую разметку по результатам поиска
  function searchResultModifyMarkup(input, friendsArr, list) {
    //Обнулим разметку в листе, если поиск не дал совпадений
    var items = list.querySelectorAll('LI');
    for (var i = 0; i < items.length; i++) {
      items[i].style.display = 'none'
    }
    //Пробежим по массиву в левом столбце
    for (var i = 0; i < items.length; i++) {
      console.log(items[i])
        //объявим переменные для сравнения
      var inputValue = input.value.trim().toLowerCase();
      var friendName = friendsArr[i].first_name + friendsArr[i].last_name;
      friendName = friendName.toLowerCase();
      //Сравним значения
      if (friendName.indexOf(inputValue) > -1) {
        //обнулим разметку
        items[i].style.display = 'none';
        //запушим в массив с результатами посика
        //Нарисуем новую разметку
        items[i].style.display = 'block'
      }
    }
  }
  //Навешиваем обработчик на строку 2 поисков
  document.querySelector('.search-line').addEventListener('input', function(e) {
    //Определим в каком именно столбце идет поиск
    var theInput = e.target;
    // Обработаем левый столбец
    if (theInput == leftSearch) {

      searchResultModifyMarkup(leftSearch, vkResponse, friendsList);
    } else {
      //Если в правом столбце есть элементы, то
      if (filteredFriends.length > 0) {
        searchResultModifyMarkup(rightSearch, filteredFriends, rightList);
      }
    }
  });

  // Сохранение в LocalStorage 
  saveButton.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.setItem('savedFriendsList', JSON.stringify(filteredFriends));
  })

});