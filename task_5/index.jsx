import { useState } from "react";

// Никаких оптимизаций по колбекам не добавлял, т.к. правильнее их делать в месте создания функций
const MouseHandlerWrapper = ({ mouseEnterCallbak, children }) => {
  const [isActive, setActive] = useState(false);

  const mouseEnterHandler = () => {
      setActive(true);
      mouseEnterCallbak();
  };

  return (
      <div onMouseEnter={mouseEnterHandler} className={isActive ? "active" : ""}>
        { children }
      </div>
  );
}

export const Block1 = ({ mouseEnterCallbak, imgSrc, imgAlt }) => (
    <MouseHandlerWrapper mouseEnterCallbak={mouseEnterCallbak}>
      <img src={imgSrc} alt={imgAlt} />
    </MouseHandlerWrapper>
);

export const Block2 = ({ mouseEnterCallbak, content }) => (
    <MouseHandlerWrapper mouseEnterCallbak={mouseEnterCallbak}>
      <p>{content}</p>
    </MouseHandlerWrapper>
);

export const Block3 = ({ mouseEnterCallbak, userData }) => (
    <MouseHandlerWrapper mouseEnterCallbak={mouseEnterCallbak}>
      <address>
        country: {userData.country}, street: {userData.street}
      </address>
    </MouseHandlerWrapper>
);
