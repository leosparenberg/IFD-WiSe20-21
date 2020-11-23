window.addEventListener('load', function () {
  init();
});

function init() {
  const artyom = new Artyom();
  const commands = [
    {
      indexes: [
        'Was steht heute alles an?',
        'kannst du mich auf den aktuellen Stand bringen',
      ],
      action: function () {
        const answer = 'sehr gerne, mit was soll ich beginnen';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['Gibt es sonst etwas neues?'],
      action: function () {
        const answer = 'soll ich deine guten Morgen Playlist abspielen';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['welche Abgaben habe ich noch offen'],
      action: function () {
        const answer =
          'Bis Mittwoch, den 11.11.2020, musst du noch die Aufgabe 4 in Interface Design erledigen. Soll ich dir die Aufgabenstellung vorlesen';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['welche Vorlesungen habe ich heute'],
      action: function () {
        const answer =
          'Du hast heute zwei Blöcke Vorlesung. Zuerst hast du von 09:45 - 11:15 Uhr Interface Design. Im Anschluss hast du noch von 11:15 - 13:15 Uhr die Veranstaltung Streaming Anwendungen';
        artyom.say(answer);
        createNewMessageBox(answer, 'userOutput');
      },
    },
    {
      indexes: ['habe ich neue Nachrichten bekommen'],
      action: function () {
        const answer =
          'Du hast eine neue E-Mail erhalten. Soll ich dir den Absender und den Betreff vorlesen';
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
