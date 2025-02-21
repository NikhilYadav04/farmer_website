import React, { useContext } from 'react';
import { Menu } from 'lucide-react';
import { Plus } from 'lucide-react';
import { MessageSquare } from 'lucide-react';
import { CircleHelp } from 'lucide-react';
import { History } from 'lucide-react';
import { Settings } from 'lucide-react';
import { Context } from './Context';
import './SideBar.css';
import Button from '../ui/Button';
const SideBar = () => {
  const [extended, setExtended] = React.useState(false);
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    await onSent(prompt);
  };

  return (
    <div
      className={`navDrawer inline-flex h-full max-w-5xl translate-x-0 flex-col items-center justify-between px-3 py-6 transition-all duration-500 ease-out ${
        extended ? 'w-50' : null
      } max-md:hidden`}
    >
      <div>
        <Menu
          onClick={() => setExtended(!extended)}
          className="ml-3 flex flex-col justify-center items-center w-6 cursor-pointer "
        />
        <Button type="sidebar" onClick={newChat}>
          <Plus className="w-6" />
          {extended ? <p>New Chat</p> : null}
        </Button>
        {extended ? (
          <div className="recent flex flex-col items-start justify-center">
            <p className="mt-6 mb-3 ml-3">Recent</p>
            {prevPrompts.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className={`flex cursor-pointer items-start gap-3 rounded-full p-3 w-40 transition-colors hover:bg-green-400/5 hover:text-green-400`}
                >
                  <MessageSquare className="w-8" />
                  <p>{item.slice(0, 20)} ...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-start w-full justify-center">
        <div className="flex cursor-pointer items-start gap-3 rounded-full p-3 hover:bg-neutral-600/30">
          <CircleHelp className="w-6" />
          {extended ? <p>Help</p> : null}
        </div>
        <div className="flex cursor-pointer items-start gap-3 rounded-full p-3 hover:bg-neutral-600/30">
          <History className="w-6" />
          {extended ? <p>History</p> : null}
        </div>
        <div className="flex cursor-pointer items-start gap-3 rounded-full p-3 hover:bg-neutral-600/30">
          <Settings className="w-6" />
          {extended ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
