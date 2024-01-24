import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill } from 'event-source-polyfill';
import PropTypes from 'prop-types';
  
const NotiCompEvPoFill = ({ cId }) => {
  const [messages, setMessages] = useState([]);
  const eventSourceUrl = `${process.env.REACT_APP_ENDPOINT_URL}/api/notifications/subscribe/${cId}`; // 서버 SSE 엔드포인트 URL
  const jwtToken = localStorage.getItem('jwtToken'); // LocalStorage에서 jwtToken 가져오기  

  useEffect(() => {
    if (cId === "" || cId === null) return;  
    const ssePoFi = new EventSourcePolyfill(eventSourceUrl,{
                headers: {
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive',
                    'X-Accel-Buffering': 'no',
                    Authorization: `${jwtToken}`,
                },
                heartbeatTimeout: 120000,
                withCredentials: true,
            });

    ssePoFi.onmessage = (event) => {
      alert(event)
      console.log(event)
      const newMessage = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    ssePoFi.onerror = (error) => {
      console.error("EventSource failed:", error);
    };

    return () => {
      ssePoFi.close();
    };
  }, []);

  return (
    <div>
      <h2>Received Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

NotiCompEvPoFill.propTypes = {
  cId: PropTypes.string,
};
export default NotiCompEvPoFill;
