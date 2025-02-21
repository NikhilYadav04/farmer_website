import { Context } from './Context';
import { useContext, useRef, useState } from 'react';
import { User } from 'lucide-react';
import { Compass } from 'lucide-react';
import { Lightbulb } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { CodeXml } from 'lucide-react';
import { Images } from 'lucide-react';
import { Mic } from 'lucide-react';
import { SendHorizontal } from 'lucide-react';
import './Main.css';
const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const inputRef = useRef(null);
  const [image, setImage] = useState('');
  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    setImage(event.target.files[0]);
  };

  return (
    <div className="my-5 ml-5 mr-10 flex-1 rounded-3xl border border-transparent bg-gradient-to-r from-green-900 via-orange-400 to-red-400 px-[0.2rem] py-[0.2rem]">
      <div className="relative h-full flex-1 rounded-3xl bg-neutral-900">
        <div className="flex items-center justify-between p-5 text-base">
          <p>Chatbot</p>
          <User width={35} height={35} className="rounded-full border p-1" />
        </div>
        <div className="m-auto max-w-4xl">
          {!showResult ? (
            <>
              <div className="mx-0 my-12 p-5 text-5xl font-medium">
                <p>
                  <span className="bg-gradient-to-r from-green-800 via-orange-400 to-red-500 bg-clip-text font-semibold text-transparent">
                    Welcome!
                  </span>
                </p>
                <p>How can I help you today?</p>
              </div>
            </>
          ) : (
            <div className="result max-h-[70vh] overflow-y-scroll px-[5%] py-0">
              <div className="mx-0 my-10 flex items-center gap-5">
                <User />
                <p>{recentPrompt}</p>
              </div>
              <div className="flex flex-row items-start gap-5 text-base font-light leading-8">
                <Images width={30} height={30} />
                {loading ? (
                  <div className="flex w-full flex-col gap-2">
                    <div className="loader w-full h-[2rem] rounded-full bg-green-400 bg-gradient-to-r from-green-400 via-green-100 to-green-300"></div>
                    <div className="loader w-full h-[2rem] rounded-full bg-green-400 bg-gradient-to-r from-green-400 via-green-100 to-green-300"></div>
                    <div className="loader w-full h-[2rem] rounded-full bg-green-400 bg-gradient-to-r from-green-400 via-green-100 to-green-300"></div>
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                )}
              </div>
            </div>
          )}

          <div className="main-bottom absolute bottom-0 m-auto w-full max-w-4xl px-5 py-0">
            <div className="search-box flex items-center justify-between gap-5 rounded-full bg-neutral-800/70 px-5 py-3">
              <input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                type="text"
                placeholder="Write your doubt here"
                className="flex-1 bg-transparent p-3 text-base outline-none"
              />
              <div className="flex gap-3">
                <div onClick={handleImageClick}>
                  <Images className="img cursor-pointer" />
                  <input
                    type="file"
                    name="file"
                    ref={inputRef}
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
                <Mic className="img cursor-pointer" />
                {input ? (
                  <SendHorizontal
                    onClick={() => onSent()}
                    className="img cursor-pointer"
                  />
                ) : null}
              </div>
            </div>
            <p className="mx-auto my-4 text-center text-xs font-light">
              Our chatbot may display inaccurate info, including about people,
              so double-check its responses. Your privacy and Gemini Apps
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
