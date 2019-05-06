// За основу возьми домашнее задание из модуля №4, но теперь необходимо написать функцию -
// конструктор Notepad для создания объекта управляющего коллекцией заметок.

// Конструктор Notepad при инициализации принимает массив заметок
// const Notepad = function Notepad(notes = []) {
//   // Перенеси свойства и методы объекта notepad в конструктор
// };

//======================================

'use strict';
function myFunction1() {
  const Notepad = function Notepad(notes = []) {
    // Перенеси свойства и методы объекта notepad в конструктор
    (this.getNotes = function() {
      /*
       * Принимает: ничего
       * Возвращает: все заметки, значение свойства notes
       */
      return notes;
    }),
      (this.findNoteById = function(id) {
        /*
         * Ищет заметку в массиве notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: заметку с совпавшим полем id или undefined если ничего не найдено
         */

        for (let i = 0; i < notes.length; i += 1) {
          if (notes[i].id === id) {
            return notes[i];
          }
        }
      }),
      (this.saveNote = function(note) {
        //     /*
        //      * Сохраняет заметку в массив notes
        //      *
        //      * Принимает: объект заметки
        //      * Возвращает: сохраненную заметку
        //      */
        notes.push(note);
        return note;
      }),
      (this.deleteNote = function(id) {
        /*
         * Удаляет заметку по идентификатору из массива notes
         *
         * Принимает: идентификатор заметки
         * Возвращает: ничего
         */
        for (let i = 0; i < notes.length; i += 1) {
          if (notes[i].id === id) {
            notes.splice(i, 1);
            return;
          }
        }
      }),
      (this.updateNoteContent = function(id, updatedContent) {
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
          note[Object.keys(updatedContent)[i]] = Object.values(updatedContent)[
            i
          ];
        }
        return note;
      }),
      (this.updateNotePriority = function(id, priority) {
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
      }),
      (this.filterNotesByQuery = function(query) {
        /*
         * Фильтрует массив заметок по подстроке query.
         * Если значение query есть в заголовке или теле заметки - она подходит
         *
         * Принимает: подстроку для поиска в title и body заметки
         * Возвращает: новый массив заметок, контент которых содержит подстроку
         */
        const filtered = [];
        for (let i = 0; i < notes.length; i += 1) {
          if (
            Object.values(notes[i])[1]
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            Object.values(notes[i])[2]
              .toLowerCase()
              .includes(query.toLowerCase())
          ) {
            filtered.push(notes[i]);
          }
        }
        return filtered;
      }),
      (this.filterNotesByPriority = function(priority) {
        /*
         * Фильтрует массив заметок по значению приоритета
         * Если значение priority совпадает с приоритетом заметки - она подходит
         *
         * Принимает: приоритет для поиска в свойстве priority заметки
         * Возвращает: новый массив заметок с подходящим приоритетом
         */
        const filtered = [];
        for (let i = 0; i < notes.length; i += 1) {
          if (notes[i].priority === priority) {
            filtered.push(notes[i]);
          }
        }
        return filtered;
      });
  };
  Notepad.Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  };

  //===========================================================================================================

  //Далее идет код для проверки работоспособности конструктора и созданного экземпляра, вставь его в конец скрипта.Твоя реализация конструктора Notepad должна проходить этот тест.

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
  console.log('Все текущие заметки: ', notepad.getNotes());

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

  console.log('Все текущие заметки: ', notepad.getNotes());

  /*
   * Зима уже близко, пора поднять приоритет на покупку одежды
   */
  notepad.updateNotePriority('id-4', Notepad.Priority.NORMAL);

  console.log(
    'Заметки после обновления приоритета для id-4: ',
    notepad.getNotes(),
  );

  /*
   * Решил что фреймворки отложу немного, понижаю приоритет
   */
  notepad.updateNotePriority('id-3', Notepad.Priority.LOW);

  console.log(
    'Заметки после обновления приоритета для id-3: ',
    notepad.getNotes(),
  );

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
  notepad.updateNoteContent('id-3', {
    title: 'Get comfy with React.js or Vue.js',
  });

  console.log(
    'Заметки после обновления контента заметки с id-3: ',
    notepad.getNotes(),
  );

  /*
   * Повторил HTML и CSS, удаляю запись c id-2
   */
  notepad.deleteNote('id-2');
  console.log('Заметки после удаления с id -2: ', notepad.getNotes());
}
