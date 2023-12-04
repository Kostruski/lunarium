import axios from 'axios';

const FALLBACK_ANSWER =
  'O, ciekawy podróżniku, proszę cię o cierpliwość. Niech twoja dusza odpoczywa jak liść na strumieniu czasu, a próba wróżby zostanie odłożona na późniejszy moment. Spróbuj ponownie, kiedy konstelacje układają się w bardziej przejrzysty wzór. Niech energia wszechświata uniesie twoje pytanie ku gwiazdom, a odpowiedzi, jak rozjaśniona mgiełka nad ranem, staną się dla ciebie jasne w odpowiednim czasie. Niech moc magii prowadzi cię przez zaklęte labirynty losu.';

type UseSendPromptProps = {
  onSuccess: (t: string) => void;
  onError: (e: string) => void;
  drawnCards: string;
};
const useSendPrompt = ({
  onSuccess,
  onError,
  drawnCards,
}: UseSendPromptProps): ((text: string) => void) => {
  return (prompt) => {
    console.log('...czekaj');

    let question = prompt.trim().replace(/\s+/g, ' ').toLowerCase();

    if (!question.endsWith('?')) {
      question += '?';
    }

    axios({
      method: 'post',
      url: '/api/hello',
      data: { question, cards: drawnCards },
    })
      .then((res) => {
        const msg = res?.data.answer;

        onSuccess(msg || FALLBACK_ANSWER);
      })
      .catch((e) => {
        console.warn(e);
        onError(FALLBACK_ANSWER);
      });
  };
};

export default useSendPrompt;
