import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { getLanguages } from "./redux/actions";
import { translateText } from "./redux/actions";
import { setAnswer } from "./redux/slice/translateSlice";
const App = () => {
  const dispatch = useDispatch();

  const { isLoading, error, languages } = useSelector(
    (store) => store.languageReducer
  );

  const translateState = useSelector((store) => store.translateReducer);

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });

  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }));
  };
  //select alanındaki verileri yerdeğiştirdik
  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // reducer'da tutulan cevabı text state'ine aktar
    setText(translateState.answer);
    //text state 'inde tutulan metni reducer' a aktar
    dispatch(setAnswer(text));
  };
  // dil dizisini bizden istenen formata .çevirme
  // nesnelerin içerisindeki code ve name değerlerini value ve label değerlerine çevirdik
  // Diziyi formatlama işlemi her render sırasında olmasını istemediğimiz için useMemo kullanrak cache'e gönderdik
  const formatted = useMemo(
    () =>
      languages.map((i) => ({
        label: i.name,
        value: i.code,
      })),
    [languages]
  );

  return (
    <div className="bg-zinc-900 h-screen text-white grid place-items-center ">
      <div className=" w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">Çeviri +</h1>
        {/* üst kısım */}
        <div className="flex gap-2 text-black">
          <Select
            value={sourceLang}
            isLoading={isLoading}
            isDisabled={isLoading}
            options={formatted}
            onChange={(e) => setSourceLang(e)}
            className="flex-1"
          />
          <button
            onClick={handleSwap}
            className="bg-zinc-700  text-white py-2 px-6  hover:bg-zinc-600 transition rounded"
          >
            Değiş
          </button>
          <Select
            value={targetLang}
            isDisabled={isLoading}
            options={formatted}
            onChange={(e) => setTargetLang(e)}
            isLoading={isLoading}
            className="flex-1"
          />
        </div>

        {/* text alanları */}
        <div className="flex gap-3 mt-5  md:gap-[105px] max-md:flex-col">
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[250px] max-h-[500px]  text-black text-[20px] rounded p-[10px] "
            ></textarea>
          </div>
          <div className="relative flex-1">
            <textarea
              disabled
              value={translateState.answer}
              className="w-full min-h-[250px] max-h-[500px]  text-[20px] rounded p-[10px] text-gray-300"
            ></textarea>

            {translateState.isLoading && (
              <h1 className="absolute top-[50%] left-[50%] translate-x-[-50%]">
                
                <div class="loader">
                  <div data-glitch="Loading..." class="glitch">
                    Loading...
                  </div>
                </div>
              </h1>
            )}
          </div>
        </div>
        {/* buton */}
        <button
          disabled={translateState.isLoading}
          onClick={handleTranslate}
          className="bg-zinc-700 px-5 py-3 rounded-md font-semibold hover:ring-2 hover:bg-zinc-900 cursor-pointer transition mt-3 disabled:brightness-50"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
