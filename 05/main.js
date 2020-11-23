window.addEventListener('load', function () {
  init();
});

function init() {
  const artyom = new Artyom();
  const commands = [
    {
      indexes: [
        'Was steht heute an',
      ],
      action: function () {
        const answer = 'Du hast heute keine Termine.';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['Gibt es sonst etwas neues',
			   'Gibt es Neuigkeiten',],
      action: function () {
        const answer = 'deine Buchleihe läuft morgen ab';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['wie lange hat die Bibliothek heute geöffnet'],
      action: function () {
        const answer =
          'Die Bibliothek hat heute bis 18 Uhr geöffnet.';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['Reserviere mir ein Essen auf 12 Uhr'],
      action: function () {
        const answer =
          'Ich habe dir ein Essen auf 12 Uhr reserviert.';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['Was gibt es heute in der Mensa'],
      action: function () {
        const answer =
          'Heute gibt es Schnitzel mit Pommes.';
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
      'Hallo Leo, was kann ich für dich tun?';
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
    artyom.say('Bis zum nächsten Mal');
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
