import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const EventSource = EventSourcePolyfill || NativeEventSource;

const NotificationComponent = ({ cId }) => {
  const jwtToken = localStorage.getItem('jwtToken'); // LocalStorage에서 jwtToken 가져오기  
  
  useEffect(() => {
    let eventSource;

    try {
      eventSource = new EventSource(
        //`${process.env.REACT_APP_BASE_URL}/api/subscribe`,
        `${process.env.REACT_APP_ENDPOINT_URL}/api/notifications/subscribe/${cId}`,
        {
          headers: {
            Authorization: jwtToken,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log('eventSource 오류!');
      console.log(error);
    }

    eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      // 알림 데이터를 처리하는 로직
      alert(notification);
    };

    eventSource.onerror = (error) => {
      console.error("EventSource 실패!", error);
      eventSource.close();
    };

    // SSE가 종료되는 경우 연결된 EventSource를 close하는 부분
    eventSource.addEventListener('close', () => eventSource.close());
    return () => eventSource.close();
  }, []);

  return (
    <div>
      {console.log("NotiComp")}
    </div>
  );
};

NotificationComponent.propTypes = {
  cId: PropTypes.string,
};

export default NotificationComponent;


