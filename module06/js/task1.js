// За основу возьми домашнее задание из модуля №5, но теперь необходимо написать ES6 класс.
// class Notepad {
//   /*
//    * Перенеси свойства и методы конструктора в класс
//    *
//    * Замени метод getNotes геттером, чтобы можно было обратиться как notepad.notes,
//    * для этого создай свойство _notes, в котором храни массив заметок,
//    * а геттер notes возвращает значение этого поля
//    *
//    * Добавь статическое свойство Priority используя ключевое слово static
//    */
// }

//======================================

('use strict');

class Notepad {
  /* Замени метод getNotes геттером, чтобы можно было обратиться как notepad.notes,
   * для этого создай свойство _notes, в котором храни массив заметок,
   * а геттер notes возвращает значение этого поля
   */
  constructor(notes) {
    this._notes = notes;
  }
  get notes() {
    return this._notes;
  }

  //* Добавь статическое свойство Priority используя ключевое слово static

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };

  //    * Перенеси свойства и методы конструктора в класс
  saveNote(note) {
    //     /*
    //      * Сохраняет заметку в массив notes
    //      * Принимает: объект заметки
    //      * Возвращает: сохраненную заметку
    //      */
    this.notes.push(note);
    return note;
  }
  findNoteById(id) {
    /*
     * Ищет заметку в массиве notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
     */

    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].id === id) {
        return this.notes[i];
      }
    }
  }
  updateNotePriority(id, priority) {
    /*
     * Обновляет приоритет заметки
     *
     * Принимает: идентификатор заметки и ее новый приоритет
     * Возвращает: обновленную заметку
     */
    const note = this.findNoteById(id);
    if (!note) {
      return;
    }
    note.priority = priority;
    return note;
  }

  filterNotesByQuery(query) {
    /*
     * Фильтрует массив заметок по подстроке query.
     * Если значение query есть в заголовке или теле заметки - она подходит
     *
     * Принимает: подстроку для поиска в title и body заметки
     * Возвращает: новый массив заметок, контент которых содержит подстроку
     */
    const filtered = [];
    for (let i = 0; i < this.notes.length; i += 1) {
      if (
        Object.values(this.notes[i])[1]
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        Object.values(this.notes[i])[2]
          .toLowerCase()
          .includes(query.toLowerCase())
      ) {
        filtered.push(this.notes[i]);
      }
    }
    return filtered;
  }

  filterNotesByPriority(priority) {
    /*
     * Фильтрует массив заметок по значению приоритета
     * Если значение priority совпадает с приоритетом заметки - она подходит
     *
     * Принимает: приоритет для поиска в свойстве priority заметки
     * Возвращает: новый массив заметок с подходящим приоритетом
     */
    const filtered = [];
    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].priority === priority) {
        filtered.push(this.notes[i]);
      }
    }
    return filtered;
  }
  updateNoteContent(id, updatedContent) {
    /*
     * Обновляет контент заметки
     * updatedContent - объект с полями вида {имя: значение, имя: значение}
     * Свойств в объекте updatedContent может быть произвольное количество
     *
     * Принимает: идентификатор заметки и объект, полями которого надо обновить заметку
     * Возвращает: обновленную заметку
     */

    const note = this.findNoteById(id);
    if (!note) {
      return;
    }
    for (let i = 0; i < Object.keys(updatedContent).length; i += 1) {
      note[Object.keys(updatedContent)[i]] = Object.values(updatedContent)[i];
    }
    return note;
  }
  deleteNote(id) {
    /*
     * Удаляет заметку по идентификатору из массива notes
     *
     * Принимает: идентификатор заметки
     * Возвращает: ничего
     */
    for (let i = 0; i < this.notes.length; i += 1) {
      if (this.notes[i].id === id) {
        this.notes.splice(i, 1);
        return;
      }
    }
  }
}

// ==============================================

// Далее идет код для проверки работоспособности класса и созданного экземпляра, вставь его в конец скрипта. Твоя реализация класса Notepad должна проходить этот тест.

const initialNotes = [
  {
    id: 'id-1',
    title: 'JavaScript essentials',
    body:
      'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Notepad.Priority.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body:
      'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Notepad.Priority.NORMAL,
  },
];

const notepad = new Notepad(initialNotes);

/*
 * Смотрю что у меня в заметках после инициализации
 */
console.log('Все текущие заметки: ', notepad.notes);

/*
 * Добавляю еще 2 заметки и смотрю что получилось
 */
notepad.saveNote({
  id: 'id-3',
  title: 'Get comfy with Frontend frameworks',
  body:
    'First must get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
  priority: Notepad.Priority.NORMAL,
});

notepad.saveNote({
  id: 'id-4',
  title: 'Winter clothes',
  body:
    "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
  priority: Notepad.Priority.LOW,
});

console.log('Все текущие заметки: ', notepad.notes);

/*
 * Зима уже близко, пора поднять приоритет на покупку одежды
 */
notepad.updateNotePriority('id-4', Notepad.Priority.NORMAL);

console.log('Заметки после обновления приоритета для id-4: ', notepad.notes);

/*
 * Решил что фреймворки отложу немного, понижаю приоритет
 */
notepad.updateNotePriority('id-3', Notepad.Priority.LOW);

console.log('Заметки после обновления приоритета для id-3: ', notepad.notes);

/*
 * Решил отфильтровать заметки по слову html
 */
console.log(
  'Отфильтровали заметки по ключевому слову "html": ',
  notepad.filterNotesByQuery('html'),
);

/*
 * Решил отфильтровать заметки по слову javascript
 */
console.log(
  'Отфильтровали заметки по ключевому слову "javascript": ',
  notepad.filterNotesByQuery('javascript'),
);

/*
 * Хочу посмотреть только заметки с нормальным приоритетом
 */
console.log(
  'Отфильтровали заметки по нормальному приоритету: ',
  notepad.filterNotesByPriority(Notepad.Priority.NORMAL),
);

/*
 * Обновим контент заметки с id-3
 */
notepad.updateNoteContent('id-1', {
  title: 'Get comfy with React.js or Vue.js',
});

console.log(
  'Заметки после обновления контента заметки с id-3: ',
  notepad.notes,
);

/*
 * Повторил HTML и CSS, удаляю запись c id-2
 */
notepad.deleteNote('id-2');
console.log('Заметки после удаления с id -2: ', notepad.notes);
