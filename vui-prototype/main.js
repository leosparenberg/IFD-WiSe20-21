window.addEventListener('load', function () {
  init();
});

function init() {
  const artyom = new Artyom();
  const commands = [
    {
      indexes: [
        'was steht heute an?',
        'Yo Fuwa, was steht heute an?',
      ],
      action: function () {
        const answer = 'Du hast heute keine Termine.';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['Gibt es sonst etwas neues?'],
      action: function () {
        const answer = 'Deine Bücherleihe läuft morgen ab.';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['Wie lange hat die Bibliothek heute geöffnet?'],
      action: function () {
        const answer =
          'Die Bibliothek hat heute bis 19 Uhr geöffnet';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['Danke Fuwa'],
      action: function () {
        const answer =
          'Keine Ursache';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
  ];

  document.querySelector('.startButton').addEventListener('click', () => {
    document
      .querySelector('.startScreen')
      .classList.remove('active', 'animate__animated', 'animate__fadeIn');
    document
      .querySelector('.conversation')
      .classList.add('active', 'animate__animated', 'animate__fadeIn');
    artyom.addCommands(commands);
    function startContinuousArtyom() {
      artyom.fatality();
      setTimeout(function () {
        artyom
          .initialize({
            lang: 'de-DE',
            continuous: true,
            listen: true,
            interimResults: true,
            debug: true,
          })
          .then(function () {
            console.log('Ready!');
          });
      }, 250);
    }
    startContinuousArtyom();
    const answer =
      'Hey Benni, ich hoffe du hast gut schlafen. Wie geht es dir heute';
    artyom.say(answer);
    createNewMessageBox(answer, 'userOutput');
    artyom.redirectRecognizedTextOutput(function (recognized, isFinal) {
      if (isFinal) {
        createNewMessageBox(recognized, 'userInput');
      } else {
        console.log(recognized);
      }
    });
  });

  document.querySelector('.endButton').addEventListener('click', () => {
    document
      .querySelector('.startScreen')
      .classList.add('active', 'animate__animated', 'animate__fadeIn');
    document
      .querySelector('.conversation')
      .classList.remove('active', 'animate__animated', 'animate__fadeIn');
    artyom.say('Bis bald Benni');
    artyom.dontObey();
    document.querySelector('.conversation__messages').innerHTML = '';
    console.log('Closed!');
  });
}

function createNewMessageBox(text, typeOfInput) {
  const creatElem = document.createElement('section');
  const addText = document.createTextNode(text);
  const addClass = creatElem.classList.add(
    typeOfInput,
    'animate__animated',
    'animate__fadeIn'
  );
  creatElem.append(addText);
  document.querySelector('.conversation__messages').appendChild(creatElem);
  document.querySelector('.conversation__messages').lastElementChild.scrollIntoView();
}
