import React, { useState, useRef, useEffect } from "react";
import "../styles/ChatBot.css";

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: "bot" | "user"; text: string }[]>([
    { from: "bot", text: "Сиздин төмөндөгү суроолоруңузга жооп бере алам 👇" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Теманы жана фонду сактоо
  const [darkMode, setDarkMode] = useState(false);
  const [bgColor, setBgColor] = useState("default");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const topics = [
    { id: "programming", label: "👨‍💻 Программалоо" },
    { id: "office", label: "🏢 Офистик жумуштар" },
    { id: "architecture", label: "🏗 Архитектура" },
  ];

  const responses: Record<string, string> = {
    programming:
      "👨‍💻 Программалоо үчүн күчтүү процессор (M1, i7), 16GB↑ RAM жана SSD сунушталат. Мисалы: MacBook Pro, ASUS ZenBook.",
    office:
      "🏢 Офистик жумуштар үчүн арзан, батарейкасы узак ноутбуктар жакшы. Мисалы: HP Pavilion, Lenovo IdeaPad.",
    architecture:
      "🏗 Архитектура/3D моделдөө үчүн RTX видеокартасы бар күчтүү ноутбуктар зарыл. Мисалы: ASUS TUF Gaming, Lenovo Legion.",
  };

  // 👉 Автоматтык скролл
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // 👉 Тема тандаганда жооп берүү
  const handleTopicClick = (topicId: string) => {
    const userMsg = topics.find((t) => t.id === topicId)?.label || "";
    setMessages((prev) => [...prev, { from: "user", text: userMsg }]);

    setIsTyping(true);

    const fullText = responses[topicId];
    let index = 0;

    setTimeout(() => {
      setIsTyping(false);
      const typingInterval = setInterval(() => {
        index++;
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg?.from === "bot" && index <= fullText.length) {
            return [
              ...prev.slice(0, -1),
              { from: "bot", text: fullText.slice(0, index) },
            ];
          } else if (index === 1) {
            return [...prev, { from: "bot", text: fullText.slice(0, index) }];
          }
          return prev;
        });

        if (index >= fullText.length) {
          clearInterval(typingInterval);
        }
      }, 40);
    }, 800);
  };

  // 👉 Чатты тазалоо
  const clearChat = () => {
    setMessages([{ from: "bot", text: "Чат тазаланды. Төмөндөн кайра тандай аласыз 👇" }]);
    setShowMenu(false);
  };

  // 👉 Жардам
  const showHelp = () => {
    setMessages((prev) => [
      ...prev,
      { from: "bot", text: "ℹ️ Жардам: Төмөндөн керектүү теманы тандап жооп ала аласыз." },
    ]);
    setShowMenu(false);
  };

  return (
    <div className={`chatbot-container ${darkMode ? "dark" : ""}`}>
      {isOpen && (
        <div className={`chatbot ${bgColor}`}>
          <div className="chat-header">
            <span>💬 Ноутбуктар боюнча жардамчы PAIDALAN_TECHNO</span>
            <div className="header-actions">
              <button className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
                ⋮
              </button>
              <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
            </div>

            {/* ⋮ Меню */}
            {showMenu && (
              <div className="menu-dropdown">
                <button onClick={clearChat}>🗑️ Чатты тазалоо</button>
                <button onClick={showHelp}>ℹ️ Жардам</button>
                <button onClick={() => {setShowSettings(true); setShowMenu(false);}}>
                  ⚙️ Жөндөөлөр
                </button>
              </div>
            )}
          </div>

          {/* Жөндөөлөр терезеси */}
          {showSettings && (
            <div className="settings-popup">
              <h4>⚙️ Жөндөөлөр</h4>
              <div className="setting-item">
                <label>
                  <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(!darkMode)}
                  />
                  🌙 Dark Mode
                </label>
              </div>

              <div className="setting-item">
                <label>🎨 Фонду танда:</label>
                <select value={bgColor} onChange={(e) => setBgColor(e.target.value)}>
                  <option value="default">Ак фон</option>
                  <option value="blue">Көк фон</option>
                  <option value="green">Жашыл фон</option>
                  <option value="gradient">Градиент</option>
                </select>
              </div>

              <button className="close-settings" onClick={() => setShowSettings(false)}>
                Жабуу
              </button>
            </div>
          )}

          <div className="chat-window">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.from} animate`}>
                {msg.text}
              </div>
            ))}

            {isTyping && (
              <div className="message bot typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chat-options">
            {topics.map((topic) => (
              <button key={topic.id} onClick={() => handleTopicClick(topic.id)}>
                {topic.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          💬 Чат
        </button>
      )}
    </div>
  );
};

export default ChatBot;
