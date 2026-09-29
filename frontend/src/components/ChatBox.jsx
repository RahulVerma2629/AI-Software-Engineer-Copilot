import { useState } from "react";

import { askRepository } from "../services/api";


function ChatBox({ repository }) {

  const [question, setQuestion] = useState("");

  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  const askQuestion = async (text) => {

    const value = text.trim();

    if (
      !value ||
      loading ||
      !repository?.repoId
    ) {
      return;
    }


    setError("");


    const userMessage = {
      type: "user",
      text: value,
    };


    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);


    setQuestion("");

    setLoading(true);


    try {

      const data = await askRepository(
        repository.repoId,
        value,
        5
      );


      const assistantMessage = {
        type: "assistant",

        text: data.answer,

        sources: data.sources || [],
      };


      setMessages((prev) => [
        ...prev,
        assistantMessage,
      ]);


    } catch (err) {

      setError(
        err.message ||
        "Unable to get an answer from CodePilot."
      );

    } finally {

      setLoading(false);

    }
  };


  const handleSubmit = (e) => {

    e.preventDefault();

    askQuestion(question);

  };


  return (
    <section className="chat-workspace">


      <div className="chat-header">

        <div className="chat-heading">

          <div className="ai-avatar">
            ✦
          </div>

          <div>

            <h2>
              CodePilot
            </h2>

            <p>
              Ask anything about your repository
            </p>

          </div>

        </div>


        <div className="model-pill">

          <span></span>

          Qwen 2.5 Coder

        </div>

      </div>


      <div className="chat-body">


        {messages.length === 0 ? (

          <div className="empty-chat">

            <div className="empty-icon">
              ✦
            </div>


            <h2>
              What would you like to know?
            </h2>


            <p>
              Ask about architecture, functions,
              APIs, components, configuration,
              or how different parts of the
              codebase work together.
            </p>


            <div className="suggestions">

              <button
                onClick={() =>
                  askQuestion(
                    "Where is the application entry point?"
                  )
                }
              >
                Where is the application entry point?
              </button>


              <button
                onClick={() =>
                  askQuestion(
                    "How is authentication handled?"
                  )
                }
              >
                How is authentication handled?
              </button>


              <button
                onClick={() =>
                  askQuestion(
                    "Explain the main application flow"
                  )
                }
              >
                Explain the main application flow
              </button>

            </div>

          </div>

        ) : (

          <div className="messages">

            {messages.map(
              (message, index) => (

                <div
                  className={
                    message.type === "user"
                      ? "message user-message"
                      : "message assistant-message"
                  }
                  key={index}
                >

                  <div className="message-avatar">

                    {message.type === "user"
                      ? "U"
                      : "✦"}

                  </div>


                  <div className="message-content">

                    <div className="message-label">

                      {message.type === "user"
                        ? "You"
                        : "CodePilot"}

                    </div>


                    <p className="answer-text">
                      {message.text}
                    </p>


                    {message.sources &&
                      message.sources.length > 0 && (

                        <div className="sources">

                          <div className="sources-title">
                            Retrieved source context
                          </div>


                          {message.sources.map(
                            (source, sourceIndex) => (

                              <div
                                className="source-wrapper"
                                key={`${source.file}-${sourceIndex}`}
                              >

                                <div className="source">

                                  <div className="source-file">

                                    <span>
                                      ⌘
                                    </span>

                                    {source.file}

                                  </div>


                                  <span className="score">

                                    {(
                                      Number(source.score) * 100
                                    ).toFixed(1)}
                                    % match

                                  </span>

                                </div>


                                <pre className="source-snippet">
                                  {source.snippet}
                                </pre>

                              </div>

                            )
                          )}

                        </div>

                      )}

                  </div>

                </div>

              )
            )}


            {loading && (

              <div className="message assistant-message">

                <div className="message-avatar">
                  ✦
                </div>

                <div className="message-content">

                  <div className="message-label">
                    CodePilot
                  </div>

                  <div className="thinking">

                    <span></span>
                    <span></span>
                    <span></span>

                    <em>
                      Searching your codebase...
                    </em>

                  </div>

                </div>

              </div>

            )}

          </div>

        )}


        {error && (

          <div className="chat-error">
            <span>!</span>
            {error}
          </div>

        )}

      </div>


      <form
        className="chat-input-area"
        onSubmit={handleSubmit}
      >

        <div className="chat-input">

          <textarea
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="Ask CodePilot about your code..."
            rows="1"
            disabled={loading}
            onKeyDown={(e) => {

              if (
                e.key === "Enter" &&
                !e.shiftKey
              ) {

                e.preventDefault();

                handleSubmit(e);

              }

            }}
          />


          <button
            type="submit"
            disabled={
              !question.trim() ||
              loading
            }
          >

            {loading ? (
              <span className="button-spinner dark"></span>
            ) : (
              <span>↑</span>
            )}

          </button>

        </div>


        <div className="chat-footer">

          <span>
            Answers are grounded in retrieved repository code.
          </span>

          <span>
            Enter ↵ to send
          </span>

        </div>

      </form>

    </section>
  );
}


export default ChatBox;